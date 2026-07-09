import fs from "fs";

let content = fs.readFileSync("src/lib/data.ts", "utf8");

// 1. Remove the image imports at the top
const importRegex = new RegExp(
  '^import \\w+(?:Image)? from "@\\\\/assets\\\\/[^"]+";\\r?\\n',
  "gm",
);
content = content.replace(importRegex, "");

// 2. Replace the IMG function and IMAGES object with getLocalImage
const funcReplacement = `const LOCAL_ASSETS = import.meta.glob('@/assets/*.{jpg,png,jpeg,avif,webp}', { eager: true, import: 'default' }) as Record<string, string>;

function getLocalImage(id: string, dishName: string): string {
  const assets = Object.keys(LOCAL_ASSETS);
  
  if (id && id !== 'undefined' && id !== 'null' && !id.includes('Image')) {
    let match = assets.find(a => a.includes(id));
    if (match) return LOCAL_ASSETS[match];
  }

  if (dishName) {
    const expected = dishName.toLowerCase().replace(/\\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    let match = assets.find(a => a.toLowerCase().includes(expected + '.'));
    if (match) return LOCAL_ASSETS[match];
    
    match = assets.find(a => {
      const file = a.split('/').pop()?.toLowerCase();
      return file && (file.includes(expected) || file.includes(dishName.toLowerCase().replace(/\\s+/g, '')));
    });
    if (match) return LOCAL_ASSETS[match];

    const hash = dishName.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const fallback = \`dish-\${(hash % 6) + 1}.jpg\`;
    match = assets.find(a => a.includes(fallback));
    if (match) return LOCAL_ASSETS[match];
  }

  const firstMatch = assets.find(a => a.includes('dish-1'));
  return firstMatch ? LOCAL_ASSETS[firstMatch] : '';
}`;

content = content.replace(
  /\/\/ Curated stable Unsplash photo IDs by cuisine[\s\S]*?(?=type Seed = {)/,
  funcReplacement + "\n\n",
);

// 3. Replace all img: ... in SEEDS
// We will match { name: "...", ... img: ... } and replace the img part.
// Since each object is on one line:
const lineRegex = /\{ name: "([^"]+)"(.*?)(?:img:\s*[^}]+)\s*\}/g;
content = content.replace(lineRegex, (match, name, middle) => {
  // extract ID if it used IMG("id")
  let id = "";
  const imgMatch = match.match(/IMG\("([^"]+)"\)/);
  if (imgMatch) {
    id = imgMatch[1];
  } else {
    // maybe it used a variable like crispycornImage
    const varMatch = match.match(/img:\s*(\w+Image)/);
    if (varMatch) id = varMatch[1];
  }
  return `{ name: "${name}"${middle}img: getLocalImage("${id}", "${name}") }`;
});

fs.writeFileSync("src/lib/data.ts", content, "utf8");
console.log("Done modifying data.ts");
