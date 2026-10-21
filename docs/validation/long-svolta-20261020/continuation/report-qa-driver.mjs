import assert from 'node:assert/strict';
import {readFile,writeFile,stat} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {createRequire} from 'node:module';
import {fileURLToPath,pathToFileURL} from 'node:url';
const base='/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r4';
const report='/Users/vins/work/iterfox/.iterfox/development/long-delegation-review/docs/validation/long-svolta-20261020';
const manifest=JSON.parse(await readFile(report+'/manifest.json','utf8'));
for(const[file,hash]of Object.entries(manifest.files))assert.equal(createHash('sha256').update(await readFile(report+'/'+file)).digest('hex'),hash,file);
const require=createRequire(base+'/runtime/package.json');
const {chromium}=require('playwright');
const browser=await chromium.launch({channel:'chrome',headless:true,chromiumSandbox:true});
const context=await browser.newContext({javaScriptEnabled:false,reducedMotion:'reduce'});
const observations=[];
try{
  for(const file of ['index.html','original/index.html','intermediate/project-brief.html','review-blocked/project-brief.html','continuation/project-brief.html']){
    for(const width of [1440,390]){
      const page=await context.newPage();
      await page.setViewportSize({width,height:1000});
      const errors=[];const external=[];
      page.on('pageerror',e=>errors.push(e.message));
      page.on('request',r=>{if(/^https?:/.test(r.url()))external.push(r.url())});
      const url=pathToFileURL(report+'/'+file).href;
      await page.goto(url);
      await page.locator('img').evaluateAll(images=>images.forEach(i=>i.loading='eager'));
      await page.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth>0));
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,file+' '+width+' overflow');
      const references=await page.locator('a[href],img[src]').evaluateAll(elements=>elements.map(e=>e.href||e.src));
      let localLinks=0;
      for(const ref of references){const u=new URL(ref,url);if(u.protocol==='file:'){u.hash='';await stat(fileURLToPath(u));localLinks++}}
      assert.equal(await page.locator('img').evaluateAll(images=>images.every(i=>i.complete&&i.naturalWidth>0)),true,file+' image loading');
      assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
      const name='report-'+file.replaceAll('/','-').replace('.html','')+'-'+width+'.png';
      await page.screenshot({path:base+'/evidence/'+name});
      observations.push({file,width,javaScriptEnabled:false,localReferencesChecked:localLinks,pageErrors:errors,externalRequests:external,horizontalOverflow:false});
      await page.close();
    }
  }
  const result={at:new Date().toISOString(),result:'PASS',manifestFilesChecked:Object.keys(manifest.files).length,observations};
  await writeFile(base+'/evidence/report-qa.json',JSON.stringify(result,null,2));
  console.log(JSON.stringify(result,null,2));
}finally{await browser.close()}
