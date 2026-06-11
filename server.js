import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { exec } from 'node:child_process';

const root = process.cwd();
const port = Number(process.env.PORT || 63241);
const host = '127.0.0.1';

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml; charset=utf-8'
};

function safePath(urlPath) {
  const decoded = decodeURIComponent((urlPath || '/').split('?')[0]);
  const requested = decoded === '/' ? '/index.html' : decoded;
  const normalized = normalize(requested).replace(/^([.][.][\/\\])+/, '');
  return join(root, normalized);
}

function openBrowser(url) {
  const platform = process.platform;
  const command = platform === 'win32'
    ? `start "" "${url}"`
    : platform === 'darwin'
      ? `open "${url}"`
      : `xdg-open "${url}"`;
  exec(command, () => {});
}

const server = createServer(async (req, res) => {
  try {
    const filePath = safePath(req.url);
    const finalPath = existsSync(filePath) ? filePath : join(root, 'index.html');
    const ext = extname(finalPath).toLowerCase();
    const data = await readFile(finalPath);
    res.writeHead(200, {
      'Content-Type': mimeTypes[ext] || 'application/octet-stream',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Surrogate-Control': 'no-store'
    });
    res.end(data);
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`Erro ao carregar o site: ${error.message}`);
  }
});

server.listen(port, host, () => {
  const url = `http://${host}:${port}/?eng-soldas=${Date.now()}`;
  console.log('');
  console.log('==============================================');
  console.log('ENG SOLDAS rodando');
  console.log(`Abra este endereço: ${url}`);
  console.log('==============================================');
  console.log('');
  openBrowser(url);
});
