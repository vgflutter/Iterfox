// Post-run visual inspection only; preserves every original audit screenshot.
import assert from 'node:assert/strict';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {pathToFileURL} from 'node:url';
import {chromium} from './runtime/node_modules/playwright/index.mjs';
const root=new URL('./',import.meta.url).pathname;
await readFile(root+'pair-finished.json'); // Do not compete with either timed model run.
const browser=await chromium.launch({channel:'chrome',headless:true,chromiumSandbox:true,args:['--disable-gpu']});const observations=[];
try{for(const arm of ['direct','iterfox']){
 const r=JSON.parse(await readFile(root+arm+'/report.json','utf8'));
 const hash=async()=>Object.fromEntries(await Promise.all(['src/domain.mjs','src/app.mjs','index.html','style.css','README.md'].map(async n=>[n,createHash('sha256').update(await readFile(r.worktree+'/'+n)).digest('hex')])));
 const before=await hash();const {createAppServer}=await import(pathToFileURL(r.worktree+'/server.mjs'));const server=createAppServer(r.worktree);await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const base='http://127.0.0.1:'+server.address().port;
 try{for(const [name,viewport]of [['desktop',{width:1440,height:1000}],['mobile',{width:390,height:844}]]){
  const context=await browser.newContext({viewport,reducedMotion:'reduce'});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(base);
  const data={version:1,items:[{id:'1',name:'Magliette',category:'Abiti',quantity:4,packed:true},{id:'2',name:'Caricatore USB-C',category:'Tecnologia',quantity:2,packed:false},{id:'3',name:'Libro per il viaggio',category:'Tempo libero',quantity:1,packed:false}]};
  await page.getByLabel('Backup JSON',{exact:true}).fill(JSON.stringify(data));await page.getByRole('button',{name:'Importa backup',exact:true}).click();await page.waitForTimeout(150);
  const beforeReset=await page.evaluate(()=>({scrollY,active:document.activeElement?.id,fixedLinks:[...document.querySelectorAll('a')].filter(el=>getComputedStyle(el).position==='fixed').map(el=>({text:el.textContent,focused:el===document.activeElement,y:el.getBoundingClientRect().y,height:el.getBoundingClientRect().height}))}));
  await mkdir(root+arm+'/presentation',{recursive:true});await page.screenshot({path:root+arm+'/presentation/'+name+'-scrolled-viewport.png'});
  await page.evaluate(()=>window.scrollTo(0,0));await page.waitForTimeout(100);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);assert.deepEqual(errors,[]);
  await page.screenshot({path:root+arm+'/presentation/'+name+'.png',fullPage:true});await page.screenshot({path:root+arm+'/presentation/'+name+'-viewport.png'});
  observations.push({arm,name,viewport,beforeReset,captureScrollY:await page.evaluate(()=>scrollY),errors});await context.close();
 }}finally{server.closeAllConnections();await new Promise(resolve=>server.close(resolve));}
 assert.deepEqual(await hash(),before);
}}
finally{await browser.close();}
const result={at:new Date().toISOString(),status:'passed',scope:'Post-run captures with identical sample data; scroll explicitly reset to zero. Original full-page captures and audit outcomes preserved. App source hashes unchanged.',observations};await writeFile(root+'presentation.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result));
