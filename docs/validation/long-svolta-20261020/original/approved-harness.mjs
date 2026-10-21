import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {setTimeout as delay} from 'node:timers/promises';

export async function appTest(run) {
  const data = await mkdtemp(join(tmpdir(),'svolta-check-'));
  let child;
  async function stop() {
    if(!child)return;
    const proc=child;child=undefined;
    const closed=new Promise(resolve=>proc.once('close',resolve));
    try{process.kill(-proc.pid,'SIGTERM')}catch{}
    await Promise.race([closed,delay(1000).then(()=>{try{process.kill(-proc.pid,'SIGKILL')}catch{}})]);
  }
  async function start() {
    child=spawn(process.execPath,['src/server.mjs'],{cwd:process.cwd(),env:{...process.env,PORT:'0',SVOLTA_DATA_DIR:data},detached:true,stdio:['ignore','pipe','pipe']});
    const origin=await new Promise((resolve,reject)=>{
      let out='';const timer=setTimeout(()=>reject(Error('Server did not announce SVOLTA_READY in 8s')),8000);
      child.once('error',e=>{clearTimeout(timer);reject(e)});
      child.once('exit',code=>{clearTimeout(timer);reject(Error('Server exited before ready: '+code+' '+out.slice(-1000)))});
      child.stdout.on('data',b=>{out+=b.toString();const m=out.match(/SVOLTA_READY (http:\/\/127\.0\.0\.1:\d+)/);if(m){clearTimeout(timer);resolve(m[1])}});
      child.stderr.on('data',b=>{out+=b.toString()});
    });
    return origin;
  }
  let origin;
  const api=async(path,method='GET',body,status=200)=>{
    const response=await fetch(origin+path,{method,headers:body===undefined?{}:{'content-type':'application/json'},...(body===undefined?{}:{body:JSON.stringify(body)}),signal:AbortSignal.timeout(4000)});
    const text=await response.text();
    if(Array.isArray(status))assert(status.includes(response.status),`${method} ${path}: ${response.status}, ${text.slice(0,500)}`);
    else assert.equal(response.status,status,`${method} ${path}: ${text.slice(0,500)}`);
    if(response.status===204)return null;
    assert.match(response.headers.get('content-type')??'',/json/i,`${path} must return JSON`);
    return JSON.parse(text);
  };
  const project=async(name='Progetto di prova')=>api('/api/projects','POST',{name},201);
  const task=async(projectId,title='Attività di prova',extra={})=>api('/api/tasks','POST',{projectId,title,...extra},201);
  const invalid=async(path,body,method='POST')=>api(path,method,body,[400,404,409,413,422]);
  try{origin=await start();await run({api,project,task,invalid,get origin(){return origin},async restart(){await stop();origin=await start()}})}
  finally{await stop();await rm(data,{recursive:true,force:true})}
}
