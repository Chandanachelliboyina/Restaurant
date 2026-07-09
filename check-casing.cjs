const fs = require("fs");
const path = require("path");

const imagesContent = fs.readFileSync("src/lib/images.ts", "utf8");
const regex = /import .+ from "(@\/assets\/([^"]+))";/g;
let match;
let allExist = true;

const assetsDir = path.join(__dirname, "src", "assets");
const actualFiles = fs.readdirSync(assetsDir);

while ((match = regex.exec(imagesContent)) !== null) {
  const filepath = match[2];
  if (!actualFiles.includes(filepath)) {
    console.error("Missing or case-mismatched file:", filepath);
    const lowercaseMatch = actualFiles.find((f) => f.toLowerCase() === filepath.toLowerCase());
    if (lowercaseMatch) {
      console.error("  Found with different casing:", lowercaseMatch);
    }
    allExist = false;
  }
}

if (allExist) {
  console.log("All imported images exist with correct casing.");
}
