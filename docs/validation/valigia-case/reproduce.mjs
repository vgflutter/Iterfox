// Run only when intentionally authorizing a fresh real-Codex paired trial.
import {parseArgs} from 'node:util';
import {resolve,basename,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {mkdir,cp,copyFile,readFile,writeFile} from 'node:fs/promises';
import {execFile,spawn} from 'node:child_process';
import {promisify} from 'node:util';
import {createHash,randomInt} from 'node:crypto';
const {values}=parseArgs({options:{source:{type:'string'},out:{type:'string'},authorize:{type:'boolean'}}});
if(!values.source||!values.out||!values.authorize)throw Error('Use --source <built Iterfox checkout with node_modules> --out <new directory> --authorize. This runs real Codex twice using your account, up to 20 minutes per arm.');
const exec=promisify(execFile);
const source=resolve(values.source),out=resolve(values.out);
const bundle=fileURLToPath(new URL('./',import.meta.url));
await mkdir(out); // Must be new: never overwrite a previous trial or result.
const git=async(cwd,args)=>(await exec('git',['-c','core.hooksPath=/dev/null','-c','commit.gpgsign=false',...args],{cwd})).stdout.trim();
const sourceHead=await git(source,['rev-parse','HEAD']);
await cp(source,out+'/runtime',{recursive:true,filter:p=>!['.git','.iterfox','node_modules'].includes(basename(p))});
await cp(source+'/node_modules',out+'/runtime/node_modules',{recursive:true,verbatimSymlinks:true});
await exec('npm',['run','build'],{cwd:out+'/runtime',maxBuffer:4*1024*1024});
await cp(bundle+'/starter',out+'/fixture',{recursive:true});
for(const n of ['audit.mjs','run-pair.mjs','close-carrier.mjs','prompt.txt'])await copyFile(bundle+'/'+n,out+'/'+n);
await git(out+'/fixture',['init','-q']);await git(out+'/fixture',['add','.']);
await git(out+'/fixture',['-c','user.name=Iterfox Validation','-c','user.email=validation@iterfox.local','commit','-qm','Fixed Valigia benchmark starter']);
const fixtureHead=await git(out+'/fixture',['rev-parse','HEAD']);
const sha=async p=>createHash('sha256').update(await readFile(p)).digest('hex');
const original=JSON.parse(await readFile(bundle+'/protocol.json','utf8'));
const protocol={...original,preparedAt:new Date().toISOString(),sourceHead,fixtureHead,browserModule:out+'/runtime/node_modules/playwright/index.mjs',order:randomInt(2)?['direct','iterfox']:['iterfox','direct'],reproductionOf:original.fixtureHead,runtimeHashes:Object.fromEntries(await Promise.all(Object.keys(original.runtimeHashes).map(async n=>[n,await sha(out+'/runtime/'+n)])))};
for(const [n,expected]of Object.entries(protocol.immutableHashes))if(await sha(out+'/fixture/'+n)!==expected)throw Error('Bundled acceptance changed: '+n);
await writeFile(out+'/protocol.json',JSON.stringify(protocol,null,2)+'\n');
const child=spawn(process.execPath,[out+'/run-pair.mjs'],{cwd:out,stdio:'inherit',env:process.env});
child.on('error',e=>{console.error(e);process.exitCode=1;});
child.on('exit',async code=>{
 process.exitCode=code??1;
 if(code===0){try{const result=await exec(process.execPath,[out+'/close-carrier.mjs'],{cwd:out});console.log(result.stdout);}catch(error){console.error(error);process.exitCode=1;}}
});
