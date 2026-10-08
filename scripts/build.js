// Copies src/ to dist/ and stamps it with build metadata.
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const dist = path.join(root, 'dist');

fs.rmSync(dist, { recursive: true, force: true });
fs.cpSync(path.join(root, 'src'), dist, { recursive: true });

const BG_COLORS = ['white', 'black', 'green', 'red'];
const bgColor = process.env.BG_COLOR || 'white';
if (!BG_COLORS.includes(bgColor)) {
  throw new Error(`Invalid BG_COLOR "${bgColor}", expected one of: ${BG_COLORS.join(', ')}`);
}

const info = {
  version: require('../package.json').version,
  commit: process.env.GITHUB_SHA || 'local',
  builtAt: new Date().toISOString(),
  greetingName: process.env.GREETING_NAME || 'world',
  environment: process.env.APP_ENV || 'dev',
  showBuildInfo: process.env.SHOW_BUILD_INFO !== 'false',
  backgroundColor: bgColor,
};
fs.writeFileSync(path.join(dist, 'build-info.json'), JSON.stringify(info, null, 2));
console.log('Built dist/', info);
