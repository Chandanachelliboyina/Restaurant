import fs from 'fs';
import path from 'path';

const wranglerPath = path.resolve('.output/server/wrangler.json');
const deployConfigPath = path.resolve('.wrangler/deploy/config.json');

// Normalize wrangler.json
if (fs.existsSync(wranglerPath)) {
  try {
    const data = fs.readFileSync(wranglerPath, 'utf8');
    const json = JSON.parse(data);
    if (json.assets && json.assets.directory) {
      // Replace Windows backslashes with forward slashes
      const prevDir = json.assets.directory;
      json.assets.directory = json.assets.directory.replace(/\\/g, '/');
      console.log(`[normalize-paths] Normalized wrangler.json assets directory: "${prevDir}" -> "${json.assets.directory}"`);
    }
    fs.writeFileSync(wranglerPath, JSON.stringify(json, null, 2), 'utf8');
  } catch (err) {
    console.error('[normalize-paths] Error processing wrangler.json:', err);
  }
} else {
  console.log('[normalize-paths] wrangler.json not found, skipping...');
}

// Normalize .wrangler/deploy/config.json
if (fs.existsSync(deployConfigPath)) {
  try {
    const data = fs.readFileSync(deployConfigPath, 'utf8');
    const json = JSON.parse(data);
    if (json.configPath) {
      const prevConfigPath = json.configPath;
      json.configPath = json.configPath.replace(/\\/g, '/');
      console.log(`[normalize-paths] Normalized deploy configPath: "${prevConfigPath}" -> "${json.configPath}"`);
    }
    fs.writeFileSync(deployConfigPath, JSON.stringify(json, null, 2), 'utf8');
  } catch (err) {
    console.error('[normalize-paths] Error processing deploy config.json:', err);
  }
} else {
  console.log('[normalize-paths] deploy config.json not found, skipping...');
}
