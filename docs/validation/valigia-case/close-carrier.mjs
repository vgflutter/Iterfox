// Administrative cleanup after measurement, not a model intervention or app edit.
import {readFile,writeFile} from 'node:fs/promises';
import {openStore} from './runtime/dist/service.js';
const root=new URL('./',import.meta.url).pathname;
await readFile(root+'pair-finished.json');
const report=JSON.parse(await readFile(root+'direct/report.json','utf8'));
const store=openStore(root+'direct');
try{
 const prior=store.get(report.runId);
 if(prior.status==='RUNNING')store.append(prior.id,'workflow.stopped','Closed direct-SDK isolation carrier after the measured invocation and external audit ended. This is not an Iterfox engine run; external results and direct claim remain in report.json.');
 const state=store.get(report.runId);
 const receipt={at:new Date().toISOString(),runId:state.id,status:state.status,purpose:'Close harness-only ledger carrier after the direct SDK process finished; no code edit, model feedback or acceptance claim.',measuredDirectStatus:report.status};
 await writeFile(root+'direct/carrier-closed.json',JSON.stringify(receipt,null,2));console.log(JSON.stringify(receipt));
}finally{store.close();}
