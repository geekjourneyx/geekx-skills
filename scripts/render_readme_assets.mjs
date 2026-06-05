import { mkdir, writeFile, rm } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const outDir = new URL('../assets/', import.meta.url);
const tmpDir = new URL('../.tmp-readme-assets/', import.meta.url);
const run = promisify(execFile);

const palette = {
  bg: '#050505',
  panel: 'rgba(18, 18, 17, 0.84)',
  panelStrong: 'rgba(30, 28, 23, 0.92)',
  ink: '#f7f3ea',
  muted: '#a9a29a',
  line: 'rgba(222, 186, 98, 0.28)',
  gold: '#d8ae55',
  goldSoft: '#8e6d2f',
};

const baseStyle = `
  * { box-sizing: border-box; }
  html, body { margin: 0; width: 1920px; height: 1080px; }
  body {
    background:
      radial-gradient(circle at 74% 22%, rgba(216, 174, 85, 0.16), transparent 27%),
      radial-gradient(circle at 18% 84%, rgba(142, 109, 47, 0.16), transparent 28%),
      linear-gradient(145deg, #050505 0%, #0b0a09 46%, #050505 100%);
    color: ${palette.ink};
    font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", "Microsoft YaHei", sans-serif;
    overflow: hidden;
  }
  body::before {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    opacity: 0.16;
    background-image:
      linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px);
    background-size: 44px 44px;
  }
  body::after {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(circle at 50% 50%, transparent 46%, rgba(0,0,0,0.54) 100%);
  }
  .frame {
    position: relative;
    z-index: 1;
    width: 1920px;
    height: 1080px;
    padding: 92px 108px;
  }
  .kicker {
    color: ${palette.gold};
    font-size: 30px;
    line-height: 1;
    font-weight: 800;
    letter-spacing: 0;
  }
  h1, h2, h3, p { margin: 0; letter-spacing: 0; }
  .rule {
    width: 128px;
    height: 5px;
    margin-top: 30px;
    background: linear-gradient(90deg, ${palette.gold}, transparent);
  }
  .card {
    border: 1px solid ${palette.line};
    background: ${palette.panel};
    box-shadow: 0 24px 120px rgba(0, 0, 0, 0.46);
    backdrop-filter: blur(18px);
  }
  .num {
    color: ${palette.gold};
    font-size: 30px;
    line-height: 1;
    font-weight: 900;
  }
`;

function page(body, extraStyle = '') {
  return `<!doctype html>
<html lang="zh-CN">
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
    <section class="copy">
      <div class="kicker">Skills 合集 for Agents</div>
      <h1>GeekX Skills</h1>
      <p class="tagline">给 Agent 使用的 Skills 合集</p>
      <div class="rule"></div>
      <div class="chips">
        <span>必要性闸门</span>
        <span>承诺闸门</span>
        <span>反过度设计</span>
      </div>
    </section>
    <section class="gate" aria-hidden="true">
      <div class="halo"></div>
      <div class="pillar left"></div>
      <div class="pillar right"></div>
      <div class="threshold"></div>
      <div class="beam"></div>
    </section>
  </main>
`, `
  .banner {
    display: grid;
    grid-template-columns: 0.96fr 1.04fr;
    align-items: center;
    gap: 84px;
  }
  .copy { transform: translateY(-8px); }
  h1 {
    margin-top: 34px;
    font-size: 134px;
    line-height: 0.94;
    font-weight: 880;
  }
  .tagline {
    margin-top: 34px;
    max-width: 700px;
    color: ${palette.muted};
    font-size: 44px;
    line-height: 1.28;
    font-weight: 650;
  }
  .chips {
    margin-top: 58px;
    display: flex;
    flex-wrap: wrap;
    gap: 18px;
  }
  .chips span {
    border: 1px solid ${palette.line};
    background: rgba(216, 174, 85, 0.08);
    color: ${palette.ink};
    padding: 18px 24px;
    font-size: 27px;
    line-height: 1;
    font-weight: 760;
  }
  .gate {
    position: relative;
    height: 760px;
  }
  .halo {
    position: absolute;
    inset: 64px 92px 92px;
    border: 1px solid rgba(216, 174, 85, 0.26);
    box-shadow: inset 0 0 120px rgba(216, 174, 85, 0.08), 0 0 160px rgba(216, 174, 85, 0.12);
  }
  .pillar {
    position: absolute;
    top: 92px;
    width: 118px;
    height: 560px;
    background: linear-gradient(180deg, rgba(235,217,171,0.82), rgba(102,78,36,0.24));
    border: 1px solid rgba(250, 226, 166, 0.36);
    box-shadow: 0 0 70px rgba(216, 174, 85, 0.22);
  }
  .pillar.left { left: 238px; }
  .pillar.right { right: 238px; }
  .threshold {
    position: absolute;
    left: 140px;
    right: 140px;
    bottom: 116px;
    height: 56px;
    background: linear-gradient(90deg, transparent, rgba(216,174,85,0.76), transparent);
    filter: blur(0.2px);
  }
  .beam {
    position: absolute;
    left: 50%;
    top: 126px;
    width: 250px;
    height: 526px;
    transform: translateX(-50%);
    background: linear-gradient(180deg, rgba(250,226,166,0.24), rgba(216,174,85,0.04));
    clip-path: polygon(26% 0, 74% 0, 100% 100%, 0 100%);
  }
`);

const features = page(`
  <main class="frame features">
    <header>
      <div class="kicker">一个 Skill，先做审判，再谈方案</div>
      <h2>让 Agent 先判断：该不该做。</h2>
      <div class="rule"></div>
    </header>
    <section class="grid">
      <article class="card feature strong">
        <span class="num">01</span>
        <h3>必要性门禁</h3>
        <p>没有真实痛点、重复失败和不做后果，就不进入方案设计。</p>
      </article>
      <article class="card feature">
        <span class="num">02</span>
        <h3>噪音检测</h3>
        <p>砍掉未来假设、镀金、顺手添加和平台化冲动。</p>
      </article>
      <article class="card feature">
        <span class="num">03</span>
        <h3>复杂度税</h3>
        <p>把维护、测试、迁移、支持和认知成本提前算清楚。</p>
      </article>
      <article class="card feature">
        <span class="num">04</span>
        <h3>承诺闸门</h3>
        <p>用 STOP、HOLD、PROBE 控制重写、框架和工作流引擎。</p>
      </article>
    </section>
  </main>
`, `
  .features header { max-width: 1320px; }
  h2 {
    margin-top: 30px;
    font-size: 82px;
    line-height: 1.08;
    font-weight: 860;
  }
  .grid {
    margin-top: 70px;
    display: grid;
    grid-template-columns: 1.08fr 0.92fr;
    gap: 24px;
  }
  .feature {
    min-height: 240px;
    padding: 34px 38px;
  }
  .feature.strong {
    background: ${palette.panelStrong};
    border-color: rgba(216, 174, 85, 0.48);
  }
  .feature h3 {
    margin-top: 24px;
    font-size: 46px;
    line-height: 1.1;
    font-weight: 860;
  }
  .feature p {
    margin-top: 20px;
    color: ${palette.muted};
    font-size: 30px;
    line-height: 1.34;
    font-weight: 560;
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

async function convertWebp(name) {
  const pngPath = new URL(`${name}.png`, outDir);
  const webpPath = new URL(`${name}.webp`, outDir);
  await run('convert', [
    fileURLToPath(pngPath),
    '-strip',
    '-quality',
    '82',
    fileURLToPath(webpPath),
  ]);
  await rm(pngPath, { force: true });
}

await mkdir(outDir, { recursive: true });
await mkdir(tmpDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
try {
  await screenshot(browser, 'banner', banner);
  await screenshot(browser, 'features', features);
} finally {
  await browser.close();
  await rm(tmpDir, { recursive: true, force: true });
}

await convertWebp('banner');
await convertWebp('features');
