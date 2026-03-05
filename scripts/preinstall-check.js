#!/usr/bin/env node

const { execSync } = require('node:child_process');

function getRegistry() {
  const fromEnv = process.env.npm_config_registry || process.env.NPM_CONFIG_REGISTRY;
  if (fromEnv && String(fromEnv).trim()) return String(fromEnv).trim();

  try {
    return execSync('npm config get registry', { stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim();
  } catch {
    return '';
  }
}

const registry = getRegistry();
console.log(`[preinstall] npm registry = ${registry || '(empty)'}`);

if (!registry) {
  console.warn('[preinstall] Warning: registry is empty. Suggested fix: npm config set registry https://registry.npmjs.org/');
  process.exit(0);
}

if (!/^https?:\/\//i.test(registry)) {
  console.warn('[preinstall] Warning: registry is not a valid http(s) URL.');
  console.warn('[preinstall] Fix: npm config set registry https://registry.npmjs.org/');
  process.exit(0);
}

const suspicious = [
  'verdaccio',
  'artifactory',
  'nexus',
  'pkg.',
  'registry.local',
  'localhost',
  '127.0.0.1',
  'corp',
  'internal'
];

const lower = registry.toLowerCase();
const isOfficial = lower.includes('registry.npmjs.org') || lower.includes('registry.npmmirror.com');
const maybePrivate = suspicious.some((kw) => lower.includes(kw));

if (!isOfficial && maybePrivate) {
  console.error('[preinstall] Error hint: current registry looks like a private/internal registry and may cause 403.');
  console.warn('[preinstall] Quick fix (PowerShell): npm config set registry https://registry.npmjs.org/');
  console.warn('[preinstall] Mirror fallback:      npm config set registry https://registry.npmmirror.com/');
  console.warn('[preinstall] Also check and temporarily rename user/project .npmrc containing private @scope, _authToken, or proxy settings.');
}
