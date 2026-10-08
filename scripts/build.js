// Copies src/ to dist/ and stamps it with build metadata.
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const dist = path.join(root, 'dist');

fs.rmSync(dist, { recursive: true, force: true });
fs.cpSync(path.join(root, 'src'), dist, { recursive: true });

const info = {
  version: require('../package.json').version,
  commit: process.env.GITHUB_SHA || 'local',
  builtAt: new Date().toISOString(),
};
fs.writeFileSync(path.join(dist, 'build-info.json'), JSON.stringify(info, null, 2));
console.log('Built dist/', info);
