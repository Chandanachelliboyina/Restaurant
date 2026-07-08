import fs from 'fs';

const galleryTs = fs.readFileSync('src/routes/_authenticated.gallery.tsx', 'utf8');
const assetsDir = fs.readdirSync('src/assets');

const imgRegex = /U\("([^"]+)"\)/g;
let match;
let found = 0;
let missing = 0;

while ((match = imgRegex.exec(galleryTs)) !== null) {
  const id = match[1];
  const matchingAsset = assetsDir.find(f => f.includes(id));
  if (matchingAsset) {
    found++;
  } else {
    missing++;
    console.log('Gallery missing:', id);
  }
}

console.log('Gallery Found:', found);
console.log('Gallery Missing:', missing);
