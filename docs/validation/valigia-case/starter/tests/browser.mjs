import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {createAppServer} from '../server.mjs';
const {chromium}=await import(pathToFileURL(process.env.VALIGIA_PLAYWRIGHT));
const server=createAppServer();await new Promise(r=>server.listen(0,'127.0.0.1',r));
const base='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({channel:'chrome',headless:true,chromiumSandbox:true,args:['--disable-gpu']});
const context=await browser.newContext({viewport:{width:1440,height:1000}});const page=await context.newPage();
const cases=[];const errors=[];const external=[];
page.on('pageerror',e=>errors.push(e.message));page.on('request',req=>{if(!req.url().startsWith(base+'/')&&!req.url().startsWith('data:'))external.push(req.url());});
const check=async(name,fn)=>{try{await fn();cases.push({name,passed:true});console.log('PASS '+name);}catch(e){cases.push({name,passed:false,error:e.message});console.log('FAIL '+name+' '+e.message);}};
const wait=()=>page.waitForTimeout(120);
const total=async(key,n)=>{assert.equal(Number(await page.getByTestId(key).textContent()),n);};
const add=async(name,n=1,category='Varie')=>{await page.getByLabel('Nome oggetto',{exact:true}).fill(name);await page.getByLabel('Quantità',{exact:true}).fill(String(n));await page.getByLabel('Categoria',{exact:true}).fill(category);await page.getByRole('button',{name:'Aggiungi',exact:true}).click();await wait();};
try{
 await page.goto(base);await page.getByLabel('Nome oggetto',{exact:true}).waitFor({timeout:8000});
 await check('empty state and keyboard addition',async()=>{await total('remaining',0);await page.getByLabel('Nome oggetto',{exact:true}).fill('Calze');await page.getByLabel('Quantità',{exact:true}).fill('3');await page.getByLabel('Categoria',{exact:true}).fill('Vestiti');await page.getByLabel('Nome oggetto',{exact:true}).press('Enter');await wait();await total('total',3);assert(await page.getByLabel('Nome oggetto',{exact:true}).evaluate(el=>el===document.activeElement));});
 await check('quantities packed counts and category filter',async()=>{await add('Cavo',2,'Tecnologia');await page.getByRole('checkbox',{name:'Preparato: Calze',exact:true}).check();await wait();await total('packed',3);await total('remaining',2);await page.getByRole('spinbutton',{name:'Quantità: Cavo',exact:true}).fill('4');await page.getByRole('spinbutton',{name:'Quantità: Cavo',exact:true}).press('Tab');await wait();await total('total',7);await page.getByLabel('Filtra categoria',{exact:true}).selectOption({label:'Tecnologia'});assert.equal(await page.getByRole('checkbox',{name:'Preparato: Calze',exact:true}).count(),0);await total('packed',3);await page.getByLabel('Filtra categoria',{exact:true}).selectOption({label:'Tutte'});});
 await check('persistence across refresh and deletion',async()=>{await page.reload();await page.getByRole('checkbox',{name:'Preparato: Calze',exact:true}).waitFor();assert(await page.getByRole('checkbox',{name:'Preparato: Calze',exact:true}).isChecked());await total('total',7);await page.getByRole('button',{name:'Elimina: Cavo',exact:true}).click();await wait();await total('total',3);});
 await check('backup valid and invalid imports are atomic',async()=>{await page.getByRole('button',{name:'Esporta backup',exact:true}).click();const field=page.getByLabel('Backup JSON',{exact:true});const text=await field.inputValue();assert.equal(JSON.parse(text).items[0].quantity,3);await add('Altro',1);await field.fill(text);await page.getByRole('button',{name:'Importa backup',exact:true}).click();await wait();await total('total',3);await field.fill(JSON.stringify({version:1,items:[{id:'z',name:'Solo prima riga',quantity:1,category:'Varie',packed:false},{id:'bad',quantity:0}]}));await page.getByRole('button',{name:'Importa backup',exact:true}).click();await wait();assert(await page.getByRole('alert').count()>0);await total('total',3);assert(await page.getByRole('checkbox',{name:'Preparato: Calze',exact:true}).isChecked());});
 await check('HTML-like Unicode names render as text',async()=>{const name='<img src=x onerror=alert(1)> 日本語';await add(name,1,'Viaggio');assert.equal(await page.locator('[data-item-id] img').count(),0);assert(await page.getByRole('checkbox',{name:'Preparato: '+name,exact:true}).count()>0);});
 await check('390px layout and no page errors or external requests',async()=>{await page.setViewportSize({width:390,height:844});await wait();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);assert.deepEqual(errors,[]);assert.deepEqual(external,[]);});
 await check('storage failure is reported and memory list still works',async()=>{await page.evaluate(()=>{Storage.prototype.setItem=()=>{throw new DOMException('Full','QuotaExceededError');};});await add('Memoria',2,'Varie');assert(await page.getByRole('alert').count()>0);assert(await page.getByRole('checkbox',{name:'Preparato: Memoria',exact:true}).count()>0);});
}catch(e){cases.push({name:'page initialization',passed:false,error:e.message});}
finally{await mkdir('artifacts',{recursive:true});await page.screenshot({path:'artifacts/browser-final.png',fullPage:true});await writeFile('artifacts/browser-results.json',JSON.stringify({cases,errors,external},null,2));await browser.close();server.closeAllConnections();await new Promise(r=>server.close(r));}
if(cases.length!==7||cases.some(c=>!c.passed))process.exitCode=1;
