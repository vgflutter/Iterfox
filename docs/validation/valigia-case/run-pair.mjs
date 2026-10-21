import assert from 'node:assert/strict';
import {mkdir,writeFile,readFile,appendFile,access} from 'node:fs/promises';
import {resolve} from 'node:path';
import {createHash} from 'node:crypto';
import {pathToFileURL} from 'node:url';
import {Codex} from './runtime/node_modules/@openai/codex-sdk/dist/index.js';
import {z} from './runtime/node_modules/zod/index.js';
import {openStore,createRun,loadContract} from './runtime/dist/service.js';
import {Engine} from './runtime/dist/core/engine.js';
import {CodexProvider} from './runtime/dist/providers/codex.js';
import {codexPolicy} from './runtime/dist/providers/codex-policy.js';
import {buildSchema} from './runtime/dist/providers/provider.js';
import {auditChanges,stamp,git,worktreeDiff} from './runtime/dist/core/workspace.js';
import {check} from './runtime/dist/core/check.js';
import {markdownBrief} from './runtime/dist/core/brief.js';
import {keepWorkerAwake} from './runtime/dist/core/awake.js';
import {project} from './runtime/dist/core/model.js';
const root=new URL('./',import.meta.url).pathname;
let protocol=JSON.parse(await readFile(root+'protocol.json','utf8'));
const sha=async p=>createHash('sha256').update(await readFile(p)).digest('hex');
protocol={...protocol,reasoningEffort:'xhigh (explicitly pinned for both arms)',additionalAuditSha256:await sha(root+'audit.mjs')};
await writeFile(root+'protocol.json',JSON.stringify(protocol,null,2)+'\n');
process.env.VALIGIA_PLAYWRIGHT=protocol.browserModule;
const contract=await loadContract(root+'fixture/iterfox.json');
const release=await keepWorkerAwake(message=>console.log(message));
async function immutable(cwd){for(const [name,expected] of Object.entries(protocol.immutableHashes))assert.equal(await sha(cwd+'/'+name),expected,'Immutable file: '+name);for(const [name,expected]of Object.entries(protocol.runtimeHashes))assert.equal(await sha(root+'runtime/'+name),expected,'Frozen runtime: '+name);}
async function externalChecks(cwd){const results=[];for(const c of contract.criteria){const r=await check(cwd,c,AbortSignal.timeout(c.timeoutMs+5000));results.push({id:c.id,...r});}return results;}
async function runArm(arm){
 const dir=root+arm;await mkdir(dir,{recursive:true});
 try{await access(dir+'/started.json');throw Error('An arm was already started; inspect its existing state rather than duplicating it.');}catch(e){if(e.code!=='ENOENT')throw e;}
 const store=openStore(dir);const started=Date.now();let solveStart;let error;let claim;let calls=0;let reportedTokens=0;let lastSeq=0;
 const state=await createRun(store,dir,root+'fixture',contract,'codex',protocol.fixtureHead);
 await immutable(state.worktree);await writeFile(dir+'/started.json',JSON.stringify({at:new Date().toISOString(),arm,runId:state.id,worktree:state.worktree,fixtureHead:state.baseHead,promptSha256:protocol.promptSha256},null,2));
 const timer=setInterval(()=>{const s=store.get(state.id);const progress={arm,at:new Date().toISOString(),status:arm==='direct'?'SDK running':s.status,turns:s.turns,active:s.nodes.filter(n=>['RUNNING','VERIFYING'].includes(n.status)).map(n=>n.title),criteria:s.criteria.map(c=>({id:c.id,status:c.status})),calls,reportedTokens};writeFile(dir+'/progress.json',JSON.stringify(progress,null,2)).catch(()=>{});if(arm==='iterfox')for(const e of store.events(state.id).filter(e=>e.seq>lastSeq)){lastSeq=e.seq;if(['task.started','task.completed','verification.passed','verification.failed','project.reviewed','workflow.completed','workflow.blocked'].includes(e.type))console.log(JSON.stringify({arm,seq:e.seq,type:e.type,message:e.message}));}},5000);
 try{
  solveStart=Date.now();
  if(arm==='direct'){
   const signal=AbortSignal.timeout(contract.limits.maxDurationMs);const policy=await codexPolicy(state.worktree,signal);
   const sdk=new Codex(policy);const thread=sdk.startThread({workingDirectory:state.worktree,sandboxMode:'workspace-write',approvalPolicy:'never',networkAccessEnabled:false,webSearchMode:'disabled',model:protocol.model,modelReasoningEffort:'xhigh'});
   const input=`Complete this app objective using your normal autonomous coding/tool loop. You own the whole result, including inspection, implementation and corrections.\n\n${contract.goal}\n\nApproved immutable contract (same as the paired Iterfox arm):\n${JSON.stringify(contract)}\n\nStay in this isolated worktree and approved editable paths. Do not edit tests, checks, config, dependencies or the contract, change Git history, use network or request elevated permissions. Report honestly what you verified and what was unavailable. Return the supplied JSON schema; the summary is a claim that will be checked externally.`;
   await writeFile(dir+'/direct-input.txt',input);calls++;
   const {events}=await thread.runStreamed(input,{outputSchema:z.toJSONSchema(buildSchema),signal});let answer;let completed=false;
   for await(const e of events){
    if(e.type==='thread.started')await appendFile(dir+'/trace.jsonl',JSON.stringify({type:e.type,threadId:e.thread_id})+'\n');
    if(e.type==='item.completed'&&e.item.type==='agent_message')answer=e.item.text;
    if(e.type==='item.completed'&&e.item.type==='command_execution')await appendFile(dir+'/trace.jsonl',JSON.stringify({type:'command',command:e.item.command,exitCode:e.item.exit_code,output:e.item.aggregated_output?.slice(-8000)})+'\n');
    if(e.type==='turn.completed'){reportedTokens+=e.usage.input_tokens+e.usage.output_tokens;completed=true;await appendFile(dir+'/trace.jsonl',JSON.stringify({type:e.type,usage:e.usage})+'\n');}
    if(e.type==='turn.failed'||e.type==='error')throw Error(e.error?.message??e.message);
   }
   if(!completed||!answer)throw Error('No completed SDK response');claim=buildSchema.parse(JSON.parse(answer));
  }else{
   const actual=new CodexProvider({model:protocol.model,reasoningEffort:'xhigh'});
   const provider={name:'codex',async invoke(r){calls++;const rec={call:calls,at:new Date().toISOString(),mode:r.mode,nodeId:r.node.id,title:r.node.title};await appendFile(dir+'/trace.jsonl',JSON.stringify({...rec,phase:'started'})+'\n');const originalUsage=r.onUsage;try{const result=await actual.invoke({...r,onUsage:n=>{reportedTokens+=n;originalUsage(n);}});await appendFile(dir+'/trace.jsonl',JSON.stringify({...rec,phase:'finished',result})+'\n');return result;}catch(e){await appendFile(dir+'/trace.jsonl',JSON.stringify({...rec,phase:'failed',error:e.message})+'\n');throw e;}}};
   await new Engine(store,state.id,provider).run();
  }
 }catch(e){error=e.stack??String(e);}
 clearInterval(timer);const solveElapsedMs=Date.now()-solveStart;const auditStarted=Date.now();let integrityError;
 try{await immutable(state.worktree);await auditChanges(store.get(state.id));}catch(e){integrityError=e.message;}
 const checks=await externalChecks(state.worktree);
 const audit=await check(state.worktree,{command:[process.execPath,root+'audit.mjs'],timeoutMs:180000},AbortSignal.timeout(185000));
 const current=store.get(state.id);const events=store.events(state.id);let extra;
 try{extra=JSON.parse(await readFile(dir+'/audit/extra-audit.json','utf8'));}catch{}
 const results={arm,model:protocol.model,reasoningEffort:protocol.reasoningEffort,fixtureHead:state.baseHead,promptSha256:protocol.promptSha256,runId:state.id,worktree:state.worktree,startedAt:new Date(started).toISOString(),finishedAt:new Date().toISOString(),solveElapsedMs,auditElapsedMs:Date.now()-auditStarted,totalElapsedMs:Date.now()-started,modelCalls:calls,reportedTokens,operatorInterventionsAfterStart:0,error,integrityError,claim,status:arm==='iterfox'?current.status:error?'ERROR':claim?.blocked?'BLOCKED':'RETURNED',criteriaPassed:checks.filter(c=>c.exitCode===0).length,criteriaTotal:checks.length,checks,additionalAudit:{exitCode:audit.exitCode,output:audit.output,...extra},finalStamp:await stamp(state.worktree),diff:await worktreeDiff(state.worktree,state.baseHead),...(arm==='iterfox'?{runtimeState:current,events,replayMatches:JSON.stringify(project(events))===JSON.stringify(current),runtimeCheckCount:events.filter(e=>e.type==='verification.started').length,discoveredTasks:current.nodes.filter(n=>n.reason?.includes('Discovered by project supervision')).length}: {})};
 await writeFile(dir+'/report.json',JSON.stringify(results,null,2)+'\n');
 if(arm==='iterfox')await writeFile(dir+'/morning-brief.md',markdownBrief(current,events));
 console.log(JSON.stringify({arm,status:results.status,solveElapsedMs,modelCalls:calls,reportedTokens,criteriaPassed:results.criteriaPassed,additionalPassed:extra?.passed,additionalTotal:extra?.total,error,integrityError}));
 store.close();return results;
}
try{
 await immutable(root+'fixture');
 const baseline=await externalChecks(root+'fixture');await writeFile(root+'before.json',JSON.stringify(baseline,null,2));assert(baseline.every(c=>c.exitCode!==0),'Both acceptance commands must fail on the unimplemented starter');
 console.log(JSON.stringify({phase:'baseline checked',order:protocol.order}));
 for(const arm of protocol.order){process.env.VALIGIA_AUDIT_OUT=root+arm+'/audit';await runArm(arm);}
 await writeFile(root+'pair-finished.json',JSON.stringify({at:new Date().toISOString(),order:protocol.order}));
}finally{release();}
