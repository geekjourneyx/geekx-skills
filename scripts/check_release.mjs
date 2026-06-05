import { readFile, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const fail = [];

async function readJson(file) {
  return JSON.parse(await readFile(path.join(root, file), 'utf8'));
}

async function readText(file) {
  return readFile(path.join(root, file), 'utf8');
}

function error(message) {
  fail.push(message);
}

const pkg = await readJson('package.json');
const lock = await readJson('package-lock.json');
const changelog = await readText('CHANGELOG.md');
const readme = await readText('README.md');
const agents = await readText('AGENTS.md');

if (!pkg.version) error('package.json missing version');
if (lock.version !== pkg.version) {
  error(`package-lock.json version ${lock.version} does not match package.json ${pkg.version}`);
}
if (lock.packages?.['']?.version !== pkg.version) {
  error(`package-lock root package version ${lock.packages?.['']?.version} does not match package.json ${pkg.version}`);
}
if (!changelog.includes(`## [${pkg.version}] - `)) {
  error(`CHANGELOG.md missing entry for ${pkg.version}`);
}

const tagName = process.env.GITHUB_REF_NAME
  ?? (process.env.GITHUB_REF?.startsWith('refs/tags/') ? process.env.GITHUB_REF.slice('refs/tags/'.length) : undefined);
if (tagName && tagName !== `v${pkg.version}`) {
  error(`git tag ${tagName} does not match package version v${pkg.version}`);
}

const runtimeRedFlags = [
  /在 Claude Code/,
  /Claude Code skill/,
  /Claude Code 用户/,
  /Cursor only/,
  /Codex 中/,
  /^\[!\[Claude Code/m,
  /~\/\.claude\/skills\/[a-z]/,
  /\/plugin install\b/,
  /Claude_Code-ready/,
];

for (const [file, text] of [
  ['README.md', readme],
  ['CHANGELOG.md', changelog],
  ['AGENTS.md', agents],
]) {
  for (const pattern of runtimeRedFlags) {
    if (pattern.test(text)) error(`${file} contains runtime-specific red flag: ${pattern}`);
  }
}

const readmeMaintenanceRedFlags = [
  /npm run check:release/,
  /npm run pack:skills/,
  /git tag\b/,
  /git push origin/,
  /GitHub release workflow/,
];

for (const pattern of readmeMaintenanceRedFlags) {
  if (pattern.test(readme)) error(`README.md contains maintenance-only instruction: ${pattern}`);
}

if (!existsSync(path.join(root, 'skills'))) error('skills/ directory is missing');

const skillDirs = existsSync(path.join(root, 'skills'))
  ? (await readdir(path.join(root, 'skills'))).sort()
  : [];

for (const dir of skillDirs) {
  const full = path.join(root, 'skills', dir);
  if (!(await stat(full)).isDirectory()) continue;
  if (!dir.startsWith('geekx-')) error(`skill directory must start with geekx-: ${dir}`);

  const skillFile = path.join(full, 'SKILL.md');
  if (!existsSync(skillFile)) {
    error(`${dir} missing SKILL.md`);
    continue;
  }

  const skill = await readFile(skillFile, 'utf8');
  const frontmatter = skill.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatter) {
    error(`${dir}/SKILL.md missing YAML frontmatter`);
    continue;
  }

  const name = frontmatter[1].match(/^name:\s*(.+)$/m)?.[1]?.trim();
  const description = frontmatter[1].match(/^description:\s*(.+)$/m)?.[1]?.trim();
  if (name !== dir) error(`${dir}/SKILL.md name must match directory name`);
  if (!description) error(`${dir}/SKILL.md missing description`);
  if ((frontmatter[1].length ?? 0) > 1024) error(`${dir}/SKILL.md frontmatter exceeds 1024 characters`);

  const evalsFile = path.join(full, 'evals', 'evals.json');
  if (!existsSync(evalsFile)) {
    error(`${dir} missing evals/evals.json`);
  } else {
    try {
      const evals = JSON.parse(await readFile(evalsFile, 'utf8'));
      if (evals.skill_name !== dir) error(`${dir}/evals/evals.json skill_name must match directory name`);
      if (!Array.isArray(evals.evals) || evals.evals.length < 2) {
        error(`${dir}/evals/evals.json must contain at least 2 eval prompts`);
      }
    } catch (err) {
      error(`${dir}/evals/evals.json is invalid JSON: ${err.message}`);
    }
  }
}

if (!/^## .*可用技能/m.test(readme)) error('README.md missing 可用技能 section');
if (!/^## .*文档防漂移规则/m.test(agents)) error('AGENTS.md missing 文档防漂移规则 section');
if (!/^## .*发布流程/m.test(agents)) error('AGENTS.md missing 发布流程 section');
for (const dir of skillDirs) {
  if (dir.startsWith('geekx-') && !readme.includes(`\`${dir}\``)) {
    error(`README.md does not list ${dir}`);
  }
}

if (!existsSync(path.join(root, '.github/workflows/release.yml'))) {
  error('.github/workflows/release.yml is missing');
}

if (fail.length) {
  console.error('Release check failed:');
  for (const item of fail) console.error(`- ${item}`);
  process.exit(1);
}

console.log(`Release check passed for v${pkg.version}`);
