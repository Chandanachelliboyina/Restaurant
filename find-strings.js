import fs from "fs";
import path from "path";

function walk(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      if (file !== "node_modules" && file !== ".git") {
        walk(path.join(dir, file), fileList);
      }
    } else if (file.endsWith(".ts") || file.endsWith(".tsx") || file.endsWith(".html")) {
      fileList.push(path.join(dir, file));
    }
  }
  return fileList;
}

const allFiles = walk(process.cwd());

for (const file of allFiles) {
  const content = fs.readFileSync(file, "utf8");
  // Match any string containing .jpg, .png, .avif, .webp
  const regex = /["'`][^"'`]+\.(jpg|png|avif|webp)["'`]/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    console.log(`[${path.relative(process.cwd(), file)}] ${match[0]}`);
  }
}
