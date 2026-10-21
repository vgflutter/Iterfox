import assert from'node:assert/strict';
import{readFile,writeFile}from'node:fs/promises';
import{createHash}from'node:crypto';
import{DatabaseSync}from'node:sqlite';
import{execFileSync}from'node:child_process';
const original='/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020';
const bases=[original,original+'-r2',original+'-r3',original+'-r4'];
const frozen=['frozen-original','frozen-stopped','frozen-blocked'];
const json=async p=>JSON.parse(await readFile(p,'utf8'));
const sha=x=>createHash('sha256').update(x).digest('hex');
const results=await Promise.all(bases.map(p=>json(p+'/evidence/result.json')));
assert.deepEqual(results.slice(0,3).map(r=>r.status),['BLOCKED','STOPPED','BLOCKED']);
const latest=results.at(-1),base=bases.at(-1);assert(!['RUNNING','PAUSED'].includes(latest.status));
const receipts=[];const bridges=[];
for(let i=0;i<bases.length;i++){
 const path=bases[i],r=results[i],auth=await json(path+'/authorized.json'),protocol=await json(path+'/protocol.json');
 const{project}=await import(path+'/runtime/dist/core/model.js');const{stamp}=await import(path+'/runtime/dist/core/workspace.js');
 const db=new DatabaseSync(path+'/data/ledger.sqlite',{readOnly:true});
 try{
  const d=JSON.parse(db.prepare('SELECT body FROM delegations WHERE id=?').get(auth.id).body);
  assert.deepEqual(d,r.delegation);assert.deepEqual(d.spec,auth.spec);assert.equal(d.authorizedAt,auth.authorizedAt);assert.equal(d.specHash,auth.specHash);
  assert.deepEqual(r.integrity.sourceBefore,r.integrity.sourceAfter);assert.deepEqual(await stamp(d.spec.repository),r.integrity.sourceAfter);
  assert.equal(r.integrity.sourceIndexBefore,r.integrity.sourceIndexAfter);
  const index=execFileSync('git',['rev-parse','--path-format=absolute','--git-path','index'],{cwd:d.spec.repository,encoding:'utf8'}).trim();assert.equal(sha(await readFile(index)),r.integrity.sourceIndexBefore);
  for(const[file,hash]of Object.entries(protocol.protectedInputHashes))assert.equal(sha(await readFile(d.spec.repository+'/'+file)),hash);
  const runtime=await json(path+'/runtime-hashes.json');for(const[file,hash]of Object.entries(runtime))assert.equal(sha(await readFile(path+'/runtime/'+file)),hash);
  assert.equal(sha(await readFile(path+'/driver.mjs')),protocol.driverSha256);assert.equal(sha(await readFile(path+'/evidence/external-audit.mjs')),protocol.externalAuditSha256);
  let stopEvents=0;
  for(const run of r.runs){
   const events=db.prepare('SELECT body FROM events WHERE run_id=? ORDER BY seq').all(run.state.id).map(x=>JSON.parse(x.body));
   assert.deepEqual(events,run.events);assert.deepEqual(project(events),run.state);
   assert(!events.some(e=>['workflow.resumed','workflow.paused'].includes(e.type)));stopEvents+=events.filter(e=>e.type==='workflow.stopped').length;
   assert((run.state.technicalInterruptions??[]).filter(x=>x.retriedAt).length<=2);
  }
  assert.equal(stopEvents,i===1?1:0);
  receipts.push({id:d.id,status:d.status,authorizedAt:d.authorizedAt,runtimeFiles:Object.keys(runtime).length,exactEventReplay:true,originalSourceAndIndexUnchanged:true,protectedInputsAndRuntimeUnchanged:true,driverAndAuditUnchanged:true,resumePauseEvents:0,declaredAssistantStopEvents:stopEvents});
  if(i<3){
   const freeze=path+'/evidence/'+frozen[i];assert.equal(sha(await readFile(path+'/evidence/result.json')),sha(await readFile(freeze+'/result.json')));
   const copy=new DatabaseSync(freeze+'/ledger.sqlite',{readOnly:true});try{for(const run of r.runs){const q='SELECT body FROM events WHERE run_id=? ORDER BY seq';assert.deepEqual(db.prepare(q).all(run.state.id),copy.prepare(q).all(run.state.id));}}finally{copy.close()}
  }
 }finally{db.close()}
 if(i>0){
  const snapshot=await json(path+'/review-snapshot.json'),previous=results[i-1];assert.equal(snapshot.fromDelegation,previous.delegation.id);assert.equal(snapshot.originalStatus,previous.status);
  const origin=previous.runs.find(run=>run.state.id===snapshot.fromRun);assert(origin);assert.equal(snapshot.fromSeq,origin.state.seq);
  for(const[file,hash]of Object.entries(snapshot.applicationFileHashes)){assert.equal(sha(await readFile(origin.state.worktree+'/'+file)),hash);assert.equal(sha(await readFile(path+'/source/'+file)),hash)}
  bridges.push({from:previous.delegation.id,to:r.delegation.id,uncertified:true,applicationFilesCopiedIdentically:Object.keys(snapshot.applicationFileHashes).length});
 }
}
const budget=await json(base+'/budget-provenance.json'),old=results.slice(0,3).flatMap(r=>r.runs),all=results.flatMap(r=>r.runs);
const used=old.reduce((n,r)=>({turns:n.turns+r.state.turns,reportedTokens:n.reportedTokens+r.state.tokens}),{turns:0,reportedTokens:0});assert.deepEqual(used,budget.used);
const total=all.reduce((n,r)=>({turns:n.turns+r.state.turns,reportedTokens:n.reportedTokens+r.state.tokens}),{turns:0,reportedTokens:0});
assert.equal(latest.delegation.spec.contract.limits.maxTurns,budget.originalLimits.maxTurns-used.turns);assert.equal(latest.delegation.spec.contract.limits.maxTokens,budget.originalLimits.maxTokens-used.reportedTokens);
assert(total.turns<=budget.originalLimits.maxTurns);assert(total.reportedTokens<=budget.originalLimits.maxTokens);
const windowEnd=Date.parse(latest.delegation.authorizedAt)+latest.delegation.spec.contract.limits.maxDurationMs;assert(windowEnd<=Date.parse(budget.originalDeadline));assert(Date.parse(latest.delegation.updatedAt)<=Date.parse(budget.originalDeadline));
const semantic=latest.faults.find(f=>f.kind==='invalid-review-reference');let wireAudit;
if(semantic){
 const wire=await json(base+'/evidence/semantic-review-wire.json');assert.equal(sha(JSON.stringify(wire.actual)),wire.actualSha256);assert.equal(sha(JSON.stringify(wire.injected)),wire.injectedSha256);
 assert.deepEqual({...wire.injected,findings:wire.injected.findings.slice(0,-1)},wire.actual);
 const run=latest.runs.find(r=>r.stage===semantic.stage),index=run.events.findIndex(e=>e.type==='project.review.rejected'&&e.data.nodeId===semantic.nodeId);assert(index>=0);
 const{project}=await import(base+'/runtime/dist/core/model.js');const{validateProjectReview,ProjectReviewRejection}=await import(base+'/runtime/dist/core/supervision.js');
 const s=project(run.events.slice(0,index)),event=run.events[index];let actualValid=true,actualError;
 try{validateProjectReview(s,wire.actual,event.data.stamp)}catch(e){actualValid=false;actualError=e.message}
 assert.throws(()=>validateProjectReview(s,wire.injected,event.data.stamp),ProjectReviewRejection);
 assert(!run.state.nodes.some(n=>n.discoveredBy===semantic.nodeId));assert(!run.state.projectReviews?.some(r=>r.findings.some(f=>f.files.includes(semantic.details.badPath))));
 const later=run.state.projectReviews?.find(r=>Date.parse(r.at)>Date.parse(semantic.at));if(latest.status==='COMPLETED')assert(later);
 wireAudit={actualModelResponseValid:actualValid,actualModelResponseError:actualError,onlyOneInvalidFindingAdded:true,rejectionEventSeq:event.seq,invalidWorkActivated:false,laterValidReviewAt:later?.at};
}
const report={at:new Date().toISOString(),result:'PASS',technicalAuthorizations:4,assistantTrialRecoveryEpisodes:3,separatePostObservationUIFixes:1,additionalUserDevelopmentPrompts:0,manualApplicationCodeEditsDuringRuns:0,priorResultsAndEventsByteIdenticalToFreeze:true,bridges,originalSharedDeadlineAndBudgetPreserved:true,originalDeadline:budget.originalDeadline,latestWindowEnd:new Date(windowEnd).toISOString(),...total,unreportedInterruptedTurnTokens:'unknown',semanticWireAudit:wireAudit,trials:receipts};
await writeFile(base+'/evidence/combined-integrity.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
