import fs from "fs";
import path from "path";

const dataTs = fs.readFileSync("src/lib/data.ts", "utf8");
const assetsDir = fs.readdirSync("src/assets");
const publicAssetsDir = fs.existsSync("public/assets") ? fs.readdirSync("public/assets") : [];

const imgRegex = /IMG\("([^"]+)"\)/g;
let match;
const missing = [];
const found = [];

while ((match = imgRegex.exec(dataTs)) !== null) {
  const id = match[1];
  const matchingAsset = assetsDir.find((f) => f.includes(id));
  if (matchingAsset) {
    found.push({ id, file: matchingAsset });
  } else {
    missing.push(id);
  }
}

console.log(`Found: ${found.length}`);
console.log(`Missing: ${missing.length}`);
if (missing.length > 0) {
  console.log("Missing IDs:", missing);
}
