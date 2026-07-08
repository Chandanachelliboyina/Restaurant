import fs from 'fs';
import path from 'path';

function walk(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      walk(path.join(dir, file), fileList);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      fileList.push(path.join(dir, file));
    }
  }
  return fileList;
}

const allFiles = walk('src');
const assetsDir = fs.readdirSync('src/assets');
const publicAssetsDir = fs.existsSync('public/assets') ? fs.readdirSync('public/assets') : [];

const importRegex = /import\s+.*?from\s+["']@\/assets\/([^"']+)["']/g;
const imgPathRegex = /["']\/assets\/([^"']+)["']/g;

for (const file of allFiles) {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const filename = match[1];
    if (assetsDir.includes(filename)) continue;
    const caseMatch = assetsDir.find(f => f.toLowerCase() === filename.toLowerCase());
    if (caseMatch) {
      console.log(`[${file}] CASE MISMATCH import: requested "${filename}", actual is "${caseMatch}"`);
    } else {
      console.log(`[${file}] MISSING import: "${filename}"`);
    }
  }
  
  while ((match = imgPathRegex.exec(content)) !== null) {
    const filename = match[1];
    if (publicAssetsDir.includes(filename)) continue;
    const caseMatch = publicAssetsDir.find(f => f.toLowerCase() === filename.toLowerCase());
    if (caseMatch) {
      console.log(`[${file}] CASE MISMATCH public path: requested "${filename}", actual is "${caseMatch}"`);
    } else {
      console.log(`[${file}] MISSING public path: "${filename}"`);
    }
  }
}
