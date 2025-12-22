const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const srcHtmlPath = path.join(rootDir, 'src', 'renderer', 'index.html');
const distDir = path.join(rootDir, 'dist');
const distHtmlPath = path.join(distDir, 'index.html');

const html = fs.readFileSync(srcHtmlPath, 'utf8');
const updatedHtml = html.replace(/\.\.\/\.\.\/dist\//g, './');

fs.mkdirSync(distDir, { recursive: true });
fs.writeFileSync(distHtmlPath, updatedHtml, 'utf8');
