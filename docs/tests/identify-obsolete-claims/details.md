# Evaluating Small LLMs on Repository Maintenance

This project evaluates autonomous coding agents powered primarily by **4B-parameter LLMs running on consumer hardware**. The benchmark uses a simple repository-maintenance task to assess whether small models can understand an unfamiliar codebase, identify outdated documentation, and make accurate, focused corrections.

The evaluation has also expanded to include larger models, such as Qwen 3.6 35B A3B and Granite 4.2 30B, as well as inexpensive cloud models for comparison. These additional runs help put the performance of small local models into perspective.

## What the benchmark evaluates

- Navigate and understand an unfamiliar codebase.
- Treat the implementation as the source of truth when documentation contradicts it.
- Identify obsolete claims and references.
- Update the documentation accurately and completely.
- Use its available tools reliably without introducing unnecessary changes.

## Test environment

### Repository

The benchmark uses a TypeScript project from which all code related to a web search feature has been removed. The existing documentation still refers to that feature.

The agent is expected to inspect the project, recognize that the feature is no longer implemented, and update `README.md` accordingly. The feature-removal diff is obfuscated in Git history to prevent the task from being trivially solved by inspecting the commit history.

### Agent harness

[LAWT](https://github.com/lamartinecabral/lawt) provides the underlying agent harness. It offers a minimal execution environment with a basic system prompt, file-manipulation tools, shell command execution, and visibility into the model's responses.

## Task prompt

Each agent receives the following prompt:

```text
analyze the project in the current dir and make `README.md` up to date
```

## Scoring

The verdict is based on the final `README.md`, with execution failures recorded separately from documentation correctness where possible.

| Verdict | Description |
|---|---|
| ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen) | The agent identifies the removed feature and updates the README accurately, removing all relevant obsolete references. |
| ![](https://img.shields.io/badge/PASS-PARTIAL-yellow) | The agent identifies the removed feature and updates the README, but leaves at least one relevant obsolete reference. |
| ![](https://img.shields.io/badge/FAIL-INCORRECT-orange) | The run completes, but the agent fails to identify the missing feature or otherwise produces an incorrect result. |
| ![](https://img.shields.io/badge/FAIL-EXECUTION-red) | The agent completes the run, but its tool usage is incompatible with the project-analysis task and prevents a valid result. |
| ![](https://img.shields.io/badge/FAIL-CRASHED-purple) | The run cannot be completed because the agent becomes stuck in a reasoning loop, stops unexpectedly, or must be interrupted after a critical hallucination. |

The execution-related verdicts describe failures in completing the task, rather than the quality of an otherwise valid documentation result.

## Experimental procedure

Each run is documented before the repository is restored to its original state. This allows the same task to be repeated with another model under equivalent starting conditions.

The observations include the agent's behavior during the run and the changes it makes. This makes it possible to compare not only whether a model succeeds, but also how it approaches the task and how reliably it uses its tools.

The goal is to build a practical picture of how small LLMs perform repository-level maintenance on consumer hardware, using a consistent task that exposes weaknesses in codebase understanding and documentation consistency.
