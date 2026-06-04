<div align="center">

# GeekX 技能集

**极客杰尼 Agent Skills 合集，把高频工作流沉淀成可复用能力。**

<img src="assets/banner.png" alt="GeekX 技能集横幅" width="100%">

</div>

---

## 这是什么

GeekX 技能集是 [geekjourneyx](https://github.com/geekjourneyx) / 极客杰尼的 Agent Skills 合集，用来保存真实日常工作中反复使用的工作流。

<img src="assets/features.png" alt="核心能力：必要性、范围、证据和裁决" width="100%">

---

## 可用技能

| 技能 | 什么时候用 |
|:---|:---|
| `geekx-gate` | 不知道用哪个时先用它。适合判断一件事该不该做、是不是过度设计、证据够不够、下一步是什么。 |
| `geekx-scope-gate` | 只想砍范围时用。适合判断需求、功能、路线图或智能体输出是否太大、噪音太多、应该先砍什么。 |
| `geekx-commitment-gate` | 只想检查技术决定时用。适合判断重写、框架、插件系统、工作流引擎、多智能体架构这类难撤回决定该不该做。 |

---

## 怎么选择

一句话规则：拿不准就用 `geekx-gate`。

- 想问“这事该不该做”：用 `geekx-gate`。
- 想问“这个方案是不是太大、噪音太多”：用 `geekx-scope-gate`。
- 想问“这个技术决定以后会不会很难撤回”：用 `geekx-commitment-gate`。

`geekx-gate` 会先判断问题类型，再只运行必要的闸门。

```text
第一步：先看范围
这件事该不该存在？

第二步：再看技术决定
如果这件事该存在，这个技术决定现在该不该下手？
```

### 范围闸门

适合这些问题：

- 这个功能现在真的要做吗？
- 最小可行产品范围是不是太大？
- 智能体给我的方案是不是加了太多东西？
- 路线图是不是在幻想未来需求？
- 应该保留、砍掉、延期、先验证，还是缩小范围？

它输出一个直接裁决：`保留 / 砍掉 / 延期 / 先验证 / 缩小范围`。

### 承诺闸门

适合这些问题：

- 要不要上微服务？
- 要不要用领域驱动设计、整洁架构、事件溯源？
- 要不要加插件系统、工作流引擎、多智能体架构？
- 要不要重写核心模块？
- 这个技术选择以后会不会很难撤回？

这里的“承诺”指做了以后很难撤回的技术决定。

它不帮你选架构。它只输出：`停止 / 暂停 / 探针`。

- `停止`：现在不要做这个技术决定。
- `暂停`：证据不够，只补现实信息。
- `探针`：只跑一个可撤回的小实验，不锁死架构。

### 硬规则

```text
范围没通过，不能继续讨论技术决定。
没有难撤回的技术决定，就跳过承诺闸门。
最终只给一个下一步。
```

---

## 安装

安装全部技能：

```bash
npx skills add geekjourneyx/geekx-skills --all
```

查看可用技能：

```bash
npx skills add geekjourneyx/geekx-skills --list
```

安装单个技能：

```bash
npx skills add geekjourneyx/geekx-skills --skill geekx-<name>
```

---

## 使用示例

```text
使用 geekx-gate 审查这个智能体方案是不是过度设计。
```

```text
使用 geekx-gate 判断这个最小可行产品范围是不是太大。
```

```text
使用 geekx-gate 判断现在要不要引入插件系统。
```

```text
使用 geekx-gate 判断这次重写是否有足够证据。
```

---

## 命名规则

所有技能都必须使用 `geekx-` 前缀。

```text
skills/geekx-<name>/SKILL.md
```

不要添加 `review`、`writer`、`scope-review` 这类泛名。

---

## 仓库结构

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

## 维护规则

- 新增或修改技能必须同步添加评测提示。
- 发布前必须执行 `npm run check:release`。
- 发布包由 `npm run pack:skills` 生成。
- 版本号写在 `package.json`，发布标签必须与版本一致。

---

## 作者

| | |
|:---|:---|
| 个人主页 | [jieni.ai](https://jieni.ai) |
| GitHub | [geekjourneyx](https://github.com/geekjourneyx) |
| X | [@seekjourney](https://x.com/seekjourney) |
| 公众号 | 搜索「极客杰尼」 |

---

## 许可证

[MIT](./LICENSE)
