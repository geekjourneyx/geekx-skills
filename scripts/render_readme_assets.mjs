import { mkdir, writeFile, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const outDir = new URL('../assets/', import.meta.url);
const tmpDir = new URL('../.tmp-readme-assets/', import.meta.url);

const tokens = {
  project: 'GeekX Skills',
  tagline: 'Daily AI Agent skills for Codex, Claude Code, OpenClaw, and automation workflows',
  primary: '#c96442',
  amber: '#d8942f',
  bg: '#fbf6ee',
  panel: '#fffaf2',
  ink: '#221b16',
  muted: '#6f6257',
  line: '#ead8c7',
};

const baseStyle = `
  * { box-sizing: border-box; }
  html, body { margin: 0; width: 1920px; height: 1080px; }
  body {
    background:
      radial-gradient(circle at 85% 18%, rgba(201, 100, 66, 0.13), transparent 28%),
      linear-gradient(135deg, ${tokens.bg} 0%, #fffaf2 52%, #f4e6d4 100%);
    color: ${tokens.ink};
    font-family: ui-serif, Georgia, "Times New Roman", "Noto Serif SC", serif;
    overflow: hidden;
  }
  .frame {
    width: 1920px;
    height: 1080px;
    padding: 86px 96px;
    position: relative;
  }
  .kicker {
    color: ${tokens.primary};
    font: 700 29px/1.2 ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    letter-spacing: 0;
    text-transform: uppercase;
  }
  h1, h2 {
    margin: 18px 0 0;
    letter-spacing: 0;
    font-weight: 760;
  }
  h1 { font-size: 118px; line-height: 1.02; max-width: 1050px; }
  h2 { font-size: 82px; line-height: 1.05; max-width: 1040px; }
  .subtitle {
    margin-top: 30px;
    max-width: 960px;
    color: ${tokens.muted};
    font: 34px/1.45 ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", sans-serif;
  }
  .card {
    background: rgba(255, 250, 242, 0.82);
    border: 2px solid ${tokens.line};
    box-shadow: 0 24px 70px rgba(87, 55, 32, 0.11);
  }
  .num {
    color: ${tokens.primary};
    font: 800 30px/1 ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }
`;

function page(body, extraStyle = '') {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=1920,height=1080,initial-scale=1">
<style>${baseStyle}${extraStyle}</style>
</head>
<body>${body}</body>
</html>`;
}

const banner = page(`
  <main class="frame banner">
    <section>
      <div class="kicker">AI Agent Skills Collection</div>
      <h1>${tokens.project}</h1>
      <p class="subtitle">${tokens.tagline}</p>
      <div class="meta">
        <span>by geekjourneyx / 极客杰尼</span>
        <span>jieni.ai</span>
        <span>2026</span>
      </div>
    </section>
    <aside class="stack">
      <div class="tech card"><span class="num">01</span><strong>Codex</strong><p>Reusable agent workflows for coding and automation</p></div>
      <div class="tech card"><span class="num">02</span><strong>Claude Code</strong><p>Skill folders with clear triggers, scripts, and usage rules</p></div>
      <div class="tech card"><span class="num">03</span><strong>OpenClaw</strong><p>Portable skills for daily creator and developer operations</p></div>
    </aside>
  </main>
`, `
  .banner { display: grid; grid-template-columns: 1fr 610px; gap: 82px; align-items: center; }
  .meta {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-top: 58px;
    font: 700 25px/1.1 ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    color: ${tokens.ink};
  }
  .meta span {
    border: 2px solid ${tokens.line};
    background: rgba(255, 250, 242, 0.72);
    padding: 18px 24px;
  }
  .stack { display: grid; gap: 24px; }
  .tech { padding: 36px 38px; border-radius: 28px; }
  .tech strong {
    display: block;
    margin-top: 18px;
    font: 760 39px/1.1 ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }
  .tech p {
    margin: 14px 0 0;
    color: ${tokens.muted};
    font: 27px/1.38 ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }
`);

const features = page(`
  <main class="frame">
    <div class="kicker">Core Features</div>
    <h2>Skills that turn repeated work into agent-native routines.</h2>
    <section class="grid">
      <div class="feature card"><span class="num">01</span><h3>Curated Daily Skills</h3><p>A practical collection of skills actually used in coding, writing, publishing, and operations.</p></div>
      <div class="feature card"><span class="num">02</span><h3>Agent-Ready Format</h3><p>Each skill is packaged with clear triggers, instructions, scripts, and reusable context.</p></div>
      <div class="feature card"><span class="num">03</span><h3>Cross-Agent Workflow</h3><p>Designed for Codex, Claude Code, OpenClaw, and other skill-compatible agent tools.</p></div>
      <div class="feature card"><span class="num">04</span><h3>Creator Automation</h3><p>Reusable workflows for content research, drafting, design cards, publishing, and review gates.</p></div>
      <div class="feature card"><span class="num">05</span><h3>Developer Utilities</h3><p>Engineering workflows for reviews, debugging, release checks, README generation, and project hygiene.</p></div>
      <div class="feature card"><span class="num">06</span><h3>Personal Knowledge Loop</h3><p>Skills that encode how Geek Jieni works, making tacit process visible and reusable.</p></div>
    </section>
  </main>
`, `
  h2 { max-width: 1260px; font-size: 72px; }
  .grid {
    margin-top: 58px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
  .feature { min-height: 250px; padding: 30px 32px; border-radius: 24px; }
  .feature h3 {
    margin: 20px 0 0;
    font: 760 35px/1.12 ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    letter-spacing: 0;
  }
  .feature p {
    margin: 16px 0 0;
    color: ${tokens.muted};
    font: 25px/1.34 ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }
`);

const workflow = page(`
  <main class="frame">
    <div class="kicker">Workflow</div>
    <h2>From repeated task to reusable skill.</h2>
    <section class="flow">
      <div class="stage card"><span>STEP 01</span><h3>Capture</h3><p>Find a repeated workflow worth encoding.</p></div>
      <div class="line"></div>
      <div class="stage card"><span>STEP 02</span><h3>Package</h3><p>Write triggers, rules, scripts, and examples.</p></div>
      <div class="line"></div>
      <div class="stage card"><span>STEP 03</span><h3>Install</h3><p>Add skills to Codex, Claude Code, or OpenClaw.</p></div>
      <div class="line"></div>
      <div class="stage card"><span>STEP 04</span><h3>Run</h3><p>Let agents execute the workflow in real projects.</p></div>
      <div class="line"></div>
      <div class="stage card"><span>STEP 05</span><h3>Improve</h3><p>Refine the skill when real usage exposes gaps.</p></div>
    </section>
  </main>
`, `
  h2 { font-size: 86px; }
  .flow {
    margin-top: 82px;
    display: grid;
    grid-template-columns: 1fr 54px 1fr 54px 1fr 54px 1fr 54px 1fr;
    align-items: stretch;
  }
  .stage {
    min-height: 410px;
    padding: 36px 28px;
    border-radius: 26px;
  }
  .stage span {
    color: ${tokens.primary};
    font: 800 25px/1 ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }
  .stage h3 {
    margin: 38px 0 0;
    font: 760 43px/1.06 ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }
  .stage p {
    margin: 22px 0 0;
    color: ${tokens.muted};
    font: 27px/1.36 ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }
  .line {
    align-self: center;
    height: 3px;
    background: linear-gradient(90deg, ${tokens.primary}, ${tokens.amber});
  }
`);

async function screenshot(browser, name, html) {
  const htmlPath = new URL(`${name}.html`, tmpDir);
  const pngPath = new URL(`${name}.png`, outDir);
  await writeFile(htmlPath, html, 'utf8');
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  await page.goto(htmlPath.href, { waitUntil: 'networkidle' });
  await page.screenshot({ path: fileURLToPath(pngPath), fullPage: false });
  await page.close();
}

await mkdir(outDir, { recursive: true });
await mkdir(tmpDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
try {
  await screenshot(browser, 'banner', banner);
  await screenshot(browser, 'features', features);
  await screenshot(browser, 'workflow', workflow);
} finally {
  await browser.close();
  await rm(tmpDir, { recursive: true, force: true });
}
