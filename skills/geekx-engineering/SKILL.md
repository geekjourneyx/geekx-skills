---
name: geekx-engineering
description: Implement and evolve software in a real codebase. Use when the user wants a feature built, a substantial bug fixed, code refactored or restructured, a migration completed, or a spec or issue carried through implementation.
---

# Engineering

Take meaningful software changes through to a working, verified result.

Understand the relevant system, preserve task continuity, and adapt as reality changes. Choose the engineering approach yourself.

## Understand the system

Before consequential changes, understand enough of the existing system to make sound decisions.

Focus on what matters to the requested behavior:

- behavior ownership;
- interfaces and contracts;
- sources of truth;
- dependencies and data flow;
- important invariants;
- relevant tests and prior decisions.

Explore incrementally. Read more when uncertainty matters; do not map the whole repository by default.

Follow repository conventions and established practices of the relevant language, framework, and domain when they materially improve correctness, maintainability, safety, or interoperability.

Explicit project constraints outrank generic best practices.

Prefer simple, composable designs with clear interfaces and minimal special cases. Keep interfaces small without fragmenting cohesive behavior merely for smallness.

## Isolate substantial work

Keep substantial changes isolated from the repository's primary working state.

Prefer a dedicated branch unless the current workspace is already appropriately isolated or the repository or harness defines another workflow.

Do not create redundant isolation when one already exists.

## Preserve the plan

Before implementation, create or update a durable plan for substantial work unless an existing issue, spec, or project artifact already provides equivalent task state.

Default location:

`docs/dev/YYYY-MM-DD-<topic>-plan.md`

Use a short descriptive topic so the plan remains identifiable when multiple tasks exist on the same day.

Keep the plan outcome-oriented and current.

A useful plan may contain:

```markdown
# Goal

# Constraints

# System

# Plan
- [x] Completed outcome
- [ ] Next outcome

# Decisions

# Current State

# Evidence

# Open / Blocked

# Next

```

Use only the sections that help.

Plan meaningful outcomes, not mechanical file edits or shell commands.

Update the plan whenever reality changes.

**Plan is provisional. Current state is authoritative.**

Record decisions only when forgetting them would make later work slower, inconsistent, or incorrect.

Keep the file as working memory, not a transcript. Preserve only what another capable agent would need to resume correctly.

## Reduce decision cost

Make routine engineering decisions yourself.

When a material decision genuinely depends on the user's preference, authorization, or risk acceptance, present the smallest useful set of options with a recommendation and meaningful tradeoffs.

If that decision would be substantially easier to make visually than in prose, generate one self-contained HTML decision page.

Use the page to clarify the decision, not to decorate the plan.

Keep it focused on the decision at hand. Once the user decides, record the result in the durable plan.

Do not introduce an approval gate when no material user decision exists.

## Coordinate multiple agents through durable state

Additional agents are optional.

Use them when parallelism, specialization, independent exploration, or independent review creates real value.

Do not create agents merely to simulate software-team roles.

When multiple agents participate, use the current durable plan as shared context.

Prefer one coordinator to own updates to shared state.

Workers return findings, changes, or evidence. The coordinator integrates those results and keeps the plan consistent with repository reality.

Do not let stale agent context override newer code, decisions, or evidence.

## Follow reality

Repository state, runtime behavior, test results, and observed constraints outrank assumptions and earlier plans.

When evidence contradicts the current approach, update the understanding, plan, and implementation accordingly.

Do not preserve a plan simply because it was written earlier.

## Verify the result

Important completion claims require fresh evidence appropriate to the change.

Choose verification that matches the actual behavior and risk. It may include tests, typechecking, builds, runtime checks, integration or end-to-end behavior, browser or API checks, benchmarks, resulting-state inspection, or final diff review.

Before declaring substantial work complete, confirm that:

- the requested outcome exists;
- important constraints still hold;
- relevant existing behavior has not regressed;
- known failures or unverified areas are explicit.

Do not treat confidence, reasoning, or another agent's report as proof when the result can reasonably be checked directly.

## Finish cleanly

If work continues later, leave the durable plan accurate enough for another capable agent to resume without reconstructing the conversation.

If the task is complete, keep the plan only when it retains useful project knowledge; otherwise remove it.

Report concisely:

- what changed;
- important decisions;
- verification performed;
- remaining risks or follow-ups.
