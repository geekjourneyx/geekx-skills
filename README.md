<div align="center">

# GeekX Skills

**极客杰尼自用 AI Agent Skills 合集，把高频工作流沉淀成可复用的 Agent 能力。**

**Personal AI Agent skills by Geekjourneyx, turning repeated workflows into reusable agent capabilities.**

<img src="assets/banner.png" alt="GeekX Skills - AI Agent skills collection by Geekjourneyx" width="100%">

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Agent Skills](https://img.shields.io/badge/Agent-Skills-c96442.svg)](./README.md)
[![Multi Runtime](https://img.shields.io/badge/Multi_Runtime-ready-221b16.svg)](./README.md)

</div>

---

## 这是什么 / What This Is

GeekX Skills 是 [geekjourneyx](https://github.com/geekjourneyx) / 极客杰尼的 AI Agent skills 仓库，用来保存真实日常工作中反复使用的 Agent 工作流。

This repository stores reusable AI Agent skills extracted from real daily workflows.

```text
输入：反复手工执行的工作流
输出：可被兼容 Agent 调用的 skill

Input:  a repeated manual workflow
Output: a reusable skill for compatible agents
```

---

## 可用 Skills / Available Skills

| Skill | 用途 / Use when |
|:---|:---|
| `geekx-necessity-gatekeeper` | 审判需求、方案、架构、roadmap 或 Agent 输出是否过度设计；先证明必要性，再允许设计。 / Review requirements, plans, architecture, roadmap items, or agent outputs for overengineering before design begins. |

---

## 安装 / Installation

安装全部 skills：

```bash
npx skills add geekjourneyx/geekx-skills --all
```

查看可用 skills：

```bash
npx skills add geekjourneyx/geekx-skills --list
```

安装单个 skill：

```bash
npx skills add geekjourneyx/geekx-skills --skill geekx-<name>
```

---

## 使用示例 / Usage

```text
使用 geekx-necessity-gatekeeper 审查这个方案是否过度设计。
```

```text
Use geekx-necessity-gatekeeper to find the smallest necessary upgrade.
```

---

## 命名规则 / Naming Rule

所有 skill 都必须使用 `geekx-` 前缀。

All skills in this repository must use the `geekx-` prefix.

```text
skills/geekx-<name>/SKILL.md
```

不要添加 `review`、`writer`、`scope-review` 这类泛名；使用 `geekx-review`、`geekx-writer`、`geekx-scope-review`。

Do not add generic skill names such as `review`, `writer`, or `scope-review`.

---

## 仓库结构 / Repository Structure

```text
geekx-skills/
  skills/
    geekx-<name>/
      SKILL.md
      evals/evals.json
      scripts/
      references/
  assets/
  scripts/
```

---

## 维护规则 / Maintenance

- 新增或修改 skill 必须同步添加 eval prompts。
- 发布前必须执行 `npm run check:release`。
- 发布包由 `npm run pack:skills` 生成。
- 版本从 `1.0.0` 开始，tag 必须与 `package.json` 一致。

---

## 作者 / Author

| | |
|:---|:---|
| 个人主页 / Homepage | [jieni.ai](https://jieni.ai) |
| GitHub | [geekjourneyx](https://github.com/geekjourneyx) |
| X / Twitter | [@seekjourney](https://x.com/seekjourney) |
| 公众号 / WeChat | 搜索「极客杰尼」 |

---

## License

[MIT](./LICENSE)
