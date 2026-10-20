import assert from 'node:assert/strict';
import {writeFile,readFile} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';
const base='/Users/vins/work/iterfox/.iterfox/missions/technical-recovery-20261020-r2';
const load=(p)=>import(pathToFileURL(base+'/runtime/dist/'+p));
const {createDemoRepository,loadContract,openStore,createRun}=await load('service.js');
const {Engine}=await load('core/engine.js');
const {CodexProvider}=await load('providers/codex.js');
const {brief,markdownBrief}=await load('core/brief.js');
const {project}=await load('core/model.js');
const {stamp}=await load('core/workspace.js');
const {keepWorkerAwake}=await load('core/awake.js');
const repository=await createDemoRepository(base+'/source');
const contract=await loadContract(repository+'/iterfox.json');
contract.goal='Repair this small avatar module end-to-end: robust labels for missing, empty and ordinary names, and a second dialogue turn that replies to the first. Inspect the current repository and preserve all tests, dependencies, configuration and acceptance policies. Deliver the implemented module supported by both approved checks. Own reversible implementation choices.';
contract.supervision={mode:'project',maxReviews:3};
Object.assign(contract.limits,{maxTurns:12,maxDurationMs:900000,turnTimeoutMs:240000,maxTokens:3000000});
const protocol={createdAt:new Date().toISOString(),goal:contract.goal,contract,provider:'real Codex SDK 0.163.0',model:'gpt-6.1-sol',fault:'Discard the first build response at the actual turn.completed usage receipt; abort the supervised session. Preserve partial files and reported usage. No operator resume or application edits afterward.',expected:['one typed interruption and automatic retry','same original startedAt, contract and limits','no workflow.blocked or workflow.resumed','both criteria fresh PASSED, ready review and COMPLETED','original source untouched','exact event replay'],limits:'A short deliberate lost-response trial, not an overnight soak or a new direct-Codex comparison.'};
await writeFile(base+'/protocol.json',JSON.stringify(protocol,null,2));
await writeFile(base+'/contract.json',JSON.stringify(contract,null,2));
const sourceBefore=await stamp(repository);
const store=openStore(base+'/data');
const initial=await createRun(store,base+'/data',repository,contract,'codex');
await writeFile(base+'/run.json',JSON.stringify({runId:initial.id,repository,worktree:initial.worktree,startedAt:initial.startedAt},null,2));
const real=new CodexProvider({model:'gpt-6.1-sol'});
let injected=false;
const release=await keepWorkerAwake((message)=>store.append(initial.id,'decision.recorded',message,{kind:'host.awake'}));
const started=Date.now();
const provider={name:'codex',async invoke(r){
  const injectThis=r.mode==='build'&&!injected;
  const injection=new AbortController();
  return real.invoke({...r,signal:AbortSignal.any([r.signal,injection.signal]),onUsage(tokens){
    r.onUsage(tokens);
    if(injectThis&&!injected){
      injected=true;
      // The API completed; deliberately lose its result at the supervisor boundary.
      // This is an injected failure, not evidence of a spontaneous API outage.
      injection.abort(new Error('Injected loss of the first builder response after reported usage'));
    }
  }});
}};
try{
  const final=await new Engine(store,initial.id,provider).run();
  const events=store.events(initial.id);
  const report={measuredAt:new Date().toISOString(),elapsedMs:Date.now()-started,injected,result:brief(final,events),sourceBefore,sourceAfter:await stamp(repository),runtimeHashes:JSON.parse(await readFile(base+'/runtime-hashes.json','utf8')),events};
  await writeFile(base+'/result.json',JSON.stringify(report,null,2));
  await writeFile(base+'/brief.md',markdownBrief(final,events));
  await writeFile(base+'/events.json',JSON.stringify(events,null,2));
  assert(injected,'actual builder usage must have triggered the fault');
  assert.equal(final.status,'COMPLETED',final.reason);
  assert.equal(final.startedAt,initial.startedAt);
  assert.deepEqual(final.contract,contract);
  assert.deepEqual(report.sourceAfter,sourceBefore);
  assert.equal(final.technicalInterruptions.length,1);
  assert(final.technicalInterruptions[0].quiesced&&final.technicalInterruptions[0].retriedAt);
  assert.equal(events.filter(e=>e.type==='agent.retry.started').length,1);
  assert(!events.some(e=>['workflow.blocked','workflow.resumed'].includes(e.type)));
  assert(final.criteria.every(c=>c.status==='PASSED'));
  assert.equal(final.projectReviews.at(-1).outcome,'ready');
  assert.deepEqual(project(events),final);
  console.log(JSON.stringify({status:final.status,runId:final.id,elapsedMs:report.elapsedMs,turns:final.turns,reportedTokens:final.tokens,recoveries:final.technicalInterruptions.length,verified:final.criteria.length}));
}catch(error){console.error(error);process.exitCode=1;}finally{release();store.close();}
