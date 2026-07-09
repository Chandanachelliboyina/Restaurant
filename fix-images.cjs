const fs = require("fs");

const dataContent = fs.readFileSync("src/lib/data.ts", "utf8");
const imagesContent = fs.readFileSync("src/lib/images.ts", "utf8");

// 1. Extract mapping from data.ts: "Dish Name" -> "123456-abc"
const dishToId = {};
const regexData = /getLocalImage\("([^"]+)",\s*"([^"]+)"\)/g;
let match;
while ((match = regexData.exec(dataContent)) !== null) {
  dishToId[match[2]] = match[1];
}

// 2. Extract mapping from images.ts imports: "123456-abc" -> "photo_123456"
const idToVar = {};
const regexImport = /import (\w+) from "@\/assets\/(?:premium_)?photo-([0-9a-fA-F-]+)\.avif";/g;
while ((match = regexImport.exec(imagesContent)) !== null) {
  idToVar[match[2]] = match[1];
}

// Also handle the specific ones like crispycornImage -> premium_photo-1680118540055...
const regexImport2 = /import (\w+) from "@\/assets\/([^"]+)\.(?:avif|jpg|webp)";/g;
const filenameToVar = {};
while ((match = regexImport2.exec(imagesContent)) !== null) {
  filenameToVar[match[2]] = match[1];
}

// 3. Rebuild the DISH_IMAGES object
let newMapLines = [];
newMapLines.push("export const DISH_IMAGES: Record<string, string> = {");

const dishNames = Object.keys(dishToId);
for (const dish of dishNames) {
  const id = dishToId[dish];
  let varName = "photo_1589302168068"; // default fallback

  if (id === "idlisambarImage") {
    // I already replaced this in data.ts maybe? Oh wait, it is "1632104667384-06f58cb7ad44" for Idli Sambar or we just use photo_1632104667384
    varName = "photo_1632104667384";
  } else if (idToVar[id]) {
    varName = idToVar[id];
  } else {
    // try to find by variable name if the id is actually a variable name like 'crispycornImage'
    const foundVar = Object.keys(filenameToVar).find((v) => filenameToVar[v] === id);
    if (foundVar) {
      varName = id;
    } else if (filenameToVar[id]) {
      varName = filenameToVar[id];
    } else {
      // Search if any filename includes the ID
      const partialMatch = Object.keys(filenameToVar).find((f) => f.includes(id));
      if (partialMatch) {
        varName = filenameToVar[partialMatch];
      }
    }
  }

  // Specific overrides because user messed up the ID in data.ts for Idli Sambar
  if (dish === "Idli Sambar") {
    varName = "photo_1632104667384";
  }

  newMapLines.push(`  "${dish}": ${varName},`);
}
newMapLines.push("};");

// 4. Replace DISH_IMAGES in images.ts
const newImagesContent = imagesContent.replace(
  /export const DISH_IMAGES: Record<string, string> = \{[\s\S]*?^};/m,
  newMapLines.join("\n"),
);

fs.writeFileSync("src/lib/images.ts", newImagesContent);
console.log("Rewrote images.ts DISH_IMAGES mapping.");
