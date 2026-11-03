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

---

## Summary

| Model name                    | Verdict                                                    |
| ----------------------------- | ---------------------------------------------------------- |
| Agents A1 4B                  | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Apriel 1.6 15B Thinker        | ![](https://img.shields.io/badge/FAIL-CRASHED-purple)      |
| Bonsai 2 Ternary 4B           | ![](https://img.shields.io/badge/FAIL-EXECUTION-red)       |
| Claude Haiku 4.5              | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Flint 40B A2B                 | ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen) |
| G9v3 3B                       | ![](https://img.shields.io/badge/FAIL-EXECUTION-red)       |
| Gemini 3.1 Flash Lite         | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Gemma 4 E2B                   | ![](https://img.shields.io/badge/FAIL-EXECUTION-red)       |
| Gemma 4 E4B                   | ![](https://img.shields.io/badge/FAIL-EXECUTION-red)       |
| Gemma 4 12B                   | ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen) |
| Gemma 4 26B A4B               | ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen) |
| GLM 4.7 Flash                 | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| GPT-5 Nano                    | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| GPT-5 Mini                    | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| GPT-5.4 Nano                  | ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen) |
| GPT-OSS 20B                   | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Granite 4.2 3B                | ![](https://img.shields.io/badge/FAIL-CRASHED-purple)      |
| Granite 4.2 8B                | ![](https://img.shields.io/badge/FAIL-EXECUTION-red)       |
| Granite 4.2 30B               | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Inkling                       | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Jan Code 4B                   | ![](https://img.shields.io/badge/FAIL-CRASHED-purple)      |
| K2 Horizon 0.9B               | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| K2 Horizon 3.7B               | ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen) |
| K2 Horizon 7B                 | ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen) |
| Laguna XS 2.1 33B A3B         | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| LFM 2.5 2.6B                  | ![](https://img.shields.io/badge/FAIL-CRASHED-purple)      |
| LFM3 1.7B                     | ![](https://img.shields.io/badge/FAIL-EXECUTION-red)       |
| Ling 3.0 Tiny 8B A1B          | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Mistral Small 4               | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Mellum2.1 12B A2.5B Thinking  | ![](https://img.shields.io/badge/FAIL-EXECUTION-red)       |
| Nemotron 3 Nano 4B            | ![](https://img.shields.io/badge/FAIL-EXECUTION-red)       |
| Nemotron 3.5 Lightning        | ![](https://img.shields.io/badge/FAIL-EXECUTION-red)       |
| Nemotron 3.5 Super VL         | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| North Mini Code 1.0           | ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen) |
| Ornith 1.5 9B                 | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Ornith 1.5 35B A3B            | ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen) |
| Qwen 3 30B A3B                | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Qwen 3 32B                    | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Qwen 3 Coder Next             | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Qwen 3.5 4B                   | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Qwen 3.5 9B                   | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Qwen 3.5 27B                  | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Qwen 3.6 35B A3B              | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Qwen 3.7 Flash                | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Qwen 3.8 27B                  | ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen) |
| Seed 2.0 Mini                 | ![](https://img.shields.io/badge/FAIL-EXECUTION-red)       |
| SmolLM 3 3B                   | ![](https://img.shields.io/badge/FAIL-CRASHED-purple)      |
| Solar Pro 4                   | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |

---

## 4B-dense class

### llama.cpp: IFM/K2-Horizon-3.7B-GGUF:Q4_K_M ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)

<details><summary><b>Tool calls:</b></summary><pre>
list_directory({"path":"."})
read_file({"path":"package.json"})
read_file({"path":"README.md"})
list_directory({"path":"src"})
list_directory({"path":"tests"})
list_directory({"path":"docs"})
read_file({"path":"src/cli.ts"})
read_file({"path":"docs/ollama.md"})
read_file({"path":"biome.json"})
list_directory({"path":"src/tools"})
read_file({"path":"src/run.ts"})
read_file({"path":"src/settings.ts"})
read_file({"path":"src/session.ts"})
read_file({"path":"src/utils.ts"})
read_file({"path":"src/io.ts"})
list_directory({"path":"tests"})
read_file({"path":"tests/helpers.test.ts"})
read_file({"path":"tests/session.test.ts"})
read_file({"path":"tests/settings.test.ts"})
read_file({"path":"tests/tools.test.ts"})
read_file({"path":"src/tools/index.ts"})
read_file({"path":"src/thinking.ts"})
list_directory({"path":".git"})
grep_search({"query":"webSearch|web_search|search","isRegexp":true})
run_shell_command({"command":"git log --oneline -20 && git status"})
grep_search({"query":"web|fetch|url|HTTP","isRegexp":true,"includePattern":"src/**"})
run_shell_command({"command":"npm test --ignore-scripts 2>&1 | tail -20; npm run typecheck 2>&1 | tail -5"})
replace_string_in_file({"path":"README.md","old_text":...
replace_string_in_file({"path":"README.md","old_text":...
replace_string_in_file({"path":"README.md","old_text":...
read_file({"path":"README.md"})
</pre></details>

**Total tokens:** 19339

This model preserves reasoning across turns.

**Settings:** reasoning high, temp = 1.0, top-p = 0.95, presence-penalty = 1.5

**Observations:**

The agent correctly analyzed the project, noticed the target issue, and made precise adjustments to remove the references using the `replace_string_in_file` tool.

The updated `README.md`:
- Removes all mentions related to the removed feature. (**Correct**)

---

### llama.cpp: IFM/K2-Horizon-3.7B-GGUF:Q8_0 ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)

<details><summary><b>Tool calls:</b></summary><pre>
list_directory({"path":"."})
read_file({"path":"README.md"})
read_file({"path":"package.json"})
read_file({"path":"tsconfig.json"})
list_directory({"path":"src"})
list_directory({"path":"docs"})
list_directory({"path":"tests"})
list_directory({"path":"src/tools"})
read_file({"path":"docs/ollama.md"})
read_file({"path":"LICENSE"})
read_file({"path":"src/cli.ts"})
read_file({"path":"src/run.ts"})
read_file({"path":"src/settings.ts"})
read_file({"path":"src/session.ts"})
read_file({"path":"src/tools/index.ts"})
read_file({"path":"src/io.ts"})
read_file({"path":"src/utils.ts"})
read_file({"path":"src/thinking.ts"})
read_file({"path":"src/tools/file-search.tool.ts"})
read_file({"path":"src/tools/grep-search.tool.ts"})
read_file({"path":"src/tools/list-directory.tool.ts"})
read_file({"path":"src/tools/read-file.tool.ts"})
read_file({"path":"src/tools/write-file.tool.ts"})
read_file({"path":"src/tools/replace-string-in-file.tool.ts"})
read_file({"path":"src/tools/run-shell-command.tool.ts"})
read_file({"path":"src/tools/utils.ts"})
read_file({"path":"biome.json"})
file_search({"query":"AGENTS.md"})
run_shell_command({"command":"git log --oneline -20 && echo \"---STATUS---\" && git status"})
grep_search({"query":"web.search|web_search|tavily|ollama|web-search","isRegexp":true,"maxResults":30})
file_search({"query":"CONTRIBUTING*"})
file_search({"query":"AGENTS*"})
run_shell_command({"command":"git log --all --oneline --grep=\"web\" -i | head -20"})
run_shell_command({"command":"git log --oneline --all -- src/tools/ | head -20"})
run_shell_command({"command":"git show --stat $(git log --all --format=%H | head -1) 2>/dev/null | head -30; echo ...
run_shell_command({"command":"git branch -a && echo \"---CURRENT---\" && git log --oneline -3"})
run_shell_command({"command":"git log --all --oneline --grep=\"web-search\" -i | head -30"})
run_shell_command({"command":"git branch -a && echo \"---ALL REFS---\" && git show-ref | head -30 && echo \"---REM...
run_shell_command({"command":"git log --oneline main | wc -l && echo \"---HEAD---\" && git rev-parse HEAD"})
run_shell_command({"command":"git merge-base --is-ancestor 17d9a4a HEAD && echo \"17d9a4a is ancestor of HEAD\" ||...
run_shell_command({"command":"git log --all --oneline | grep -i \"web-search\\|web_search\\|web search\" | head -3...
run_shell_command({"command":"git log --oneline --all -- src/tools/web_search* src/tools/webFetch* src/tools/fetch...
run_shell_command({"command":"git log --oneline --diff-filter=D -- src/tools/ | head -20"})
run_shell_command({"command":"git log --oneline --all -- src/tools/ | grep -iE \"remove|delete|drop|revert|reset|s...
run_shell_command({"command":"git show --stat 56c417f | head -40"})
run_shell_command({"command":"git log --oneline --diff-filter=D --all -- src/tools/web-search.tool.ts src/tools/we...
run_shell_command({"command":"git log --all --oneline -- src/tools/index.ts | head -30"})
run_shell_command({"command":"ls node_modules/ | grep -i \"web\\|search\\|puppeteer\\|extract\" || echo \"No web s...
run_shell_command({"command":"cat package.json | grep -i \"web\\|search\" || echo \"No web/search deps in package....
run_shell_command({"command":"ls src/tools/"})
run_shell_command({"command":"ls -la src/cli.ts && echo \"---\" && git show 7a98e89 --stat | grep -i \"web\\|searc...
run_shell_command({"command":"git show 7a98e89 -- src/tools/index.ts | head -40"})
write_file({"path":"README.md","content":...
read_file({"path":"README.md"})
run_shell_command({"command":"npm run typecheck 2>&1 | tail -5"})
run_shell_command({"command":"npm test 2>&1 | tail -15"})
</pre></details>

**Total tokens:** 24625

This model preserves reasoning across turns.

**Settings:** reasoning high, temp = 1.0, top-p = 0.95

**Observations:**

The agent correctly analyzed the project, identified the missing feature, and traced the Git history until it found the exact commit that removed it.

The updated `README.md`:
- Removes all mentions related to the removed feature. (**Correct**)
- Adds a new "Tools" section. (**Acceptable**)
- Minor adjustments in other sections. (**Acceptable**)

---

### llama.cpp: InternScience/Agents-A1-4B-Q8_0-GGUF:Q8_0 ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)

<details><summary><b>Tool calls:</b></summary><pre>
list_directory({"path":"."})
read_file({"path":"package.json"})
read_file({"path":"README.md"})
list_directory({"path":"src"})
read_file({"path":"docs/ollama.md"})
list_directory({"path":"docs"})
read_file({"path":"src/cli.ts"})
read_file({"path":"src/run.ts"})
read_file({"path":"src/session.ts"})
file_search({"query":"**/provider.ts"})
list_directory({"path":"src/tools"})
read_file({"path":"src/tools/index.ts"})
run_shell_command({"command":"ls -la . | grep -E '\\.(md|ts)$'"})
run_shell_command({"command":"ls -la . | grep -i agents"})
read_file({"path":"src/tools/file-search.tool.ts"})
read_file({"path":"src/tools/grep-search.tool.ts"})
read_file({"path":"src/tools/read-file.tool.ts"})
read_file({"path":"src/tools/write-file.tool.ts"})
read_file({"path":"src/settings.ts"})
read_file({"path":"src/thinking.ts"})
read_file({"path":"src/tools/utils.ts"})
write_file({"path":"README.md","content":...
read_file({"path":"src/tools/replace-string-in-file.tool.ts"})
write_file({"path":"README.md","content":...
read_file({"path":".gitignore"})
list_directory({"path":"tests"})
run_shell_command({"command":"ls -la . | grep -E '\\.(md|ts|json)$'"})
read_file({"path":"biome.json"})
grep_search({"query":"provider\\.ts","isRegexp":false})
read_file({"path":"src/utils.ts"})
</pre></details>

**Total tokens:** 16587

**Settings:** reasoning enabled, temp = 0.85, top-p = 0.95, top-k = 20, min-p = 0.0, presence-penalty = 1.1, repeat-penalty = 1.0

**Observations:**

---

The agent scanned the project correctly but could not notice the target issue. Completely rewrote `README.md` and missed the goal.

### llama.cpp AtomicChat/Qwen3.5-4B-GGUF:Q8_0 ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)

<details><summary><b>Tool calls:</b></summary><pre>
list_directory({"path":"."})
read_file({"path":"package.json"})
read_file({"path":"README.md"})
read_file({"path":"tsconfig.json"})
list_directory({"path":"src"})
read_file({"path":"src/cli.ts"})
list_directory({"path":"docs"})
list_directory({"path":"tests"})
read_file({"path":"src/session.ts"})
read_file({"path":"src/settings.ts"})
read_file({"path":"src/run.ts"})
read_file({"path":"src/thinking.ts"})
list_directory({"path":"src/tools"})
read_file({"path":"src/tools/index.ts"})
read_file({"path":"src/utils.ts"})
list_directory({"path":"src/tools/list-directory.tool.ts"})
list_directory({"path":"docs"})
read_file({"path":"src/tools/file-search.tool.ts"})
read_file({"path":"src/tools/grep-search.tool.ts"})
read_file({"path":"src/tools/read-file.tool.ts"})
read_file({"path":"src/tools/run-shell-command.tool.ts"})
read_file({"path":"src/tools/list-directory.tool.ts"})
read_file({"path":"src/tools/write-file.tool.ts"})
read_file({"path":"src/tools/replace-string-in-file.tool.ts"})
read_file({"path":"src/io.ts"})
read_file({"path":"docs/ollama.md"})
list_directory({"path":"tests"})
read_file({"path":"src/tools/utils.ts"})
read_file({"path":"tests/helpers.test.ts"})
read_file({"path":"tests/session.test.ts"})
read_file({"path":"tests/settings.test.ts"})
read_file({"path":"tests/tools.test.ts"})
write_file({"path":"README.md",...
read_file({"path":"README.md"})
</pre></details>

**Total tokens:** 22544

**Settings:** reasoning enabled, temp = 1.0, top-p = 0.95, top-k = 20, min-p = 0.0, presence-penalty = 1.5, repeat-penalty = 1.0

**Observations:**

The agent scanned the project correctly but could not notice the target issue. Completely rewrote `README.md` and missed the goal.

---

### llama.cpp: ggml-org/gemma-4-E4B-it-GGUF:Q8_0 ![](https://img.shields.io/badge/FAIL-EXECUTION-red)

<details><summary><b>Tool calls:</b></summary><pre>
list_directory({"path":"./"})
read_file({"path":"package.json","start_line":1})
read_file({"path":"README.md","start_line":1})
</pre></details>

**Total tokens:** 3297

**Settings:** reasoning enabled, temp = 1.0, top-p = 0.95, top-k = 64

**Observations:**

The agent only read `package.json` and `README.md` then decided no updates are necessary.

---

### Ollama: hf.co/bartowski/ai9stars_G9v3-3B-GGUF:Q8_0 ![](https://img.shields.io/badge/FAIL-EXECUTION-red)

<details><summary><b>Tool calls:</b></summary><pre>
list_directory({"path":"."})
read_file({"path":"README.md"})
list_directory({"path":"src"})
list_directory({"path":"tests"})
read_file({"path":"src/tools/cli.ts"})
read_file({"path":"src/tools/run.ts"})
read_file({"path":"src/tools/settings.ts"})
list_directory({"path":"tools"})
run_shell_command({"command":"ls -la"})
run_shell_command({"command":"find src -type f 2\u003e/dev/null"})
run_shell_command({"command":"cat package.json"})
read_file({"path":"src/cli.ts"})
read_file({"path":"src/run.ts"})
read_file({"path":"src/settings.ts"})
read_file({"path":"README.md"})
file_search({"query":"AGENTS.md provider.ts"})
list_directory({"path":"docs"})
file_search({"query":"package.json"})
read_file({"path":"docs/ollama.md"})
write_file({"path":"README.md","content":...
write_file({"content":...
read_file({"path":"README.md"})
read_file({"path":"src/utils.ts"})
run_shell_command({"command":"rm README.md \u0026\u0026 git add README.md...
write_file({"path":"README.md","content":...
grep_search({"query":"provider.ts","isRegexp":true})
list_directory({"path":"src"})
file_search({"query":"provider.ts"})
grep_search({"isRegexp":true,"query":"AGENTS.md"})
write_file({"content":...
</pre></details>

**Observations:**

It struggled to use the file tools, did not scan the project correctly, removed a section from `README.md`, and missed the goal.

---

### Ollama: bonsai-2:4b ![](https://img.shields.io/badge/FAIL-EXECUTION-red)

<details><summary><b>Tool calls:</b></summary><pre>
list_directory({"path":"."})
read_file({"path":"README.md"})
list_directory({"path":"docs"})
read_file({"path":"docs/ollama.md"})
list_directory({"path":"src"})
read_file({"path":"package.json"})
list_directory({"path":"~/.localai"})
read_file({"path":"src/cli.ts"})
read_file({"path":"src/thinking.ts"})
read_file({"path":"src/session.ts"})
run_shell_command({"command":"find . -name \"*.md\" -type f | grep -v node_modules|head -20"})
write_file({"path":"README.md","content":...
</pre></details>

**Observations:**

It did not scan the project correctly and completely rewrote `README.md`.

---

### Ollama: nemotron-3-nano:4b ![](https://img.shields.io/badge/FAIL-EXECUTION-red)

<details><summary><b>Tool calls:</b></summary><pre>
list_directory({"path":"."})
read_file({"path":"README.md","start_line":1,"end_line":20})
list_directory({"path":"docs/"})
list_directory({"path":"src/"})
write_file({"path":"README.md","content":...
</pre></details>

**Observations:**

It read only part of `README.md` and listed some files, then rewrote `README.md` with incoherent content.

---

### Ollama: hf.co/LiquidAI/LFM2.5-2.6B-GGUF:Q8_0 ![](https://img.shields.io/badge/FAIL-CRASHED-purple)

**Observations:**

I had to interrupt the agent because it became confused about tool use, repeatedly calling `read_file` instead of using a tool to update the file.

---

### Ollama: granite4.2:3b ![](https://img.shields.io/badge/FAIL-CRASHED-purple)

**Observations:**

I had to interrupt the agent because it began hallucinating and looping in its reasoning about a nonexistent typo.

---

### Ollama: hf.co/ggml-org/SmolLM3-3B-GGUF:Q8_0 ![](https://img.shields.io/badge/FAIL-CRASHED-purple)

**Observations:**

I had to interrupt the agent because it began hallucinating about a Python project before making any tool calls.

---

### Ollama: hf.co/janhq/Jan-code-4b-gguf:Q8_0 ![](https://img.shields.io/badge/FAIL-CRASHED-purple)

**Observations:**

It only returned `{"name": "list_directory", "arguments": {"path": "."}}\n</tool_call>` inside a reasoning block.

Completely useless.

---

## 8B-dense class

### llama.cpp: ggml-org/gemma-4-12B-it-GGUF:Q4_0 ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)

<details><summary><b>Tool calls:</b></summary><pre>
list_directory({"path":"."})
read_file({"path":"package.json"})
read_file({"path":"src/cli.ts"})
read_file({"path":"src/run.ts"})
read_file({"path":"src/tools/index.ts"})
read_file({"path":"README.md"})
list_directory({"path":"src/tools/"})
list_directory({"path":"docs/"})
read_file({"path":"src/settings.ts"})
read_file({"path":"src/session.ts"})
read_file({"path":"src/io.ts"})
read_file({"path":"src/thinking.ts"})
read_file({"path":"src/utils.ts"})
read_file({"path":"src/tools/file-search.tool.ts"})
read_file({"path":"src/tools/grep-search.tool.ts"})
read_file({"path":"docs/ollama.md"})
read_file({"path":"src/tools/utils.ts"})
write_file({"content":...
</pre></details>

**Total tokens:** 16866

**Settings:** reasoning enabled, temp = 1.0, top-p = 0.95, top-k = 64

**Observations:**

The agent correctly analyzed the project, noticed the missing feature, and made precise adjustments.

The updated `README.md`:
- Removes all mentions related to the removed feature. (**Correct**)

---

### llama.cpp: IFM/K2-Horizon-7B-GGUF:Q4_K_M ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)

<details><summary><b>Tool calls:</b></summary><pre>
run_shell_command({"command":"pwd && ls -la"})
file_search({"query":"**/*"})
read_file({"path":"README.md"})
read_file({"path":"package.json"})
run_shell_command({"command":"find src tests docs -type f | sort"})
read_file({"path":"src/cli.ts"})
read_file({"path":"src/run.ts"})
read_file({"path":"src/session.ts"})
read_file({"path":"src/io.ts"})
read_file({"path":"src/settings.ts"})
read_file({"path":"src/thinking.ts"})
read_file({"path":"src/utils.ts"})
read_file({"path":"src/tools/index.ts"})
read_file({"path":"docs/ollama.md"})
run_shell_command({"command":"cd /app/localai && git log --oneline -15 && echo \"---STATUS---\" && git status"})
read_file({"path":"src/tools/file-search.tool.ts"})
read_file({"path":"src/tools/grep-search.tool.ts"})
read_file({"path":"src/tools/list-directory.tool.ts"})
read_file({"path":"src/tools/read-file.tool.ts"})
read_file({"path":"src/tools/write-file.tool.ts"})
read_file({"path":"src/tools/replace-string-in-file.tool.ts"})
read_file({"path":"src/tools/run-shell-command.tool.ts"})
read_file({"path":"src/tools/utils.ts"})
run_shell_command({"command":"cd /app/localai && cat .vscode/settings.json biome.json tsconfig.json .gitignore &...
read_file({"path":"tests/tools.test.ts"})
read_file({"path":"tests/session.test.ts"})
read_file({"path":"tests/helpers.test.ts"})
read_file({"path":"tests/settings.test.ts"})
run_shell_command({"command":"cd /app/localai && git show 4e3ccfe --stat && echo \"===README in that commit===\"...
grep_search({"query":"webSearch|web-search|searchWeb|tavily|chromePath|web_search|searchWeb","isRegexp":true,"maxResults":50})
run_shell_command({"command":"cd /app/localai && git log --all --oneline | head -30 && echo \"===FILES in histor...
run_shell_command({"command":"cd /app/localai && git log --all --oneline --diff-filter=D -- src/tools/web-search...
run_shell_command({"command":"cd /app/localai && git show 17d9a4a --stat | head -60"})
run_shell_command({"command":"cd /app/localai && git show 7a98e89:README.md | head -60"})
run_shell_command({"command":"cd /app/localai && git show 17d9a4a:src/tools/web-search.tool.ts && echo \"===inde...
run_shell_command({"command":"cd /app/localai && git log --all --oneline -- src/tools/web-search.tool.ts src/too...
run_shell_command({"command":"cd /app/localai && git show 7a98e89 -- src/tools/index.ts tests/tools.test.ts | cat"})
run_shell_command({"command":"cd /app/localai && git log --all --oneline -- README.md | tail -5 && echo \"===fir...
grep_search({"query":"webSearch|web_search|fetch_page_content|tavily|localai/provider","isRegexp":true,"includePattern":"*.ts"})
run_shell_command({"command":"cd /app/localai && node --test 2>&1 | tail -5 && echo \"===typecheck===\" && npx -...
run_shell_command({"command":"cd /app/localai && npm run typecheck 2>&1 | tail -5; echo \"===lint===\"; npm run ...
write_file({"path":"README.md","content":...
read_file({"path":"README.md"})
run_shell_command({"command":"cd /app/localai && npm test 2>&1 | tail -4"})
</pre></details>

**Total tokens:** 39837

This model preserves reasoning across turns.

**Settings:** reasoning high, temp = 1.0, top-p = 0.95

**Observations:**

The agent correctly analyzed the project, identified the missing feature, and traced the Git history until it found the exact commit that removed it.

The updated `README.md`:
- Removes all mentions related to the removed feature. (**Correct**)
- Adds a new "Tools" section. (**Acceptable**)

---

### llama.cpp: ornith-ai/Ornith-1.5-9B-GGUF:Q4_K_M ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)

<details><summary><b>Tool calls:</b></summary><pre>
list_directory({"path":"."})
read_file({"path":"package.json"})
read_file({"path":"README.md"})
list_directory({"path":"src"})
list_directory({"path":"tests"})
list_directory({"path":"docs"})
read_file({"path":"src/cli.ts"})
read_file({"path":"tsconfig.json"})
read_file({"path":"biome.json"})
read_file({"path":"LICENSE"})
read_file({"path":"src/run.ts"})
read_file({"path":"src/session.ts"})
read_file({"path":"src/tools.ts"})
list_directory({"path":"src/tools"})
read_file({"path":"src/io.ts"})
read_file({"path":"src/settings.ts"})
read_file({"path":"src/utils.ts"})
read_file({"path":"src/thinking.ts"})
read_file({"path":"src/tools/index.ts"})
read_file({"path":"src/tools/utils.ts"})
read_file({"path":"docs/ollama.md"})
read_file({"path":"src/tools/file-search.tool.ts"})
read_file({"path":"src/tools/grep-search.tool.ts"})
read_file({"path":"src/tools/list-directory.tool.ts"})
read_file({"path":"src/tools/read-file.tool.ts"})
read_file({"path":"src/tools/replace-string-in-file.tool.ts"})
read_file({"path":"src/tools/run-shell-command.tool.ts"})
read_file({"path":"src/tools/write-file.tool.ts"})
read_file({"path":"tests/tools.test.ts"})
read_file({"path":".gitignore"})
list_directory({"path":".vscode"})
run_shell_command({"command":"cd /app/localai && npm test 2>&1 | tail -40"})
run_shell_command({"command":"cd /app/localai && npm run typecheck 2>&1 | tail -20 && echo \"=== LINT ...
run_shell_command({"command":"cd /app/localai && git log --oneline -10 2>&1; echo \"=== STATUS ===\"; ...
write_file({"path":"README.md","content"...
replace_string_in_file({"path":"README.md","old_text":...
read_file({"path":"README.md"})
</pre></details>

**Total tokens:** 25117

**Settings:** reasoning enabled, temp = 1.0, top-p = 0.95, top-k = 20, min-p = 0.0, presence-penalty = 1.5, repeat-penalty = 1.0

**Observations:**

The agent did not notice the target issue. Updated `README.md` by adding a new "Features" section.

---

### Ollama: ServiceNow-AI/Apriel-1.6-15b-Thinker:Q4_K_M ![](https://img.shields.io/badge/FAIL-CRASHED-purple)

**Observations:**

The agent only read `README.md` and `package.json`, spent thousands of tokens in reasoning, and in the end, when it was about to call the update tool, it stopped.

---

## 30B-sparse class

### llama.cpp: AtomicChat/gemma-4-26B-A4B-it-GGUF:IQ4_XS ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)

<details><summary><b>Tool calls:</b></summary><pre>
list_directory({"path":"."})
read_file({"path":"package.json"})
list_directory({"path":"src"})
read_file({"path":"src/cli.ts"})
read_file({"path":"src/run.ts"})
list_directory({"path":"src/tools"})
read_file({"path":"src/tools/index.ts"})
read_file({"path":"README.md"})
read_file({"path":"src/tools/file-search.tool.ts"})
read_file({"path":"src/tools/grep-search.tool.ts"})
read_file({"path":"src/tools/run-shell-command.tool.ts"})
list_directory({"path":"docs"})
list_directory({"path":"tests"})
read_file({"path":"src/settings.ts"})
read_file({"path":"src/utils.ts"})
read_file({"path":"src/tools/utils.ts"})
write_file({"content":...
</pre></details>

**Total tokens:** 15162

**Settings:** reasoning enabled, temp = 1.0, top-p = 0.95, top-k = 64

**Observations:**

The agent correctly analyzed the project.

The updated `README.md`:
- Removes all mentions related to the removed feature. (**Correct**)
- Minor adjustments. (**Acceptable**)

---

### llama.cpp: AtomicChat/Ornith-1.5-35B-A3B-GGUF:IQ3_XXS ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)

<details><summary><b>Tool calls:</b></summary><pre>
list_directory({"path":"."})
read_file({"path":"package.json"})
read_file({"path":"README.md"})
list_directory({"path":"src"})
list_directory({"path":"tests"})
list_directory({"path":"docs"})
read_file({"path":"src/cli.ts"})
read_file({"path":"src/run.ts"})
read_file({"path":"src/session.ts"})
read_file({"path":"src/tools.ts"})
read_file({"path":"src/io.ts"})
read_file({"path":"src/settings.ts"})
list_directory({"path":"src/tools"})
read_file({"path":"src/thinking.ts"})
read_file({"path":"src/utils.ts"})
read_file({"path":"src/tools/index.ts"})
read_file({"path":"src/tools/utils.ts"})
read_file({"path":"src/tools/read-file.tool.ts"})
read_file({"path":"src/tools/file-search.tool.ts"})
read_file({"path":"src/tools/grep-search.tool.ts"})
read_file({"path":"src/tools/list-directory.tool.ts"})
read_file({"path":"src/tools/write-file.tool.ts"})
read_file({"path":"src/tools/replace-string-in-file.tool.ts"})
read_file({"path":"src/tools/run-shell-command.tool.ts"})
read_file({"path":"docs/ollama.md"})
read_file({"path":"tsconfig.json"})
read_file({"path":"biome.json"})
read_file({"path":".gitignore"})
read_file({"path":"tests/tools.test.ts"})
read_file({"path":"tests/settings.test.ts"})
read_file({"path":"tests/session.test.ts"})
read_file({"path":"tests/helpers.test.ts"})
read_file({"path":"LICENSE"})
run_shell_command({"command":"cd /app/localai && npm test 2>&1 | tail -20"})
run_shell_command({"command":"cd /app/localai && git log --oneline -10 2>&1"})
run_shell_command({"command":"cd /app/localai && npm run typecheck 2>&1 | tail -10; echo \"---LINT---\"; npm ...
grep_search({"query":"web|tavily|fetch|web-search","isRegexp":true,"includePattern":"src/**"})
grep_search({"query":"web-search|lamartinecabral","isRegexp":true})
write_file({"content":...
read_file({"path":"README.md"})
</pre></details>

**Total tokens:** 28018

**Settings:** reasoning enabled, temp = 0.6, top-p = 0.95, top-k = 20

**Observations:**

The agent correctly analyzed the project.

The updated `README.md`:
- Removes all mentions related to the removed feature. (**Correct**)
- Adds a new "Tools" section. (**Acceptable**)
- Improvements in other sections. (**Acceptable**)

---

### llama.cpp: AtomicChat/Flint-GGUF:IQ2_XXS ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)

<details><summary><b>Tool calls:</b></summary><pre>
read_file({"path":"."})
list_directory({"path":"."})
read_file({"path":"package.json"})
read_file({"path":"README.md"})
read_file({"path":"tsconfig.json"})
read_file({"path":"biome.json"})
read_file({"path":"src"})
read_file({"path":"docs"})
read_file({"path":"tests"})
read_file({"path":"src/cli.ts"})
read_file({"path":"src/run.ts"})
read_file({"path":"src/session.ts"})
read_file({"path":"src/settings.ts"})
read_file({"path":"src/utils.ts"})
read_file({"path":"src/io.ts"})
read_file({"path":"src/tools"})
read_file({"path":"src/thinking.ts"})
read_file({"path":"src/tools/index.ts"})
read_file({"path":".vscode"})
read_file({"path":"tests"})
read_file({"path":"src/tools/file-search.tool.ts"})
read_file({"path":"src/tools/utils.ts"})
read_file({"path":"tests"})
read_file({"path":"src/tools/run-shell-command.tool.ts"})
read_file({"path":"src/tools/list-directory.tool.ts"})
read_file({"path":"src/tools/read-file.tool.ts"})
read_file({"path":"src/tools/grep-search.tool.ts"})
read_file({"path":"src/tools/write-file.tool.ts"})
read_file({"path":"src/tools/replace-string-in-file.tool.ts"})
read_file({"path":"tests"})
read_file({"path":"docs"})
read_file({"path":"tests"})
read_file({"path":".gitignore"})
read_file({"path":"LICENSE"})
run_shell_command({"command":"find . -type f -not -path './node_modules/*' -not -path './.git/*' -not -path './...
read_file({"path":"docs/ollama.md"})
read_file({"path":"tests/tools.test.ts"})
read_file({"path":"tests/session.test.ts"})
read_file({"path":"tests/settings.test.ts"})
read_file({"path":"tests/helpers.test.ts"})
read_file({"path":".vscode"})
read_file({"path":".vscode"})
run_shell_command({"command":"ls -la /workspace 2>/dev/null || ls -la .; echo \"---\"; git ls-files | head -50"})
read_file({"path":".vscode/settings.json"})
run_shell_command({"command":"git log --oneline -20; echo \"---\"; git status --short"})
run_shell_command({"command":"git log --oneline --all -- README.md | head -20; echo \"---\"; git show --stat HE...
run_shell_command({"command":"node --version; echo \"---\"; npx tsx --version 2>/dev/null | head -2; echo \"---...
run_shell_command({"command":"git show 4e3ccfe -- README.md | head -120; echo \"=====\"; git show 7a98e89 -- RE...
grep_search({"query":"CHROME_PATH|webSearch|web_search|websearch","isRegexp":false})
grep_search({"query":"webSearch|CHROME_PATH|web-search|webSearchSettings","isRegexp":false})
grep_search({"query":"CHROME_PATH|webSearch|web-search|chromePath","isRegexp":true})
run_shell_command({"command":"grep -rn \"CHROME_PATH\\|chromePath\\|webSearch\" src/ docs/ --include=\"*\" | head -40"})
run_shell_command({"command":"grep -rn \"web\" src/ --include=\"*.ts\" -i | head -30; echo \"=====\"; grep -rn ...
run_shell_command({"command":"grep -rni \"web\" src --include=\"ts\" | head -30"})
run_shell_command({"command":"cat src/utils.ts | head -20; echo \"EXIT=$?\""})
run_shell_command({"command":"grep -rni \"web\" src | wc -l; grep -rni \"web\" src | head -30"})
run_shell_command({"command":"grep -rni \"search\" src | head -40"})
fetch_page_content({"url":"https://github.com/lamartinecabral/web-search"})
run_shell_command({"command":"git log --oneline -15 -- src/cli.ts; echo \"=====\"; git diff HEAD --stat | tail -5"})
run_shell_command({"command":"git log -p --follow -- src/cli.ts | grep -n \"assertModel\" | head -40"})
run_shell_command({"command":"git log -S \"options.model ?? settings.model\" --oneline -- src/cli.ts"})
run_shell_command({"command":"git show f6bf97b -- src/cli.ts | head -100"})
run_shell_command({"command":"git log -S \"webSearch\" --oneline | head -20"})
run_shell_command({"command":"git show 17d7a4a --stat | head -30; echo \"=====\"; git show 17d7a4a -- src | head -150"})
run_shell_command({"command":"git log -S \"webSearch\" --oneline --all | head; echo \"=====\"; git grep -n \"we...
run_shell_command({"command":"git log --oneline --all --diff-filter=D -- src/tools/web-search.tool.ts | head; e...
run_shell_command({"command":"git show 7a98e89 --stat | head -60"})
run_shell_command({"command":"git show 7a98e89 -- README.md docs/ollama.md src/utils.ts src/tools/index.ts src/...
write_file({"path":"README.md","content":...
read_file({"path":"README.md"})
run_shell_command({"command":"grep -in \"web\\|tavily\\|tubily\\|lawt\\|ollama\" README.md; echo \"GREP_EXIT=$?...
read_file({"path":"README.md"})
run_shell_command({"command":"git diff --stat; echo \"=====\"; git status --short"})
</pre></details>

**Total tokens:** 64370

This model preserves reasoning across turns.

**Settings:** reasoning enabled, temp = 1.0, top-p = 0.95, top-k = 20

**Observations:**

The agent correctly analyzed the project, got suspicious about the missing feature and traced the Git history until it found the exact commit that removed it.

The updated `README.md`:
- Removes all mentions related to the removed feature. (**Correct**)
- Adds a new "Tools" section. (**Acceptable**)
- Minor adjustments in other sections. (**Acceptable**)

---

### Ollama: north-mini-code-1.0:q4_K_M ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)

<details><summary><b>Tool calls:</b></summary><pre>
list_directory({"path":"."})
read_file({"path":"./README.md"})
read_file({"path":"./package.json"})
list_directory({"path":"./src"})
read_file({"path":"./src/cli.ts"})
read_file({"path":"./src/session.ts"})
list_directory({"path":"./docs"})
read_file({"path":"./docs/ollama.md"})
list_directory({"path":"./tests"})
file_search({"query":"**/provider.ts"})
file_search({"query":"**/provider*"})
grep_search({"query":"provider","isRegexp":false,"includePattern":"**/*.ts","maxResults":20})
read_file({"path":"./src/utils.ts"})
list_directory({"path":"./src/tools"})
read_file({"path":"./src/tools/index.ts"})
read_file({"path":"./src/tools/read-file.tool.ts"})
read_file({"path":"./src/run.ts"})
read_file({"path":"./src/settings.ts"})
write_file({"path":"./README.md","content":...
read_file({"path":"./README.md","start_line":1,"end_line":50})
file_search({"query":"**/web-search/**"})
grep_search({"query":"web.search|websearch|web_search","isRegexp":false,"maxResults":10})
grep_search({"query":"web.*search|websearch|cloud.*search","isRegexp":false,"maxResults":10,"includePattern":"**/*.md"})
list_directory({"path":"./src/tools"})
file_search({"query":"**/*.md"})
write_file({"path":"./README.md","content":...
read_file({"path":"./README.md"})
read_file({"path":"./package.json"})
</pre></details>

**Observations:**

It scanned the project correctly, noticed the missing feature and made coherent adjustments to `README.md`.

---

### llama.cpp: bartowski/zai-org_GLM-4.7-Flash-GGUF:IQ3_M ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)

<details><summary><b>Tool calls:</b></summary><pre>
list_directory({"path":"."})
read_file({"path":"README.md"})
read_file({"path":"package.json"})
list_directory({"path":"src"})
read_file({"path":"src/cli.ts"})
read_file({"path":"src/session.ts"})
read_file({"path":"src/settings.ts"})
list_directory({"path":"src/tools"})
read_file({"path":"src/run.ts"})
read_file({"path":"src/tools/index.ts"})
read_file({"path":"src/tools/file-search.tool.ts"})
list_directory({"path":"docs"})
read_file({"path":"src/tools/run-shell-command.tool.ts"})
read_file({"path":"src/tools/write-file.tool.ts"})
read_file({"path":"src/tools/read-file.tool.ts"})
read_file({"path":"src/tools/replace-string-in-file.tool.ts"})
read_file({"path":"src/tools/grep-search.tool.ts"})
read_file({"path":"src/tools/list-directory.tool.ts"})
read_file({"path":"src/thinking.ts"})
read_file({"path":"docs/ollama.md"})
read_file({"path":"src/utils.ts"})
read_file({"path":"~/.localai/AGENTS.md"})
write_file({"path":"README.md","content":...
</pre></details>

**Total tokens:** 13617

**Settings:** reasoning high, temp = 1.0, top-p = 0.95

**Observations:**

The agent scanned the project correctly but did not notice the target issue.

---

### llama.cpp: bartowski/Laguna-XS-2.1-GGUF:IQ3_XXS ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)

<details><summary><b>Tool calls:</b></summary><pre>
list_directory({"path":"."})
read_file({"path":"package.json"})
read_file({"path":"README.md"})
list_directory({"path":"src"})
list_directory({"path":"src/tools"})
list_directory({"path":"docs"})
list_directory({"path":"tests"})
read_file({"path":"src/cli.ts"})
read_file({"path":"src/session.ts"})
read_file({"path":"src/run.ts"})
read_file({"path":"src/tools/index.ts"})
read_file({"path":"src/tools/file-search.tool.ts"})
read_file({"path":"src/tools/grep-search.tool.ts"})
read_file({"path":"src/tools/list-directory.tool.ts"})
read_file({"path":"src/tools/read-file.tool.ts"})
read_file({"path":"src/tools/write-file.tool.ts"})
read_file({"path":"src/tools/replace-string-in_file.tool.ts"})
read_file({"path":"src/tools/replace-string-in-file.tool.ts"})
read_file({"path":"src/tools/run-shell-command.tool.ts"})
read_file({"path":"docs/ollama.md"})
read_file({"path":"src/settings.ts"})
read_file({"path":"tests/helpers.test.ts"})
read_file({"path":"tests/tools.test.ts"})
read_file({"path":"tsconfig.json"})
read_file({"path":"biome.json"})
read_file({"path":"src/io.ts"})
read_file({"path":"src/utils.ts"})
read_file({"path":"src/tools/utils.ts"})
read_file({"path":"src/thinking.ts"})
read_file({"path":"LICENSE"})
list_directory({"path":".vscode"})
read_file({"path":"tests/session.test.ts"})
read_file({"path":"tests/settings.test.ts"})
write_file({"path":"README.md","content":...
read_file({"path":"README.md"})
run_shell_command({"command":"cd /app/localai && npm test"})
run_shell_command({"command":"cd /app/localai && npm run typecheck"})
</pre></details>

**Total tokens:** 21919

This model preserves reasoning across turns.

**Settings:** reasoning high, temp = 1.0, top-k = 20, top-p = 1.0

**Observations:**

The agent scanned the project correctly but did not notice the target issue.

---

### llama.cpp: JetBrains/Mellum2.1-12B-A2.5B-Thinking-GGUF:Q4_K_M ![](https://img.shields.io/badge/FAIL-EXECUTION-red)

<details><summary><b>Tool calls:</b></summary><pre>
list_directory({"path": "."})
read_file({"path": "README.md", "start_line": 1, "end_line": 100})
read_file({"path": "package.json", "start_line": 1, "end_line": 50})
list_directory({"path": "docs"})
write_file({"path": "README.md", "content":...
</pre></details>

**Total tokens:** 12588

**Settings:** reasoning enabled, temp = 0.6, top-p = 0.95, top-k = 20

**Observations:**

It only read `README.md` and `package.json`, then added a "License" section to `README.md`.

---

## 30B-dense class

### llama.cpp: batiai/Qwen3.8-27B-GGUF:Q2_K_S ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)

<details><summary><b>Tool calls:</b></summary><pre>
list_directory({"path":"."})
file_search({"query":"README.md"})
read_file({"path":"package.json","start_line":1,"end_line":200})
read_file({"path":"README.md","start_line":1,"end_line":200})
list_directory({"path":"src"})
list_directory({"path":"docs"})
list_directory({"path":"tests"})
read_file({"path":"src/cli.ts","start_line":1,"end_line":300})
list_directory({"path":"src/tools"})
read_file({"path":"src/tools/index.ts","start_line":1,"end_line":200})
read_file({"path":"src/run.ts","start_line":1,"end_line":200})
read_file({"path":"src/utils.ts","start_line":1,"end_line":200})
read_file({"path":"src/settings.ts","start_line":1,"end_line":200})
read_file({"path":"docs/ollama.md","start_line":1,"end_line":200})
read_file({"path":"src/session.ts","start_line":1,"end_line":200})
read_file({"path":"src/io.ts","start_line":1,"end_line":200})
read_file({"path":"src/tools/list-directory.tool.ts","start_line":1,"end_line":40})
read_file({"path":"src/tools/grep-search.tool.ts","start_line":1,"end_line":40})
write_file({"path":"README.md","content":...
</pre></details>

**Total tokens:** 14195

**Settings:** reasoning low, temp = 1.0, top-p = 0.95, top-k = 20

**Observations:**

The updated `README.md`:
- Removes all mentions related to the removed feature. (**Correct**)
- Adds a new "Tools" section. (**Acceptable**)

---

## 2B-dense & 8B-sparse classes

### llama.cpp: inclusionAI/Ling-3.0-tiny-GGUF:Q8_0 ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)

<details><summary><b>Tool calls:</b></summary><pre>
list_directory({"path":"."})
read_file({"path":"README.md"})
read_file({"path":"package.json"})
read_file({"path":"tsconfig.json"})
read_file({"path":"biome.json"})
read_file({"path":"LICENSE"})
list_directory({"path":"src"})
list_directory({"path":"tests"})
list_directory({"path":"docs"})
read_file({"path":"src/cli.ts"})
read_file({"path":"src/io.ts"})
read_file({"path":"src/run.ts"})
read_file({"path":"src/session.ts"})
read_file({"path":"src/settings.ts"})
read_file({"path":"src/thinking.ts"})
read_file({"path":"src/utils.ts"})
read_file({"path":"src/tools/"})
list_directory({"path":"src/tools"})
read_file({"path":"docs/ollama.md"})
read_file({"path":"docs/ollama.md"})
run_shell_command({"command":"cat .gitignore"})
write_file({"path":"README.md","content":...
read_file({"path":"README.md"})
</pre></details>

**Total tokens:** 16466

This model preserves reasoning across turns.

**Settings:** reasoning enabled, temp = 1.0, top-p = 0.95, top-k = 20

**Observations:**

The agent scanned the project correctly but did not notice the target issue.

The updated `README.md`:
- Kept all mentions related to the removed feature. (**Incorrect**)
- Adds a new "Tools" section. (**Acceptable**)
- Minor adjustments in other sections. (**Acceptable**)

---

### llama.cpp: IFM/K2-Horizon-0.9B-GGUF:Q8_0 ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)

<details><summary><b>Tool calls:</b></summary><pre>
list_directory({"path":"."})
read_file({"path":"README.md"})
read_file({"path":"package.json"})
read_file({"path":"src/cli.ts"})
read_file({"path":"docs/ollama.md"})
read_file({"path":"AGENTS.md"})
read_file({"path":"docs/index.md"})
read_file({"path":"src/settings.ts"})
read_file({"path":"src/session.ts"})
read_file({"path":"docs/ollama.md"})
read_file({"path":"src/run.ts"})
read_file({"path":"src/io.ts"})
read_file({"path":"docs/index.md"})
list_directory({"path":"docs"})
read_file({"path":"docs/ollama.md"})
write_file({"path":"README.md","content":...
read_file({"path":"README.md"})
</pre></details>

**Total tokens:** 10799

This model preserves reasoning across turns.

**Settings:** reasoning high, temp = 0.6, top-p = 0.95

**Observations:**

The agent did not notice the missing feature, added several new sections to `README.md` and missed the goal.

---

### llama.cpp: ggml-org/gemma-4-E2B-it-GGUF:Q8_0 ![](https://img.shields.io/badge/FAIL-EXECUTION-red)

<details><summary><b>Tool calls:</b></summary><pre>
list_directory({"path":"."})
read_file{"end_line":100,"path":"README.md","start_line":1}
write_file({"path":"README.md","content":...
</pre></details>

**Total tokens:** 3303

**Settings:** reasoning enabled, temp = 1.0, top-p = 0.95, top-k = 64

**Observations:**

The agent only read `README.md` then refactored the content.

---

### llama.cpp: LiquidAI/LFM3-1.7B-GGUF:Q8_0 ![](https://img.shields.io/badge/FAIL-EXECUTION-red)

<details><summary><b>Tool calls:</b></summary><pre>
list_directory({"path":"."})
read_file({"path":"README.md"})
list_directory({"path":"src"})
read_file({"path":"src/cli.ts"})
read_file({"path":"src/io.ts"})
read_file({"path":"src/run.ts"})
write_file({"path":"README.md","content":...
</pre></details>

**Total tokens:** 6552

This model preserves reasoning across turns.

**Settings:** reasoning enabled, temp = 0.1, repeat-penalty = 1.1, top-k = 50

**Observations:**

The agent only read a few files then make some adjustments to `README.md` with a new "Source Files" section.

---

# Cheap cloud models

### [Hugging Face's Inference Providers](https://huggingface.co/docs/inference-providers)

- **ibm-granite/granite-4.2-30b** ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)
  - It made adjustments to `README.md` but did not notice that web search had been removed.
- **Qwen/Qwen3.5-9B** ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)
  - It rewrote `README.md` without removing the references to web search.
- **Qwen/Qwen3.6-35B-A3B** ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)
  - It rewrote `README.md` without removing the references to web search.
- **ibm-granite/granite-4.2-8b** ![](https://img.shields.io/badge/FAIL-EXECUTION-red)
  - It read only `README.md` and `package.json`, then made adjustments to `README.md`.

### [Ollama's cloud](https://docs.ollama.com/cloud)

- **gpt-oss:20b** ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)
  - It rewrote `README.md` without removing the references to web search.
- **nemotron-3-nano:30b** ![](https://img.shields.io/badge/FAIL-EXECUTION-red)
  - It did not scan the project correctly, and rewrote `README.md` without noticing the missing feature.

### [Openrouter](https://openrouter.ai/)

- **openai/gpt-5.4-nano** ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)
- **anthropic/claude-haiku-4.5** ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)
  - It did notice the missing feature but the updated `README.md` had no fix about it.
- **google/gemini-3.1-flash-lite** ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)
  - It struggled to use the tools correctly and made adjustments to `README.md` without noticing the missing feature.
- **mistralai/mistral-small-2603** ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)
  - It rewrote `README.md` without removing the references to web search.
- **nvidia/nemotron-3.5-super-vl** ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)
  - It did notice the missing feature but the updated `README.md` had no fix about it.
- **openai/gpt-5-nano** ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)
  - It made adjustments to `README.md` but did not notice that web search had been removed.
- **openai/gpt-5-mini** ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)
  - It made adjustments to `README.md` but did not notice that web search had been removed.
- **qwen/qwen3-30b-a3b-instruct-2507** ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)
  - It made adjustments to `README.md` but did not notice that web search had been removed.
- **qwen/qwen3-32b** ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)
  - It made adjustments to `README.md` but did not notice that web search had been removed.
- **qwen/qwen3-coder-next** ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)
  - It made adjustments to `README.md` but did not notice that web search had been removed.
- **qwen/qwen3.5-27b** ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)
  - It made adjustments to `README.md` but did not notice that web search had been removed.
- **qwen/qwen3.6-35b-a3b** ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)
  - It made adjustments to `README.md` but did not notice that web search had been removed.
- **qwen/qwen3.7-flash** ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)
  - It rewrote `README.md` without removing the references to web search.
- **thinkingmachines/inkling** ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)
  - It made adjustments to `README.md` but did not notice that web search had been removed.
- **upstage/solar-pro4** ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)
  - It made adjustments to `README.md` but did not notice that web search had been removed.
- **bytedance-seed/seed-2.0-mini** ![](https://img.shields.io/badge/FAIL-EXECUTION-red)
  - It did not scanned the project correctly, made minor adjustments to `README.md` and missed the goal.
- **nvidia/nemotron-3.5-lightning** ![](https://img.shields.io/badge/FAIL-EXECUTION-red)
  - It only tried to format `README.md`.
