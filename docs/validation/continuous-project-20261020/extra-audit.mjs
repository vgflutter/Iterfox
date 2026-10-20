import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {writeFile} from 'node:fs/promises';
const repo=process.argv[2];if(!repo)throw new Error('Provide reviewed checkout');
const {reportFixture}=await import(pathToFileURL(repo+'/tests/continuous/fixture.mjs'));
const {buildDelegationBrief}=await import(pathToFileURL(repo+'/src/delegations/brief.ts'));
const {renderDelegationReport}=await import(pathToFileURL(repo+'/src/delegations/export.ts'));
const f=await reportFixture();const results=[];
try{
 const baseline=await buildDelegationBrief(f.runs,f.completed.id);const original=structuredClone(f.completed.stages);
 const first=f.runs.get(original[0].runId);f.store.change(f.completed.id,d=>{d.stages[1].runId=first.id;});
 const duplicate=await buildDelegationBrief(f.runs,f.completed.id);assert.equal(duplicate.usage.turns,first.turns);assert.equal(duplicate.usage.tokens,first.tokens);assert.equal(duplicate.usage.runIds.length,1);results.push('Duplicate mission linkage is counted once in shared usage.');
 f.store.change(f.completed.id,d=>{d.stages=structuredClone(original);d.stages[1].runId='missing-fixture-ledger';});
 const missing=await buildDelegationBrief(f.runs,f.completed.id);assert.equal(missing.usage.complete,false);assert.equal(missing.usage.remainingTurns,null);assert.equal(missing.usage.remainingTokens,null);assert(missing.attention.some(a=>a.kind==='provenance-unavailable'));assert(missing.outcomes[1].criteria.every(c=>c.status==='UNAVAILABLE'));assert.equal(missing.sourceFreshness.status,'UNOBSERVED');results.push('Missing linked history gives partial usage, unavailable proof and visible attention.');
 f.store.change(f.completed.id,d=>{d.stages=structuredClone(original);});
 const last=f.runs.get(original[1].runId);const bad={schemaVersion:999,runId:last.id,seq:last.seq+1,id:'intentionally-corrupt-fixture-tail',at:new Date().toISOString(),type:'workflow.completed',message:'Corrupt fixture data',data:{}};
 f.runs.db.prepare('INSERT INTO events VALUES (?,?,?,?)').run(last.id,bad.seq,bad.id,JSON.stringify(bad));
 const corrupted=await buildDelegationBrief(f.runs,f.completed.id);assert.equal(corrupted.outcomes[1].checkpointEvidence.status,'AVAILABLE');assert(corrupted.outcomes[1].criteria.every(c=>c.status==='PASSED'));assert.equal(corrupted.outcomes[1].latestRecordedState.availability,'UNAVAILABLE');assert.equal(corrupted.usage.complete,false);assert(corrupted.attention.some(a=>a.kind==='provenance-unavailable'));results.push('A corrupt later event cannot rewrite a readable earlier checkpoint; latest state remains unavailable.');
 const payload='<img src=x onerror="globalThis.pwned=true"><script>globalThis.pwned=true</script> & "unsafe"';const hostile=structuredClone(baseline);hostile.goal=payload;hostile.attention=[{kind:'question',text:payload,source:{runId:payload}}];for(const o of hostile.outcomes){o.title=payload;o.outcome=payload;if(o.checkpoint){o.checkpoint.ref=payload;o.checkpoint.sourceFingerprint=payload;}for(const c of o.criteria)c.title=payload;for(const e of o.evidence)e.output=payload;}
 const html=renderDelegationReport(hostile);assert(!/<(?:img|script|iframe|object|embed)[\s>]/i.test(html));assert(!/<[a-z][^>]*\sonerror\s*=/i.test(html));assert(html.includes('&lt;script&gt;'));assert(html.includes('&amp;'));results.push('Goal, outcome, attention, criterion, checkpoint and evidence strings remain escaped in the HTML export.');
 console.log(JSON.stringify({result:'PASS',boundary:'Additional deterministic fixture audit, not real-model development evidence.',cases:results},null,2));
 if(process.argv[3])await writeFile(process.argv[3],JSON.stringify({result:'PASS',cases:results},null,2)+'\n');
}finally{await f.close();}
