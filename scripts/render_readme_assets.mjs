import { mkdir, writeFile, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const outDir = new URL('../assets/', import.meta.url);
const tmpDir = new URL('../.tmp-readme-assets/', import.meta.url);

const tokens = {
  project: 'GeekX 技能集',
  tagline: '把高频工作流沉淀成可复用的智能体能力',
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
    <section>
      <div class="kicker">智能体技能合集</div>
      <h1>${tokens.project}</h1>
      <p class="subtitle">${tokens.tagline}</p>
      <div class="meta">
        <span>by geekjourneyx / 极客杰尼</span>
        <span>jieni.ai</span>
        <span>2026</span>
      </div>
    </section>
    <aside class="stack">
      <div class="tech card"><span class="num">01</span><strong>必要性</strong><p>先证明这件事现在该做，再进入设计。</p></div>
      <div class="tech card"><span class="num">02</span><strong>承诺闸门</strong><p>拦住过早重写、框架选择和难撤回技术决定。</p></div>
      <div class="tech card"><span class="num">03</span><strong>受限法庭</strong><p>用多线程证据收集审判高风险范围决策。</p></div>
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
    <div class="kicker">核心能力</div>
    <h2>把重复工作变成智能体可执行的流程。</h2>
    <section class="grid">
      <div class="feature card"><span class="num">01</span><h3>必要性门禁</h3><p>没有真实痛点和不做后果，就不进入方案设计。</p></div>
      <div class="feature card"><span class="num">02</span><h3>噪音检测</h3><p>识别未来假设、镀金、顺手添加和平台化冲动。</p></div>
      <div class="feature card"><span class="num">03</span><h3>单一职责</h3><p>防止需求、模块和流程变成万能工具箱。</p></div>
      <div class="feature card"><span class="num">04</span><h3>复杂度税</h3><p>把维护、测试、迁移、支持和认知成本算清楚。</p></div>
      <div class="feature card"><span class="num">05</span><h3>承诺闸门</h3><p>用 STOP、HOLD、PROBE 控制难撤回技术决定。</p></div>
      <div class="feature card"><span class="num">06</span><h3>最终指令</h3><p>输出一个裁决和一个下一步，不输出大而全方案。</p></div>
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
    <div class="kicker">工作流</div>
    <h2>从想法到裁决，只保留最小必要动作。</h2>
    <section class="flow">
      <div class="stage card"><span>步骤 01</span><h3>确认问题</h3><p>先说清现在到底解决什么。</p></div>
      <div class="line"></div>
      <div class="stage card"><span>步骤 02</span><h3>砍掉噪音</h3><p>删除未来假设、镀金和无证据范围。</p></div>
      <div class="line"></div>
      <div class="stage card"><span>步骤 03</span><h3>计算成本</h3><p>列出长期复杂度税和维护责任。</p></div>
      <div class="line"></div>
      <div class="stage card"><span>步骤 04</span><h3>检查承诺</h3><p>判断是否存在难撤回技术决定。</p></div>
      <div class="line"></div>
      <div class="stage card"><span>步骤 05</span><h3>给出裁决</h3><p>只给一个最终指令和停止条件。</p></div>
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
