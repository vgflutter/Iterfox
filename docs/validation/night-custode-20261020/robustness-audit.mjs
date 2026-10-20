// Additional black-box checks, prepared before the final outcome completed.
// Not fed to the primary coding run and never modifies its acceptance.
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdtemp,rm,writeFile,readFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {createServer} from 'node:net';
import http from 'node:http';
const root='/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020';
const cwd=process.argv[2]||root+'/delivery';
const dir=await mkdtemp(tmpdir()+'/custode-robustness-');let child;const results=[];
const s=createServer();await new Promise(r=>s.listen(0,'127.0.0.1',r));const port=s.address().port;await new Promise(r=>s.close(r));const base='http://127.0.0.1:'+port;
async function request(path,method='GET',body){const r=await fetch(base+path,{method,headers:body===undefined?{}:{'content-type':'application/json'},body:body===undefined?undefined:JSON.stringify(body),signal:AbortSignal.timeout(5000)});return {status:r.status,data:await r.json()};}
async function ok(path,method='GET',body){const r=await request(path,method,body);assert.ok(r.status>=200&&r.status<300,JSON.stringify(r));return r.data;}
async function check(name,fn){try{await fn();results.push({name,status:'PASS'});}catch(e){results.push({name,status:'FAIL',error:e.stack});}console.log(results.at(-1).status+' '+name);}
try{
 child=spawn(process.execPath,['src/server.mjs'],{cwd,env:{...process.env,HOST:'127.0.0.1',PORT:String(port),CUSTODE_DATA_DIR:dir+'/data'},stdio:'ignore'});
 for(let i=0;i<100;i++){try{if((await request('/api/health')).status===200)break;}catch{}await new Promise(r=>setTimeout(r,100));}
 await check('Italian accented upper/lower case search across all text fields',async()=>{
  const values=[{name:'CAFFÈ',category:'CITTÀ',location:'UNITÀ',notes:'QUALITÀ'}, {name:'Ètagère',category:'École',location:'Forlì',notes:'PERCHÉ'}];
  const items=[];for(const value of values)items.push(await ok('/api/items','POST',value));
  for(const q of ['caffè','CAFFÈ','città','unità','qualità','èTAGÈRE','éCOLE','FORLÌ','perché']){const expected=items.filter(x=>[x.name,x.category,x.location,x.notes].some(v=>v.toLocaleLowerCase('it').includes(q.toLocaleLowerCase('it')))).map(x=>x.id).sort();const actual=(await ok('/api/items?q='+encodeURIComponent(q))).map(x=>x.id).sort();assert.deepEqual(actual,expected,'query '+q);}
 });
 await check('UTF-8 JSON survives a network chunk splitting an accented character',async()=>{
  const expected='Ètà 👩🏽‍🔧 東京';const body=Buffer.from(JSON.stringify({name:expected,notes:'Caffè Ω 日本語'}));const split=body.indexOf(Buffer.from('È'))+1;
  const result=await new Promise((resolve,reject)=>{const req=http.request(base+'/api/items',{method:'POST',headers:{'content-type':'application/json','transfer-encoding':'chunked'}},res=>{const chunks=[];res.on('data',c=>chunks.push(c));res.on('end',()=>{try{resolve({status:res.statusCode,data:JSON.parse(Buffer.concat(chunks).toString('utf8'))});}catch(e){reject(e);}});});req.on('error',reject);req.setTimeout(5000,()=>req.destroy(Error('Chunked HTTP timeout')));req.on('socket',socket=>socket.setNoDelay(true));req.write(body.subarray(0,split));setTimeout(()=>req.end(body.subarray(split)),25);});
  assert.equal(result.status,201);assert.equal(result.data.name,expected);assert.equal(result.data.notes,'Caffè Ω 日本語');
 });
 await check('Malformed JSON root types return 4xx without changing saved state',async()=>{
  const before=await ok('/api/backup');for(const path of ['/api/items','/api/tasks','/api/restore'])for(const body of [null,[],true,42,'text']){const r=await request(path,'POST',body);assert.ok(r.status>=400&&r.status<500,path+' '+JSON.stringify(body)+' '+JSON.stringify(r));assert.equal(typeof r.data.error,'string');assert.deepEqual(await ok('/api/backup'),before);}
 });
}finally{
 if(child&&child.exitCode===null)await new Promise(resolve=>{const timer=setTimeout(()=>{child.kill('SIGKILL');resolve();},3000);child.once('exit',()=>{clearTimeout(timer);resolve();});child.kill('SIGTERM');});
 await rm(dir,{recursive:true,force:true});await writeFile(root+'/evidence/robustness-audit.json',JSON.stringify({at:new Date().toISOString(),cwd,method:'Additional pre-completion black-box robustness audit, separate from the nine pinned audit groups and six immutable primary gates; no feedback to the primary run.',results,passed:results.filter(x=>x.status==='PASS').length,total:results.length},null,2)+'\n');
}
if(results.some(x=>x.status==='FAIL'))process.exitCode=1;
