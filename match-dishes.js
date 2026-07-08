import fs from 'fs';

const dataTs = fs.readFileSync('src/lib/data.ts', 'utf8');
const assetsDir = fs.readdirSync('src/assets');
const publicAssetsDir = fs.existsSync('public/assets') ? fs.readdirSync('public/assets') : [];
const allAssets = [...assetsDir.map(f => 'src/assets/' + f), ...publicAssetsDir.map(f => 'public/assets/' + f)];

// Extract all dish names
const nameRegex = /name:\s*"([^"]+)"/g;
let match;
while ((match = nameRegex.exec(dataTs)) !== null) {
  const name = match[1];
  const expectedKebab = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '.jpg';
  
  // Find any asset that closely matches the name
  const matchedAsset = allAssets.find(f => {
    const fLower = f.toLowerCase();
    return fLower.includes(expectedKebab) || 
           fLower.includes(name.toLowerCase().replace(/\s+/g, '')) ||
           fLower.includes(name.toLowerCase().replace(/\s+/g, '-'));
  });
  
  if (matchedAsset) {
    console.log(`Dish: "${name}" -> matched ${matchedAsset}`);
  }
}
