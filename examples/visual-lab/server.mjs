import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
const port = Number(process.argv[2] ?? 4357);
createServer(async (req, res) => {
  const file = req.url === '/approved' ? 'approved.html' : 'index.html';
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(await readFile(new URL(file, import.meta.url)));
}).listen(port, '127.0.0.1');
