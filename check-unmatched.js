import fs from "fs";
import path from "path";

const assetsDir = fs.readdirSync("src/assets");
const publicAssetsDir = fs.existsSync("public/assets") ? fs.readdirSync("public/assets") : [];

console.log("src/assets files:", assetsDir.length);
console.log("public/assets files:", publicAssetsDir.length);

const dataTs = fs.readFileSync("src/lib/data.ts", "utf8");

const imgRegex = /IMG\("([^"]+)"\)/g;
let match;
let notFound = 0;

while ((match = imgRegex.exec(dataTs)) !== null) {
  const id = match[1];
  const matchingAsset = assetsDir.find((f) => f.includes(id));
  if (!matchingAsset) {
    notFound++;
    console.log(`Unmatched ID in data.ts: ${id}`);
  }
}

console.log("Unmatched in data.ts:", notFound);
