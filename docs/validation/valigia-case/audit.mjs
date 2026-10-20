// Frozen additional audit: new inputs within SPEC.md, never sent as repair feedback.
import assert from 'node:assert/strict';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
const target=process.cwd();
const out=process.env.VALIGIA_AUDIT_OUT;
const d=await import(pathToFileURL(resolve(target,'src/domain.mjs')));
const cases=[];
async function check(name,fn){try{await fn();cases.push({name,passed:true});}catch(e){cases.push({name,passed:false,error:e.message});}}
let seed=20261020;const random=()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296;};
await check('250 deterministic mixed operations preserve quantities, identity and immutability',()=>{
 let s=d.emptyList();let reference=[];
 for(let i=0;i<250;i++){
  const before=structuredClone(s);const mode=reference.length?Math.floor(random()*4):0;
  if(mode===0){const name=['🧳 旅','Caffè','<script>test</script>','Été'][i%4]+' '+i;const quantity=1+Math.floor(random()*9);s=d.addItem(s,{name,quantity,category:'Gruppo '+i%3});const row=s.items.find(x=>!reference.some(y=>y.id===x.id));assert(row);reference.push({...row,name,quantity,packed:false});}
  else{const n=Math.floor(random()*reference.length);const row=reference[n];if(mode===1){const quantity=1+Math.floor(random()*99);s=d.updateItem(s,row.id,{quantity});reference[n]={...row,quantity};}else if(mode===2){s=d.updateItem(s,row.id,{packed:!row.packed});reference[n]={...row,packed:!row.packed};}else{s=d.removeItem(s,row.id);reference.splice(n,1);}}
  assert.deepEqual(d.importList(d.exportList(before)),before);
  const total=reference.reduce((n,x)=>n+x.quantity,0),packed=reference.filter(x=>x.packed).reduce((n,x)=>n+x.quantity,0);
  assert.deepEqual(d.summary(s),{total,packed,remaining:total-packed});assert.equal(new Set(s.items.map(x=>x.id)).size,s.items.length);
 }
});
await check('import rejects invalid later rows without mutating previous data',()=>{
 const current=d.addItem(d.emptyList(),{name:'Prima',quantity:2});const before=structuredClone(current);
 const row=current.items[0];for(const bad of [{...row,id:'b',quantity:1.1},{...row,id:'b',packed:'false'},{...row,id:'b',name:' '.repeat(5)},{...row,id:'b',category:'x'.repeat(41)},{...row,id:'x'.repeat(101)}])assert.throws(()=>d.importList(JSON.stringify({version:1,items:[row,bad]})));
 assert.deepEqual(current,before);
});
const {createAppServer}=await import(pathToFileURL(resolve(target,'server.mjs')));
const {chromium}=await import(pathToFileURL(process.env.VALIGIA_PLAYWRIGHT));
const server=createAppServer();await new Promise(r=>server.listen(0,'127.0.0.1',r));
const base='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({channel:'chrome',headless:true,chromiumSandbox:true,args:['--disable-gpu']});
try{
 await check('unreadable persisted data is visible and not overwritten merely by loading',async()=>{
  const context=await browser.newContext();const page=await context.newPage();await page.addInitScript(()=>{if(!sessionStorage.getItem('seeded')){localStorage.setItem('valigia.v1','{broken');sessionStorage.setItem('seeded','yes');}});
  await page.goto(base);await page.getByLabel('Nome oggetto',{exact:true}).waitFor();await page.waitForTimeout(200);assert(await page.getByRole('alert').count()>0);assert.equal(await page.evaluate(()=>localStorage.getItem('valigia.v1')),'{broken');await context.close();
 });
 await check('category filtering survives refresh and imported Unicode quantity data stays global',async()=>{
  const context=await browser.newContext();const page=await context.newPage();await page.goto(base);await page.getByLabel('Backup JSON',{exact:true}).waitFor();
  const list={version:1,items:[{id:'id-1',name:'日本語',category:'Abiti',quantity:7,packed:true},{id:'id-2',name:'Câble USB',category:'Elettronica',quantity:4,packed:false}]};
  await page.getByLabel('Backup JSON',{exact:true}).fill(JSON.stringify(list));await page.getByRole('button',{name:'Importa backup',exact:true}).click();await page.getByRole('checkbox',{name:'Preparato: 日本語',exact:true}).waitFor();await page.getByLabel('Filtra categoria',{exact:true}).selectOption({label:'Elettronica'});assert.equal(Number(await page.getByTestId('packed').textContent()),7);assert.equal(Number(await page.getByTestId('remaining').textContent()),4);
  await page.reload();await page.getByLabel('Filtra categoria',{exact:true}).waitFor();await page.getByLabel('Filtra categoria',{exact:true}).selectOption({label:'Elettronica'});assert.equal(Number(await page.getByTestId('total').textContent()),11);await page.getByRole('button',{name:'Esporta backup',exact:true}).click();assert.deepEqual(JSON.parse(await page.getByLabel('Backup JSON',{exact:true}).inputValue()),list);await context.close();
 });
 await check('invalid UI import preserves the persisted bytes as well as the visible list',async()=>{
  const context=await browser.newContext();const page=await context.newPage();await page.goto(base);await page.getByLabel('Nome oggetto',{exact:true}).fill('Prima');await page.getByLabel('Quantità',{exact:true}).fill('2');await page.getByRole('button',{name:'Aggiungi',exact:true}).click();await page.waitForTimeout(100);const before=await page.evaluate(()=>localStorage.getItem('valigia.v1'));
  await page.getByLabel('Backup JSON',{exact:true}).fill('{bad');await page.getByRole('button',{name:'Importa backup',exact:true}).click();await page.waitForTimeout(100);assert.equal(await page.evaluate(()=>localStorage.getItem('valigia.v1')),before);assert(await page.getByRole('alert').count()>0);await context.close();
 });
 await check('actual app desktop and 390px captures, no errors, no viewport overflow',async()=>{
  const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(base);await page.getByLabel('Backup JSON',{exact:true}).waitFor();
  await page.getByLabel('Backup JSON',{exact:true}).fill(JSON.stringify({version:1,items:[{id:'1',name:'Magliette',category:'Abiti',quantity:4,packed:true},{id:'2',name:'Caricatore USB-C',category:'Tecnologia',quantity:2,packed:false},{id:'3',name:'Libro per il viaggio',category:'Tempo libero',quantity:1,packed:false}]}));await page.getByRole('button',{name:'Importa backup',exact:true}).click();await page.waitForTimeout(150);
  await mkdir(out,{recursive:true});await page.screenshot({path:resolve(out,'desktop.png'),fullPage:true});await page.setViewportSize({width:390,height:844});await page.waitForTimeout(100);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await page.screenshot({path:resolve(out,'mobile.png'),fullPage:true});assert.deepEqual(errors,[]);await context.close();
 });
}finally{await browser.close();server.closeAllConnections();await new Promise(r=>server.close(r));}
const result={at:new Date().toISOString(),seed:20261020,cases,passed:cases.filter(c=>c.passed).length,total:cases.length,scope:'New deterministic data inside the same predeclared app requirements; no seeded defect or repair feedback.'};
await mkdir(out,{recursive:true});await writeFile(resolve(out,'extra-audit.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result));if(result.passed!==result.total)process.exitCode=1;
