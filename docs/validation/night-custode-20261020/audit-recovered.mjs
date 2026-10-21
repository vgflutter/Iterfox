import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
const root='/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020';
const {project}=await import(root+'/runtime/dist/core/model.js');
const {stamp,auditChanges}=await import(root+'/runtime/dist/core/workspace.js');
const {projectReviewCurrent}=await import(root+'/runtime/dist/core/supervision.js');
const primaryEnd=JSON.parse(await readFile(root+'/evidence/primary-ended.json','utf8'));
const before=JSON.parse(await readFile(root+'/evidence/before.json','utf8'));
const snapshot=JSON.parse(await readFile(root+'/evidence/recovery-snapshot.json','utf8'));
const hashes=JSON.parse(await readFile(root+'/evidence/frozen-hashes.json','utf8'));
const git=(cwd,args)=>execFileSync('/usr/bin/git',args,{cwd,encoding:'utf8'}).trim();
for(const [name,hash]of Object.entries(hashes))assert.equal(createHash('sha256').update(await readFile(root+'/'+name)).digest('hex'),hash,name+' changed');
assert.equal(git(root+'/source',['rev-parse','HEAD']),before.head);assert.equal(git(root+'/source',['write-tree']),before.index);assert.equal(git(root+'/source',['status','--porcelain']),'');
const primaryDb=new DatabaseSync(root+'/data/ledger.sqlite',{readOnly:true});
const recoveryDb=new DatabaseSync(root+'/recovery-data/ledger.sqlite',{readOnly:true});
function load(db,id){const events=db.prepare('SELECT body FROM events WHERE run_id=? ORDER BY seq').all(id).map(x=>JSON.parse(x.body));return {events,run:project(events)};}
async function inspect(db,d,s,completed){
 const {events,run:r}=load(db,s.runId);const initial=events.find(e=>e.type==='workflow.created').data.state;
 assert.equal(r.provider,'codex');assert.equal(initial.evidence.length,0);assert(initial.criteria.every(c=>c.status==='PENDING'));
 assert.deepEqual(r.contract.allowedPaths,d.spec.contract.allowedPaths);assert.deepEqual(r.contract.protectedPaths,d.spec.contract.protectedPaths);
 const code=await stamp(r.worktree);assert.equal(code.head,r.baseHead);
 for(const c of r.criteria){assert.equal(c.status,'PASSED');const proof=r.evidence.find(e=>e.id===c.evidenceId);assert.equal(proof.status,'passed');assert.equal(proof.exitCode,0);assert.equal(proof.kind,'deterministic');assert.deepEqual(proof.command,r.contract.criteria.find(x=>x.id===c.id).command);const now=await stamp(r.worktree,proof.scope,proof.inputs);assert.equal(now.fingerprint,proof.stamp.fingerprint);assert.equal(now.head,proof.stamp.head);}
 assert.equal(git(r.worktree,['write-tree']),git(r.worktree,['rev-parse',r.baseHead+'^{tree}']));
 if(completed){assert.equal(r.status,'COMPLETED');assert.equal(s.status,'CHECKPOINTED');assert(projectReviewCurrent(r,code));assert.equal(code.fingerprint,s.checkpoint.sourceFingerprint);assert.equal(git(r.worktree,['rev-parse',s.checkpoint.ref]),s.checkpoint.head);assert.equal(git(r.worktree,['rev-parse',s.checkpoint.head+'^']),r.baseHead);}
 const notes=events.filter(e=>e.type==='direction.noted');assert.equal(notes.length,1);assert(notes[0].data.note.text.startsWith('Delegation '+d.id+'; approval '+d.specHash));
 return {id:s.id,runId:r.id,status:r.status,reason:r.reason,worktree:r.worktree,baseHead:r.baseHead,sourceFingerprint:code.fingerprint,checkpoint:s.checkpoint,turns:r.turns,tokens:r.tokens,createdAt:r.createdAt,finishedAt:r.finishedAt,criteria:r.criteria,changes:await auditChanges(r),eventCounts:Object.fromEntries([...new Set(events.map(e=>e.type))].map(type=>[type,events.filter(e=>e.type===type).length])),tasks:r.nodes.filter(n=>n.kind==='task').map(n=>({title:n.title,status:n.status,summary:n.summary})),reviews:r.projectReviews??[],finalProofs:r.criteria.map(c=>{const p=r.evidence.find(e=>e.id===c.evidenceId);return {criterionId:c.id,output:p.output,stamp:p.stamp};})};
}
try{
 const primary=JSON.parse(primaryDb.prepare('SELECT body FROM delegations').get().body);assert.deepEqual(primary,primaryEnd.delegation);assert.equal(primary.status,'BLOCKED');
 assert.equal(primary.events.filter(e=>e.kind==='authorized').length,1);assert.equal(primary.events.filter(e=>e.kind==='worker-started').length,1);assert.equal(primary.events.filter(e=>e.kind==='resumed'||e.kind==='control-requested').length,0);
 const stages=[];let parent=before.head;const covered=new Set();
 for(let i=0;i<4;i++){const s=primary.stages[i];const result=await inspect(primaryDb,primary,s,i<3);assert.equal(result.baseHead,parent);for(const id of primary.spec.milestones[i].criterionIds)covered.add(id);assert.deepEqual(load(primaryDb,s.runId).run.contract.criteria,primary.spec.contract.criteria.filter(c=>covered.has(c.id)));stages.push(result);if(i<3)parent=s.checkpoint.head;else{assert.equal(result.status,'BLOCKED');assert.equal(result.sourceFingerprint,snapshot.sourceFingerprint);assert.equal(s.checkpoint,undefined);assert.deepEqual(load(primaryDb,s.runId).events,primaryEnd.events);}}
 const recovery=JSON.parse(recoveryDb.prepare('SELECT body FROM delegations').get().body);assert.equal(recovery.status,'COMPLETED',recovery.reason);assert.equal(recovery.stages.length,1);assert.equal(recovery.events.filter(e=>e.kind==='authorized').length,1);assert.equal(recovery.events.filter(e=>e.kind==='worker-started').length,1);
 assert.equal(recovery.sourceHead,snapshot.head);assert.deepEqual(recovery.spec.contract.criteria,primary.spec.contract.criteria);
 const recovered=await inspect(recoveryDb,recovery,recovery.stages[0],true);assert.equal(recovered.baseHead,snapshot.head);
 assert.equal(git(snapshot.candidate,['rev-parse','HEAD']),snapshot.head);assert.equal(git(snapshot.candidate,['status','--porcelain']),'');assert.deepEqual((await stamp(snapshot.candidate)).files,(await stamp(stages[3].worktree)).files);
 const primaryBlockedAt=primary.events.findLast(e=>e.kind==='worker-ended').at;
 const result={result:'PASS',at:new Date().toISOString(),boundary:'Recovered trial: original unattended delegation BLOCKED at 3/4; one assistant review snapshot and a separately authorized completion. No manual product edits or additional user prompts.',primary,stages,recovery,recovered,primaryActiveDurationMs:Date.parse(primaryBlockedAt)-Date.parse(primary.authorizedAt),primaryBlockedAt,recoveryDurationMs:Date.parse(recovery.events.findLast(e=>e.kind==='completed').at)-Date.parse(recovery.authorizedAt),totalWallMs:Date.parse(recovery.events.findLast(e=>e.kind==='completed').at)-Date.parse(primary.authorizedAt),preparationMs:Date.parse(primary.authorizedAt)-Date.parse(before.preparationStartedAt),sourceAndIndexesPreserved:true,originalRuntimeAndAcceptancePreserved:true,assistantRecoveries:1,userPromptsAfterInitialAuthorization:0,technicalAuthorizations:2,certifiedCheckpoints:4,uncertifiedReviewSnapshots:1,finalCheckpoint:recovery.stages[0].checkpoint.head,totalTurns:stages.reduce((n,s)=>n+s.turns,0)+recovered.turns};
 await writeFile(root+'/evidence/ledger-audit.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({result:'PASS',primary:'BLOCKED 3/4',recovery:'COMPLETED',finalCheckpoint:result.finalCheckpoint,turns:result.totalTurns}));
}finally{primaryDb.close();recoveryDb.close();}
