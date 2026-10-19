import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import type { CodexOptions } from '@openai/codex-sdk';
import { codexPolicy, restrictedFeatures } from '../providers/codex-policy.js';
import { ProposalError } from './model.js';

const execute = promisify(execFile);
// This compatibility gate is intentional: accepting unknown CLI versions or
// silently ignored feature names cannot establish a command-free draft boundary.
// Re-audit the controls before extending it. The installed SDK is pinned to this
// official CLI version; no replacement client or external integration is used.
const supportedVersion = 'codex-cli 0.163.0';
const draftFeatures = {
  ...restrictedFeatures,
  // In 0.163.0 unified_exec is an always-on implementation feature. shell_tool
  // is the availability gate for both legacy shell and unified exec tools.
  shell_tool: false,
  shell_snapshot: false,
  code_mode: false,
  code_mode_only: false,
  code_mode_prewarm: false,
  deferred_executor: false,
  view_image: false,
  sleep_tool: false,
  memories: false,
  goals: false,
  multi_agent_v2: false,
  request_permissions_tool: false,
  default_mode_request_user_input: false,
  workspace_dependencies: false,
  skill_search: false,
  skill_mcp_dependency_install: false,
  tool_suggest: false,
  standalone_web_search: false,
  remote_plugin: false,
  in_app_local_automation: false,
  daemon_auto_start: false,
};
const draftingOverrides = [
  'sandbox_mode="read-only"',
  'approval_policy="never"',
  'sandbox_workspace_write.network_access=false',
  'web_search="disabled"',
  'notify=[]',
  'allow_login_shell=false',
  'shell_environment_policy.inherit="none"',
  'project_doc_max_bytes=0',
  'skills.include_instructions=false',
  'cloud.skills.enabled=false',
  'tools.update_plan.enabled=false',
  'tools.experimental_request_user_input.enabled=false',
];

/** Local configuration inspection only. This must succeed before a model turn. */
export async function establishDraftingBoundary(
  cwd: string,
  signal: AbortSignal,
  codexPath?: string,
): Promise<CodexOptions> {
  try {
    const require = createRequire(import.meta.resolve('@openai/codex-sdk'));
    const executable = codexPath ?? process.execPath;
    const prefix = codexPath
      ? []
      : [join(dirname(require.resolve('@openai/codex/package.json')), 'bin', 'codex.js')];
    const inspect = async (args: string[]) => {
      const { stdout } = await execute(executable, [...prefix, ...args], {
        cwd,
        signal,
        timeout: 15_000,
        maxBuffer: 1024 * 1024,
      });
      return stdout;
    };
    if ((await inspect(['--version'])).trim() !== supportedVersion)
      throw new Error(`Drafting requires the audited official ${supportedVersion}.`);

    // Keep the product's existing external-tool policy unchanged. It enumerates
    // configured MCP servers, disables each one, and verifies the effective list.
    const policy = await codexPolicy(cwd, signal, codexPath);
    const configOverrides = [...policy.configOverrides, ...draftingOverrides];
    const flags = [
      ...Object.entries(draftFeatures).map(([name, enabled]) => `features.${name}=${enabled}`),
      ...configOverrides,
    ].flatMap((value) => ['-c', value]);
    const features = await inspect(['features', 'list', ...flags]);
    const effective = new Map<string, string>();
    for (const line of features.split('\n')) {
      const match =
        /^(\S+)\s+(?:under development|experimental|stable|deprecated|removed)\s+(true|false)\s*$/.exec(
          line,
        );
      if (match) effective.set(match[1], match[2]);
    }
    const unconfirmed = Object.keys(draftFeatures).filter(
      (name) => effective.get(name) !== 'false',
    );
    if (unconfirmed.length)
      throw new Error(
        `The CLI did not confirm these drafting restrictions: ${unconfirmed.join(', ')}`,
      );
    return {
      ...(codexPath ? { codexPathOverride: codexPath } : {}),
      config: { ...policy.config, features: draftFeatures },
      configOverrides,
    };
  } catch (cause) {
    signal.throwIfAborted();
    throw new ProposalError(
      'boundary',
      'The command-free Codex drafting boundary could not be verified. Use the installed official Codex CLI 0.163.0 (or set ITERFOX_CODEX_PATH to that compatible CLI) and check its MCP configuration, then retry. No model turn or run was started.',
      { cause },
    );
  }
}
