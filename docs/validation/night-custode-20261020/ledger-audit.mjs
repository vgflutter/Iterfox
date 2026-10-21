import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFile,writeFile,cp} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
const root='/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020';
const {project}=await import(root+'/runtime/dist/core/model.js');
const {stamp,auditChanges}=await import(root+'/runtime/dist/core/workspace.js');
const {projectReviewCurrent}=await import(root+'/runtime/dist/core/supervision.js');
const before=JSON.parse(await readFile(root+'/evidence/before.json','utf8'));
const hashes=JSON.parse(await readFile(root+'/evidence/frozen-hashes.json','utf8'));
const git=(cwd,args)=>execFileSync('/usr/bin/git',args,{cwd,encoding:'utf8'}).trim();
const db=new DatabaseSync(root+'/data/ledger.sqlite',{readOnly:true});
try{
 const d=JSON.parse(db.prepare('SELECT body FROM delegations ORDER BY rowid DESC LIMIT 1').get().body);
 assert.equal(d.status,'COMPLETED',d.reason);assert.equal(d.stages.length,4);
 const count=kind=>d.events.filter(e=>e.kind===kind).length;
 assert.equal(count('authorized'),1);assert.equal(count('worker-started'),1);assert.equal(count('resumed'),0);assert.equal(count('control-requested'),0);assert.equal(count('worker-lost'),0);
 for(const [name,hash]of Object.entries(hashes))assert.equal(createHash('sha256').update(await readFile(root+'/'+name)).digest('hex'),hash,name+' mutated');
 assert.equal(git(root+'/source',['rev-parse','HEAD']),before.head);assert.equal(git(root+'/source',['write-tree']),before.index);assert.equal(git(root+'/source',['status','--porcelain']),'');
 let parent=before.head;const covered=new Set(),stages=[];let turns=0,tokens=0;
 for(let i=0;i<d.stages.length;i++){
  const s=d.stages[i];assert.equal(s.status,'CHECKPOINTED');assert.equal(s.environmentPrepared,true);
  const events=db.prepare('SELECT body FROM events WHERE run_id=? ORDER BY seq').all(s.runId).map(x=>JSON.parse(x.body));const r=project(events);const initial=events.find(x=>x.type==='workflow.created').data.state;
  assert.equal(r.provider,'codex');assert.equal(r.status,'COMPLETED');assert.equal(r.baseHead,parent);assert.equal(initial.evidence.length,0);assert.ok(initial.criteria.every(c=>c.status==='PENDING'));
  for(const id of d.spec.milestones[i].criterionIds)covered.add(id);
  assert.deepEqual(r.contract.criteria,d.spec.contract.criteria.filter(c=>covered.has(c.id)));assert.equal(r.contract.limits.maxTurns,d.spec.contract.limits.maxTurns-turns);assert.equal(r.contract.limits.maxTokens,d.spec.contract.limits.maxTokens-tokens);turns+=r.turns;tokens+=r.tokens;
  assert.deepEqual(r.contract.allowedPaths,d.spec.contract.allowedPaths);assert.deepEqual(r.contract.protectedPaths,d.spec.contract.protectedPaths);
  const current=await stamp(r.worktree);assert.equal(current.head,r.baseHead);assert.equal(current.fingerprint,s.checkpoint.sourceFingerprint);assert.ok(projectReviewCurrent(r,current));
  for(const c of r.criteria){assert.equal(c.status,'PASSED');const proof=r.evidence.find(e=>e.id===c.evidenceId);assert.equal(proof.kind,'deterministic');assert.equal(proof.exitCode,0);assert.equal(proof.status,'passed');assert.deepEqual(proof.command,r.contract.criteria.find(x=>x.id===c.id).command);const code=await stamp(r.worktree,proof.scope,proof.inputs);assert.equal(code.fingerprint,proof.stamp.fingerprint);assert.equal(code.head,proof.stamp.head);}
  assert.equal(git(r.worktree,['rev-parse',s.checkpoint.ref]),s.checkpoint.head);assert.equal(git(r.worktree,['rev-parse',s.checkpoint.head+'^']),parent);assert.equal(git(r.worktree,['write-tree']),git(r.worktree,['rev-parse',r.baseHead+'^{tree}']));
  const notes=events.filter(e=>e.type==='direction.noted');assert.equal(notes.length,1);assert.ok(notes[0].data.note.text.startsWith('Delegation '+d.id+'; approval '+d.specHash+'; outcome '+s.id+'.'));
  const counts=Object.fromEntries([...new Set(events.map(e=>e.type))].map(type=>[type,events.filter(e=>e.type===type).length]));
  stages.push({id:s.id,runId:r.id,worktree:r.worktree,checkpoint:s.checkpoint,createdAt:r.createdAt,finishedAt:r.finishedAt,turns:r.turns,tokens:r.tokens,criteria:r.criteria,changes:await auditChanges(r),eventCounts:counts,tasks:r.nodes.filter(n=>n.kind==='task').map(n=>({title:n.title,status:n.status,summary:n.summary,attempt:n.attempt,discoveredBy:n.discoveredBy})),reviews:r.projectReviews,failures:r.evidence.filter(e=>e.status==='failed'||e.status==='stale'&&e.exitCode!==0).map(e=>({criterionId:e.criterionId,status:e.status,exitCode:e.exitCode,output:e.output})),finalProofs:r.criteria.map(c=>{const e=r.evidence.find(e=>e.id===c.evidenceId);return {criterionId:c.id,output:e.output,stamp:e.stamp};})});
  parent=s.checkpoint.head;
 }
 const result={result:'PASS',at:new Date().toISOString(),delegation:d,stages,totalTurns:turns,totalReportedTokens:tokens,durationMs:Date.parse(d.events.findLast(e=>e.kind==='completed').at)-Date.parse(d.authorizedAt),preparationMs:Date.parse(d.authorizedAt)-Date.parse(before.preparationStartedAt),oneApproval:true,oneWorker:true,manualCoachingNotes:0,technicalOrProductInterventionsAfterApproval:0,originalSourceAndIndexesPreserved:true,frozenRuntimeAndAcceptancePreserved:true,finalCheckpoint:parent};
 await writeFile(root+'/evidence/ledger-audit.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({result:'PASS',durationMs:result.durationMs,preparationMs:result.preparationMs,turns,stages:stages.map(s=>({id:s.id,checkpoint:s.checkpoint.head,criteria:s.criteria.length}))}));
}finally{db.close();}
