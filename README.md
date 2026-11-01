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
| Claude Haiku 4.5              | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Flint 40B A2B                 | ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen) |
| Gemini 3.1 Flash Lite         | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Gemma 4 26B A4B               | ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen) |
| GPT-5 Nano                    | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| GPT-OSS 20B                   | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Granite 4.2 8B                | ![](https://img.shields.io/badge/FAIL-EXECUTION-red)       |
| Granite 4.2 30B               | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Inkling                       | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| K2 Horizon 0.9B               | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| K2 Horizon 3.7B               | ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen) |
| Mistral Small 4               | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Nemotron 3.5 Lightning        | ![](https://img.shields.io/badge/FAIL-EXECUTION-red)       |
| Nemotron 3.5 Super VL         | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Ornith 1.5 35B A3B            | ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen) |
| Qwen 3 30B A3B                | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Qwen 3 32B                    | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Qwen 3 Coder Next             | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Qwen 3.5 9B                   | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Qwen 3.5 27B                  | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Qwen 3.6 35B A3B              | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Qwen 3.7 Flash                | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Seed 2.0 Mini                 | ![](https://img.shields.io/badge/FAIL-EXECUTION-red)       |
| Solar Pro 4                   | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |

---

## 4B-dense class

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
run_shell_command({"command":"git show --stat $(git log --all --format=%H | head -1) 2>/dev/null | head -30; echo \"---\"; git log --oneline -1 -- README.md"})
run_shell_command({"command":"git branch -a && echo \"---CURRENT---\" && git log --oneline -3"})
run_shell_command({"command":"git log --all --oneline --grep=\"web-search\" -i | head -30"})
run_shell_command({"command":"git branch -a && echo \"---ALL REFS---\" && git show-ref | head -30 && echo \"---REMOTES---\" && git remote -v"})
run_shell_command({"command":"git log --oneline main | wc -l && echo \"---HEAD---\" && git rev-parse HEAD"})
run_shell_command({"command":"git merge-base --is-ancestor 17d9a4a HEAD && echo \"17d9a4a is ancestor of HEAD\" || echo \"17d9a4a NOT ancestor of HEAD\"; git merge-base --is-ancestor e0c0a0d HEAD && echo \"e0c0a0d is ancestor of HEAD\" || echo \"e0c0a0d NOT ancestor of HEAD\""})
run_shell_command({"command":"git log --all --oneline | grep -i \"web-search\\|web_search\\|web search\" | head -30"})
run_shell_command({"command":"git log --oneline --all -- src/tools/web_search* src/tools/webFetch* src/tools/fetch_page_content* 2>/dev/null | head -20"})
run_shell_command({"command":"git log --oneline --diff-filter=D -- src/tools/ | head -20"})
run_shell_command({"command":"git log --oneline --all -- src/tools/ | grep -iE \"remove|delete|drop|revert|reset|simplify\" | head -20"})
run_shell_command({"command":"git show --stat 56c417f | head -40"})
run_shell_command({"command":"git log --oneline --diff-filter=D --all -- src/tools/web-search.tool.ts src/tools/web_search.tool.ts 2>/dev/null | head -10"})
run_shell_command({"command":"git log --all --oneline -- src/tools/index.ts | head -30"})
run_shell_command({"command":"ls node_modules/ | grep -i \"web\\|search\\|puppeteer\\|extract\" || echo \"No web search packages in node_modules\""})
run_shell_command({"command":"cat package.json | grep -i \"web\\|search\" || echo \"No web/search deps in package.json\""})
run_shell_command({"command":"ls src/tools/"})
run_shell_command({"command":"ls -la src/cli.ts && echo \"---\" && git show 7a98e89 --stat | grep -i \"web\\|search\" | head -10"})
run_shell_command({"command":"git show 7a98e89 -- src/tools/index.ts | head -40"})
write_file({"path":"README.md","content":...
read_file({"path":"README.md"})
run_shell_command({"command":"npm run typecheck 2>&1 | tail -5"})
run_shell_command({"command":"npm test 2>&1 | tail -15"})
</pre></details>

**Total tokens:** 24625

**Settings:** reasoning high, temperature 1.0, top_p 0.95

**Observations:**

The agent correctly analyzed the project, identified the missing feature, and traced the Git history until it found the exact commit that removed it.

The updated `README.md`:
- Removes all mentions related to the removed feature. (**Correct**)
- Adds a new "Tools" section. (**Acceptable**)
- Minor adjustments in other sections. (**Acceptable**)

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
run_shell_command({"command":"cd /app/localai && npm run typecheck 2>&1 | tail -10; echo \"---LINT---\"; npm run lint 2>&1 | tail -15"})
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
run_shell_command({"command":"find . -type f -not -path './node_modules/*' -not -path './.git/*' -not -path './.vscode/*' -not -path './.DS_Store' | sort"})
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
run_shell_command({"command":"git log --oneline --all -- README.md | head -20; echo \"---\"; git show --stat HEAD --name-only | head -30; echo \"---\"; git log --all --oneline -- '*CONTRIBUTING*' '*contributing*' | head -10"})
run_shell_command({"command":"node --version; echo \"---\"; npx tsx --version 2>/dev/null | head -2; echo \"---\"; node src/cli.ts --help 2>&1 | head -60"})
run_shell_command({"command":"git show 4e3ccfe -- README.md | head -120; echo \"=====\"; git show 7a98e89 -- README.md | head -120"})
grep_search({"query":"CHROME_PATH|webSearch|web_search|websearch","isRegexp":false})
grep_search({"query":"webSearch|CHROME_PATH|web-search|webSearchSettings","isRegexp":false})
grep_search({"query":"CHROME_PATH|webSearch|web-search|chromePath","isRegexp":true})
run_shell_command({"command":"grep -rn \"CHROME_PATH\\|chromePath\\|webSearch\" src/ docs/ --include=\"*\" | head -40"})
run_shell_command({"command":"grep -rn \"web\" src/ --include=\"*.ts\" -i | head -30; echo \"=====\"; grep -rn \"CHROME\" src/ docs/ -i | head -10"})
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
run_shell_command({"command":"git log -S \"webSearch\" --oneline --all | head; echo \"=====\"; git grep -n \"webSearch\" $(git rev-list --all | head -50) -- src 2>/dev/null | head -20"})
run_shell_command({"command":"git log --oneline --all --diff-filter=D -- src/tools/web-search.tool.ts | head; echo \"=====\"; git log --oneline -20 -- src/tools/index.ts"})
run_shell_command({"command":"git show 7a98e89 --stat | head -60"})
run_shell_command({"command":"git show 7a98e89 -- README.md docs/ollama.md src/utils.ts src/tools/index.ts src/cli.ts src/session.ts src/settings.ts tests/tools.test.ts"})
write_file({"path":"README.md","content":...
read_file({"path":"README.md"})
run_shell_command({"command":"grep -in \"web\\|tavily\\|tubily\\|lawt\\|ollama\" README.md; echo \"GREP_EXIT=$?\"; echo \"=====\"; grep -c '^```' README.md; echo \"=====\"; grep -c '^## ' README.md; echo \"=====\"; grep -c '^- ' README.md"})
read_file({"path":"README.md"})
run_shell_command({"command":"git diff --stat; echo \"=====\"; git status --short"})
</pre></details>

**Total tokens:** 64370

**Settings:** reasoning enabled, temp = 1.0, top-p = 0.95, top-k = 20

**Observations:**

The agent correctly analyzed the project, got suspicious about the missing feature and traced the Git history until it found the exact commit that removed it.

The updated `README.md`:
- Removes all mentions related to the removed feature. (**Correct**)
- Adds a new "Tools" section. (**Acceptable**)
- Minor adjustments in other sections. (**Acceptable**)

---

## 2B-dense & 8B-sparse classes

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

**Settings:** reasoning high, temperature 0.6, top_p 0.95

**Observations:**

The agent did not notice the missing feature, added several new sections to `README.md` and missed the goal.

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
