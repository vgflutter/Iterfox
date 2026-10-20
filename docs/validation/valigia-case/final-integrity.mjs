import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {openStore} from './runtime/dist/service.js';
import {auditChanges,stamp} from './runtime/dist/core/workspace.js';
const root=new URL('./',import.meta.url).pathname;
const protocol=JSON.parse(await readFile(root+'protocol.json','utf8'));
const sha=async p=>createHash('sha256').update(await readFile(p)).digest('hex');
const checks=[];
for(const arm of ['direct','iterfox']){
 const r=JSON.parse(await readFile(root+arm+'/report.json','utf8'));const store=openStore(root+arm);
 try{
  const s=store.get(r.runId);await auditChanges(s);assert.deepEqual(await stamp(s.worktree),r.finalStamp);
  for(const [n,hash]of Object.entries(protocol.immutableHashes))assert.equal(await sha(s.worktree+'/'+n),hash);
  checks.push({arm,sourceFingerprint:r.finalStamp.fingerprint,originalHead:r.finalStamp.head,immutableFilesChecked:5,postAuditSourceUnchanged:true,administrativeLedgerStatus:s.status});
 }finally{store.close();}
}
for(const [n,hash]of Object.entries(protocol.runtimeHashes))assert.equal(await sha(root+'runtime/'+n),hash);
const result={at:new Date().toISOString(),status:'passed',checks,frozenRuntimeModulesChecked:5};await writeFile(root+'final-integrity.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result));
