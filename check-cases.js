import fs from "fs";
import path from "path";

const dataTs = fs.readFileSync("src/lib/data.ts", "utf8");
const assetsDir = fs.readdirSync("src/assets");

const importRegex = /import\s+\w+\s+from\s+"@\/assets\/([^"]+)"/g;
let match;
while ((match = importRegex.exec(dataTs)) !== null) {
  const filename = match[1];
  const exactMatch = assetsDir.includes(filename);
  const caseInsensitiveMatch = assetsDir.find((f) => f.toLowerCase() === filename.toLowerCase());

  if (exactMatch) {
    console.log(`OK: ${filename}`);
  } else if (caseInsensitiveMatch) {
    console.log(`CASE MISMATCH: imported "${filename}", but actual is "${caseInsensitiveMatch}"`);
  } else {
    console.log(`MISSING: ${filename}`);
  }
}
