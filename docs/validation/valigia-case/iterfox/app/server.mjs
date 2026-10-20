import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
export function createAppServer(root=process.cwd()) {return createServer(async(req,res)=>{try{const p=new URL(req.url,'http://localhost').pathname;const name=p==='/'?'index.html':p.slice(1);if(!/^(index\.html|style\.css|src\/[a-zA-Z0-9_-]+\.mjs)$/.test(name)){res.writeHead(404);res.end();return;}const bytes=await readFile(resolve(root,name));res.setHeader('Content-Type',name.endsWith('.mjs')?'text/javascript':name.endsWith('.css')?'text/css':'text/html');res.setHeader('Cache-Control','no-store');res.end(bytes);}catch{res.writeHead(404);res.end();}});}
if(import.meta.url===pathToFileURL(process.argv[1]).href)createAppServer().listen(Number(process.env.PORT??4350),'127.0.0.1',()=>console.log('Valigia locale pronta'));
