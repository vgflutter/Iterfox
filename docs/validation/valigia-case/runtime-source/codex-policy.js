import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { z } from 'zod';
const execute = promisify(execFile);
const serversSchema = z.array(z.object({ name: z.string().min(1), enabled: z.boolean() }));
export const restrictedFeatures = {
    apps: false,
    plugins: false,
    hooks: false,
    multi_agent: false,
    browser_use: false,
    in_app_browser: false,
    computer_use: false,
    image_generation: false,
};
// MCPs and connectors can act outside the shell sandbox. Enumerate the actual
// configuration using the CLI's structured interface, disable each server, then
// verify. Never assume an empty table removes inherited configuration.
export async function codexPolicy(cwd, signal, codexPath) {
    let executable;
    let prefix;
    if (codexPath) {
        executable = codexPath;
        prefix = [];
    }
    else {
        const require = createRequire(import.meta.resolve('@openai/codex-sdk'));
        executable = process.execPath;
        prefix = [join(dirname(require.resolve('@openai/codex/package.json')), 'bin', 'codex.js')];
    }
    const featureArgs = Object.entries(restrictedFeatures).flatMap(([k, v]) => [
        '-c',
        `features.${k}=${v}`,
    ]);
    const inspect = async (overrides) => {
        try {
            const { stdout } = await execute(executable, [
                ...prefix,
                'mcp',
                'list',
                '--json',
                ...featureArgs,
                ...overrides.flatMap((v) => ['-c', v]),
            ], {
                cwd,
                signal,
                timeout: 15_000,
                maxBuffer: 4 * 1024 * 1024,
            });
            return serversSchema.parse(JSON.parse(stdout));
        }
        catch (e) {
            signal.throwIfAborted();
            throw new Error('Codex external-tool policy could not be verified. Check that your Codex CLI supports the configured MCP transports and `mcp list --json`, or set ITERFOX_CODEX_PATH to a compatible official CLI. No agent was started.', { cause: e });
        }
    };
    const servers = await inspect([]);
    if (servers.some((s) => !/^[A-Za-z0-9_-]+$/.test(s.name)))
        throw new Error('An MCP server name cannot be safely overridden by the CLI. Rename or disable it before an unattended run.');
    const configOverrides = servers.map((s) => `mcp_servers.${s.name}.enabled=false`);
    if ((await inspect(configOverrides)).some((s) => s.enabled))
        throw new Error('Codex still exposes an enabled MCP server. Operator configuration review is required; the run is blocked.');
    return { config: { features: restrictedFeatures }, configOverrides };
}
//# sourceMappingURL=codex-policy.js.map