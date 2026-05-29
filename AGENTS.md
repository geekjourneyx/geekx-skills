# Agent Instructions

## Scope

These instructions apply to the entire repository.

## Repository Rules

- Every skill directory under `skills/` must start with `geekx-`.
- Each skill directory must contain `SKILL.md`.
- The `name` field in each `SKILL.md` must match its directory name.
- Each skill must include evaluation prompts under `skills/<skill-name>/evals/evals.json`.
- Keep skill files focused. Add references or scripts only when they remove repeated work.
- Do not add runtime-specific wording unless the skill is explicitly runtime-specific.
- Do not add generic skill names such as `review`, `writer`, or `scope-review`.

## Skill Creation Rules

Use the `skill-creator` workflow for every new or modified skill:

1. Capture the skill intent, trigger conditions, expected output, and success criteria.
2. Write the smallest useful `SKILL.md`.
3. Add realistic eval prompts before considering the skill done.
4. Make eval expectations checkable where possible.
5. Keep the skill body concise; move heavy reference material into `references/`.
6. Update README `Available Skills` when adding or renaming a skill.

Do not merge a skill that lacks eval prompts.

## Darwin Review Rules

Use the `darwin-skill` review discipline before releases and after meaningful skill edits:

1. Run a runtime-neutrality scan.
2. Score the skill for frontmatter, workflow clarity, failure modes, checkpoints, specificity, resource integration, architecture, real-output risk, and anti-pattern coverage.
3. Fix P0 runtime drift before any other improvement.
4. Prefer one improvement dimension per edit.
5. Add explicit failure branches when the skill can be pulled off course.
6. Keep or revert based on validation, not taste.
7. Stop when the next edit only adds words without improving behavior.

## Documentation Rules

- Keep README and skill docs concise.
- Delete generic claims, filler, and self-commentary.
- Prefer executable commands and hard constraints over explanation.
- Keep version references consistent with `package.json`.
- Update `CHANGELOG.md` for every release.
- Keep release instructions in `AGENTS.md`; keep README focused on users.

## Release Process

Run this process every time before publishing:

1. Update `package.json` version.
2. Update `package-lock.json` with the same version.
3. Add a matching `## [x.y.z] - YYYY-MM-DD` entry to `CHANGELOG.md`.
4. Run `npm run check:release`.
5. Run `npm run pack:skills`.
6. Commit the release changes.
7. Tag the release: `git tag -a vx.y.z -m "vx.y.z"`.
8. Push the branch and tag: `git push origin <branch>` then `git push origin vx.y.z`.
9. Confirm the GitHub release workflow uploaded the zip artifact.

Do not tag a release if `npm run check:release` fails.

## Tooling Language Rule

- This is a skills repository, not a Node application. Node is used only for repository tooling.
- Use `.mjs` for release checks, JSON/frontmatter parsing, version validation, and packaging.
- Use shell only for thin command orchestration when no structured parsing is needed.
- Do not depend on system-only tools such as `zip` for the release artifact.
- Do not introduce TypeScript until the repository has a TypeScript build/test path.
