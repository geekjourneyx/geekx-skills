# 智能体指令

## 适用范围

这些指令适用于整个仓库。

## 仓库规则

- `skills/` 下的每个技能目录都必须以 `geekx-` 开头。
- 每个技能目录都必须包含 `SKILL.md`。
- 每个 `SKILL.md` 的 `name` 字段必须与目录名一致。
- 每个技能都必须包含 `skills/<skill-name>/evals/evals.json`。
- 技能文件必须聚焦。只有当 `references/` 或 `scripts/` 能减少重复工作时才添加。
- 除非技能本身明确绑定某个运行时，否则不要加入运行时专属措辞。
- 不要添加 `review`、`writer`、`scope-review` 这类泛名。

## 技能创建规则

每次新增或修改技能，都必须使用 `skill-creator` 工作流：

1. 明确技能意图、触发条件、预期输出和成功标准。
2. 写出最小可用的 `SKILL.md`。
3. 在认为技能完成前，添加真实可用的评测提示。
4. 尽量让评测预期可检查。
5. 保持技能正文简洁，把厚重材料移到 `references/`。
6. 新增、删除或改名技能时，同步更新 README 的「可用技能」表格。

缺少评测提示的技能不能合并。

## Darwin 审查规则

发布前，以及每次有实质性技能改动后，都必须使用 `darwin-skill` 审查纪律：

1. 执行运行时中立性扫描。
2. 从 frontmatter、工作流清晰度、失败分支、检查点、具体性、资源集成、架构、真实输出风险、反模式覆盖等维度评分。
3. 先修复 P0 级运行时漂移，再做其他优化。
4. 每次编辑优先只改进一个维度。
5. 当技能可能被拉偏时，添加明确失败分支。
6. 根据验证结果保留或回滚，不根据个人偏好判断。
7. 当下一次编辑只是在加字、没有改善行为时停止。

## 文档规则

- README 和技能文档必须简洁。
- 删除泛泛而谈的宣传、填充语和自我解释。
- 优先写可执行命令和硬约束，少写解释。
- 版本号以 `package.json` 为唯一来源。
- 每次发布都必须更新 `CHANGELOG.md`。
- 发布流程只放在 `AGENTS.md`，README 只面向使用者。

## 文档防漂移规则

- README 的「可用技能」表格必须与 `skills/` 目录一致。
- README 不要写死当前版本号、发布步骤、标签命令或内部审查流程。
- AGENTS 是维护者规则的唯一入口；不要把同一条发布规则复制到 README。
- `CHANGELOG.md` 只记录真实历史变更，不为了“当前命名”改写旧版本事实。
- 改名技能时，必须同时更新目录名、`SKILL.md` 的 `name`、`evals/evals.json` 的 `skill_name`、README 表格和变更日志。
- 每次文档或技能改动后，至少运行 `npm run check:release`。

## 发布流程

每次发布前都必须执行以下流程：

1. 更新 `package.json` 版本号。
2. 用同一个版本号更新 `package-lock.json`。
3. 在 `CHANGELOG.md` 添加匹配的 `## [x.y.z] - YYYY-MM-DD` 条目。
4. 运行 `npm run check:release`。
5. 运行 `npm run pack:skills`。
6. 提交发布改动。
7. 创建发布标签：`git tag -a vx.y.z -m "vx.y.z"`。
8. 推送分支和标签：先 `git push origin <branch>`，再 `git push origin vx.y.z`。
9. 确认 GitHub release workflow 已上传 zip 产物。

如果 `npm run check:release` 失败，不要创建发布标签。

## 工具语言规则

- 这是技能仓库，不是 Node 应用。Node 只用于仓库工具。
- 发布检查、JSON/frontmatter 解析、版本校验和打包使用 `.mjs`。
- 只有在不需要结构化解析时，才用 shell 做薄命令编排。
- 发布产物不要依赖 `zip` 这类系统专属工具。
- 仓库没有 TypeScript 构建/测试路径前，不要引入 TypeScript。
