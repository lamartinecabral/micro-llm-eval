# Evaluating micro LLMs

I use a simple repository-maintenance task to compare autonomous AI agents powered by small LLMs. The focus is on 4B-parameter models running on consumer hardware.

As the evaluation evolved, I noticed that the task was challenging even for larger models such as Qwen 3.6 35B A3B and Granite 4.2 30B.

I also included results from inexpensive cloud models for comparison.

## What this evaluates

The task evaluates whether an agent can inspect an unfamiliar project, treat the implementation as the source of truth, identify documentation that no longer matches it, and make a focused but complete correction. Although the final change is documentation-only, producing it requires repository navigation, evidence selection, consistency checking, and reliable use of editing tools. The observations also record how efficiently and safely the agent reaches the result, while the verdict is based on the final `README.md`.

This matters because much of software maintenance is not greenfield code generation. Agents need to understand existing systems well enough to reconcile related artifacts without preserving stale claims, inventing replacement behavior, or rewriting material that is already correct. A small model that can do this reliably on consumer hardware is more practically useful than one that performs well only on isolated coding prompts.

## The environment

The task uses a TypeScript project from which I removed all code related to a web search feature.

I expect the model to notice that the feature is no longer available and update the documentation accordingly.

It would be interesting to see whether the model takes a shortcut by checking the commit history.

[LAWT](https://github.com/lamartinecabral/lawt) serves as the agent's underlying harness, providing a minimal execution environment with a basic system prompt, tools for file manipulation and shell command execution, and visibility into the model's responses.

The local inference engines are Ollama, oMLX and llama.cpp.

## The prompt

```
analyze the project in the current dir and make `README.md` up to date
```

The reasoning effort is set to "medium".

## Scoring rules

Scores are based on the final `README.md` produced for the run.

- ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)
  - The model noticed the missing feature and updated the README accurately.
- ![](https://img.shields.io/badge/PASS-PARTIAL-yellow)
  - The model noticed the missing feature and updated the README but missed some reference to the removed feature.
- ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)
  - The model completed the run but did not notice the missing feature.
- ![](https://img.shields.io/badge/FAIL-EXECUTION-red)
  - The run was not completed because the model got stuck in a reasoning loop or had to be interrupted after a critical hallucination.

---

## Summary

| Model name                  | Verdict                                                    |
| --------------------------- | ---------------------------------------------------------- |
| Agents A1                   | ![](https://img.shields.io/badge/PASS-INCORRECT-orange)    |
| Agents A1 4B                | ![](https://img.shields.io/badge/PASS-PARTIAL-yellow)      |
| Apriel 1.6 15B Thinker      | ![](https://img.shields.io/badge/PASS-INCORRECT-orange)    |
| Claude Haiku 4.5            | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Deepseek 4.1 Flash          | ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen) |
| Gemini 3.1 Flash Lite       | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Gemini 3.5 Flash Lite       | ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen) |
| Gemma 4 E2B                 | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Gemma 4 E4B                 | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Gemma 4 12B                 | ![](https://img.shields.io/badge/PASS-PARTIAL-yellow)      |
| Gemma 4 26B A4B             | ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen) |
| Gemma 4 31B                 | ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen) |
| GLM 4.7 Flash               | ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen) |
| GLM 5.3 Flash               | ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen) |
| GPT-OSS 20B                 | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| GPT-OSS 120B                | ![](https://img.shields.io/badge/PASS-PARTIAL-yellow)      |
| GPT-5 Mini                  | ![](https://img.shields.io/badge/PASS-PARTIAL-yellow)      |
| GPT-5 Nano                  | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| GPT-5.4 Mini                | ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen) |
| GPT-5.4 Nano                | ![](https://img.shields.io/badge/PASS-PARTIAL-yellow)      |
| GPT-5.6 Luna                | ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen) |
| GPT-6 Luna                  | ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen) |
| Granite 4.2 3B              | ![](https://img.shields.io/badge/FAIL-EXECUTION-red)       |
| Granite 4.2 8B              | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Granite 4.2 30B             | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| HY3                         | ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen) |
| K2 Horizon 0.9B             | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| K2 Horizon 3.7B             | ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen) |
| K2 Horizon 7B               | ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen) |
| K2 Horizon MoVA 36B A4B     | ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen) |
| Laguna XS 2.1               | ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen) |
| LFM 2.5 2.6B                | ![](https://img.shields.io/badge/FAIL-EXECUTION-red)       |
| LFM 2.5 8B A1B              | ![](https://img.shields.io/badge/PASS-INCORRECT-orange)    |
| Ling 3.0 Flash              | ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen) |
| Ling 3.0 Tiny               | ![](https://img.shields.io/badge/PASS-INCORRECT-orange)    |
| Mellum 2 12B A2.5B Thinking | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| MiMo V2.6 Flash             | ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen) |
| MiMo V2.6 Pro               | ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen) |
| Mistral Small 4             | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Muse Glimmer 30B            | ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen) |
| Nemotron 3 Nano 4B          | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Nemotron 3 Nano 30B         | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Nemotron 3 Super            | ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen) |
| Nemotron 3.5 Lightning      | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Nex N2.5 Pro                | ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen) |
| North Mini Code             | ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen) |
| Qwen 3 30B A3B              | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Qwen 3 32B                  | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Qwen 3 Coder Next           | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Qwen 3.5 2B                 | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Qwen 3.5 4B                 | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Qwen 3.5 9B                 | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Qwen 3.5 27B                | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Qwen 3.6 27B                | ![](https://img.shields.io/badge/PASS-PARTIAL-yellow)      |
| Qwen 3.6 35B A3B            | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Qwen 3.7 Flash              | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Qwen 3.8 27B                | ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen) |
| Qwen 3.8 Flash              | ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen) |
| Seed 2.0 Mini               | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| SmolLM 3 3B                 | ![](https://img.shields.io/badge/FAIL-EXECUTION-red)       |
| Solar Pro 4                 | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Spark X2.5 4B               | ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)    |
| Ternary Bonsai 27B          | ![](https://img.shields.io/badge/PASS-PARTIAL-yellow)      |

---

## Ollama: batiai/gemma4-26b:iq4 ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)

<details><summary><b>Tool calls:</b></summary><pre>
list_directory({"path": "."})
read_file({"path": "package.json"})
read_file({"path": "src/cli.ts"})
read_file({"path": "src/run.ts"})
read_file({"path": "src/tools/index.ts"})
read_file({"path": "README.md"})
read_file({"path": "src/tools/file-search.tool.ts"})
list_directory({"path": "src/tools"})
read_file({"path": "src/utils.ts"})
read_file({"path": "src/session.ts"})
read_file({"path": "src/settings.ts"})
read_file({"path": "src/io.ts"})
write_file({"content": ...
</pre></details>

**Observations:**

Before reading `README.md`, it correctly selected the key files and immediately noticed the issue.

It did not read every file, but it read the most important ones.

It used `write_file` to overwrite the README, but the resulting changes were precise.

Efficiency is the highlight.

---

## oMLX: mlx-community/K2-Horizon-7B-oQ6e ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)

<details><summary><b>Tool calls:</b></summary><pre>
list_directory({"path": "."})
read_file({"path": "package.json"})
read_file({"path": "README.md"})
list_directory({"path": "src"})
list_directory({"path": "tests"})
list_directory({"path": "src/tools"})
list_directory({"path": "docs"})
read_file({"path": "src/cli.ts"})
read_file({"path": "src/run.ts"})
read_file({"path": "src/io.ts"})
read_file({"path": "src/tools/index.ts"})
read_file({"path": "src/settings.ts"})
read_file({"path": "src/session.ts"})
read_file({"path": "docs/ollama.md"})
read_file({"path": "src/tools/read-file.tool.ts"})
read_file({"path": "src/utils.ts"})
read_file({"path": "src/tools/write-file.tool.ts"})
read_file({"path": "src/tools/replace-string-in-file.tool.ts"})
read_file({"path": "src/tools/run-shell-command.tool.ts"})
read_file({"path": "src/tools/file-search.tool.ts"})
read_file({"path": "src/tools/grep-search.tool.ts"})
read_file({"path": "src/tools/list-directory.tool.ts"})
grep_search({"query": "webSearch|web_search|fetchPage|searchWeb", "isRegexp": true})
read_file({"path": "src/thinking.ts"})
read_file({"path": "tests/session.test.ts"})
run_shell_command({"command": "grep -rn \"webSearch\\|web_search\\|fetchPageContent\" src/ --include=\"*.ts\" | head -30"})
run_shell_command({"command": "git log --oneline | head -20; echo \"---\"; git status --short | head -20"})
run_shell_command({"command": "git show cca9238 --stat; echo \"===\"; git show cca9238 -- README.md package.json | head -200"})
replace_string_in_file({"path": "README.md", "old_text": ...
replace_string_in_file({"path": "README.md", "old_text": ...
replace_string_in_file({"path": "README.md", "old_text": ...
read_file({"path": "README.md"})
grep_search({"query": "web|search", "isRegexp": true, "includePattern": "README.md"})
</pre></details>

**Observations:**

The agent thoroughly scanned the project and even checked the commit history.

It noticed the issue and made precise adjustments instead of rewriting the entire file.

It also used the `replace_string_in_file` tool correctly. Small models often struggle with this tool or avoid it entirely.

---

## llama.cpp: IFM/K2-Horizon-3.7B-GGUF:Q4_K_M ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)

<details><summary><b>Tool calls:</b></summary><pre>
list_directory({"path":"."})
run_shell_command({"command":"pwd && ls -la"})
read_file({"path":"package.json"})
read_file({"path":"README.md"})
run_shell_command({"command":"find src tests docs -type f | head -100"})
read_file({"path":"src/cli.ts"})
read_file({"path":"src/settings.ts"})
read_file({"path":"src/session.ts"})
read_file({"path":"src/run.ts"})
read_file({"path":"src/utils.ts"})
read_file({"path":"src/io.ts"})
read_file({"path":"src/thinking.ts"})
read_file({"path":"src/tools/index.ts"})
read_file({"path":"src/tools/utils.ts"})
read_file({"path":"docs/ollama.md"})
read_file({"path":"src/tools/run-shell-command.tool.ts"})
read_file({"path":"src/tools/list-directory.tool.ts"})
read_file({"path":"src/tools/read-file.tool.ts"})
read_file({"path":"src/tools/write-file.tool.ts"})
read_file({"path":"src/tools/file-search.tool.ts"})
read_file({"path":"src/tools/grep-search.tool.ts"})
read_file({"path":"src/tools/replace-string-in-file.tool.ts"})
read_file({"path":"tests/settings.test.ts"})
read_file({"path":"tests/tools.test.ts"})
read_file({"path":"tests/helpers.test.ts"})
read_file({"path":"tests/session.test.ts"})
run_shell_command({"command":"git log --oneline -15 && echo \"---STATUS---\" && git status"})
run_shell_command({"command":"git diff HEAD --stat"})
run_shell_command({"command":"git show cca9238 --stat"})
run_shell_command({"command":"git show cca9238 -- README.md package.json | head -120"})
run_shell_command({"command":"git show cca9238 -- README.md package.json src/tools/index.ts src/utils.ts tests/tools.test.ts"})
run_shell_command({"command":"grep -rn \"webSearch\\|web_search\\|fetch_page\\|web search\" src/ README.md package.json docs/ 2>/dev/null; echo \"---\"; grep -n \"web\" README.md"})
replace_string_in_file({"path":"README.md","old_text":...
replace_string_in_file({"path":"README.md","old_text":...
replace_string_in_file({"path":"README.md","old_text":...
read_file({"path":"README.md"})
run_shell_command({"command":"grep -in \"web\\|search\" README.md"})
run_shell_command({"command":"git diff README.md"})
</pre></details>

**Observations:**

The model requires reasoning effort `high` to work properly.

The agent thoroughly scanned the project and even checked the commit history.

It noticed the issue and made precise adjustments instead of rewriting the entire file.

It also used the `replace_string_in_file` tool correctly. Small models often struggle with this tool or avoid it entirely.

---

## Ollama: batiai/qwen3.8-27b:iq3 ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)

<details><summary><b>Tool calls:</b></summary><pre>
list_directory({"path":"."})
read_file({"path":"README.md"})
read_file({"path":"package.json"})
list_directory({"path":"src"})
list_directory({"path":"tests"})
list_directory({"path":"docs"})
read_file({"path":"src/cli.ts"})
read_file({"path":"src/run.ts"})
read_file({"path":"src/session.ts"})
read_file({"path":"src/settings.ts"})
read_file({"path":"src/io.ts"})
read_file({"path":"src/thinking.ts"})
read_file({"path":"src/utils.ts"})
list_directory({"path":"src/tools"})
read_file({"path":"src/tools/index.ts"})
read_file({"path":"docs/ollama.md"})
grep_search({"query":"webSearch|web-search|tavily|web_search|webSearch|chrome|chromePath|search the web|fetch web"})
run_shell_command({"command":"cd /Users/pipiwu/aiwork/mindpal/.claude/projects/-Users-pipiwu-aiwork-mainmindpal/m...
run_shell_command({"command":"cd \"$(pwd)\" 2\u003e/dev/null; pwd; echo \"---\"; grep -rn \"web\\|Web\\|tavily\\|...
run_shell_command({"command":"grep -rn \"web\\|Web\\|tavily\\|Tavily\\|chrome\\|browser\\|fetch\" src/ tests/ doc...
read_file({"path":"src/tools/file-search.tool.ts","start_line":1,"end_line":40})
run_shell_command({"command":"cd \"$(pwd)\" 2\u003e/dev/null; git log --oneline -15 2\u003e/dev/null; echo \"=== ...
run_shell_command({"command":"cd \"$(pwd)\" 2\u003e/dev/null; git show d50a3c6 --stat 2\u003e/dev/null; echo \"==...
run_shell_command({"command":"cd \"$(pwd)\" 2\u003e/dev/null; grep -rn \"web\\|search the\\|web-search\\|tavily\\|fetch\" README.md"})
replace_string_in_file({"path":"README.md","old_text":...
replace_string_in_file({"path":"README.md","old_text":...
replace_string_in_file({"path":"README.md","old_text":...
</pre></details>

**Observations:**

This model runs very slowly on my machine, but I really wanted to see how it would perform with 3-bit quantization.

The agent thoroughly scanned the project and even checked the commit history.

It noticed the missing feature and made precise adjustments to `README.md` instead of rewriting the entire file.

The only issue was a hallucinated working directory in a Bash command, but overall, the output was flawless.

---

## Ollama: north-mini-code-1.0:q4_K_M ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)

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

## Ollama: gemma4:12b-it-qat ![](https://img.shields.io/badge/PASS-PARTIAL-yellow)

<details><summary><b>Tool calls:</b></summary><pre>
list_directory({"path":"."})
read_file({"path":"package.json"})
list_directory({"path":"src"})
list_directory({"path":"src/tools"})
read_file({"path":"src/cli.ts"})
read_file({"path":"README.md"})
list_directory({"path":"docs"})
read_file({"path":"docs/ollama.md"})
write_file({"content":...
</pre></details>

**Observations:**

It mostly corrected `README.md`, but did not remove every reference to web search.

---

## Ollama: hf.co/InternScience/Agents-A1-4B-Q8_0-GGUF:Q8_0 ![](https://img.shields.io/badge/PASS-PARTIAL-yellow)

<details><summary><b>Tool calls:</b></summary><pre>
list_directory({"path":"."})
read_file({"path":"package.json"})
read_file({"path":"README.md"})
list_directory({"path":"src"})
read_file({"path":"src/cli.ts"})
read_file({"path":"src/run.ts"})
read_file({"path":"src/io.ts"})
list_directory({"path":"src/tools"})
read_file({"path":"src/session.ts"})
read_file({"path":"src/settings.ts"})
read_file({"path":"src/tools/index.ts"})
read_file({"path":"src/utils.ts"})
read_file({"path":"src/thinking.ts"})
read_file({"path":"."})
list_directory({"path":"docs"})
read_file({"path":"src/tools/file-search.tool.ts"})
read_file({"path":"src/tools/grep-search.tool.ts"})
read_file({"path":"src/tools/list-directory.tool.ts"})
list_directory({"path":"tests"})
run_shell_command({"command":"find . -name \"*.md\" -type f"})
read_file({"path":"src/tools/read-file.tool.ts"})
read_file({"path":"src/tools/write-file.tool.ts"})
read_file({"path":"src/tools/replace-string-in-file.tool.ts"})
read_file({"path":"src/tools/run-shell-command.tool.ts"})
read_file({"path":"tests/helpers.test.ts"})
read_file({"path":"tests/session.test.ts"})
read_file({"path":"tests/settings.test.ts"})
read_file({"path":"tests/tools.test.ts"})
read_file({"path":"docs/ollama.md"})
write_file({"path":"README.md","content":...
read_file({"path":"src/utils.ts"})
run_shell_command({"command":"find . -name \"provider.ts\" ...
</pre></details>

**Observations:**

It mostly corrected `README.md`, but did not remove every reference to web search.

---

## Ollama: hf.co/InternScience/Agents-A1-Q4_K_M-GGUF:Q4_K_M ![](https://img.shields.io/badge/PASS-INCORRECT-orange)

<details><summary><b>Tool calls:</b></summary><pre>
list_directory({"path":"."})
read_file({"path":"README.md"})
read_file({"path":"package.json"})
list_directory({"path":"src"})
list_directory({"path":"tests"})
list_directory({"path":"docs"})
read_file({"path":"cli.ts"})
read_file({"path":"io.ts"})
read_file({"path":"tools/test"})
list_directory({"path":"./src"})
list_directory({"path":"./tests"})
list_directory({"path":"./docs"})
read_file({"path":"./src/cli.ts"})
read_file({"path":"./src/io.ts"})
read_file({"path":"./src/tools/"})
list_directory({"path":"./src/tools"})
read_file({"path":"./src/tools/index.ts"})
read_file({"path":"./src/tools/file-search.tool.ts"})
read_file({"path":"./src/tools/grep-search.tool.ts"})
read_file({"path":"./README.md"})
read_file({"path":"./src/run.ts"})
read_file({"path":"./src/thinking.ts"})
read_file({"path":"./src/tools/list-directory.tool.ts"})
read_file({"path":"./src/tools/read-file.tool.ts"})
read_file({"path":"./src/tools/write-file.tool.ts"})
read_file({"path":"./src/tools/replace-string-in-file.tool.ts"})
replace_string_in_file({"path":"./README.md","old_text":...
read_file({"path":"./README.md"})
</pre></details>

**Observations:**

Interestingly, it performed worse than its little brother. Was it the quantization? Was it random? Only God knows.

Anyway, it acted just like the other Qwen-based models I tested. This model is based on Qwen 3.5 35B-A3B, and fine-tuning doesn't seem to make much of a difference in this test.

It scanned the files correctly but did not notice the issue.

It completely rewrote `README.md` and missed the goal.

---

## Ollama: batiai/gemma4-26b:iq3 ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)

<details><summary><b>Tool calls:</b></summary><pre>
list_directory({"path":"."})
read_file({"path":"package.json","start_line":1})
read_file({"path":"README.md","start_line":1})
list_directory({"path":"src"})
list_directory({"path":"src/tools"})
read_file({"path":"src/cli.ts","start_line":1})
list_directory({"path":"docs"})
read_file({"path":"docs/ollama.md","start_line":1})
write_file({"content":"...
write_file({"content":"...
</pre></details>

**Observations:**

It was interesting to see a 3-bit quantized model in action.

It was able to maintain coherence throughout the run; the only issue was a duplicated tool call at the end.

It scanned the files correctly but did not notice the missing feature.

It completely rewrote `README.md` and missed the goal.

---

## Ollama: hf.co/mradermacher/GLM-4.7-Flash-i1-GGUF:IQ3_M ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)

<details><summary><b>Tool calls:</b></summary><pre>
Since this run was just an extra Q3 run I decided to not include the tool calls log.
</pre></details>

**Observations:**

Another 3-bit quantized model in action. It made it to the end but did not notice the missing feature. 

It completely rewrote `README.md` and missed the goal.

---

## Ollama: gemma4:e4b-it-qat ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)

<details><summary><b>Tool calls:</b></summary><pre>
list_directory({"path":"."})
read_file({"path":"package.json"})
read_file({"path":"README.md"})
write_file({"content":...
write_file({"path":"README.md", "content":...
</pre></details>

**Observations:**

It only read `README.md` and `package.json`, then rewrote `README.md` and missed the goal.

---

## Ollama: gemma4:e2b-it-qat ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)

<details><summary><b>Tool calls:</b></summary><pre>
list_directory({"path":"."})
read_file({"end_line":500,"path":"README.md","start_line":1})
list_directory({"path":"src/"})
list_directory({"path":"tests/"})
write_file({"content":...
</pre></details>

**Observations:**

It only read `README.md` and listed some files, then rewrote `README.md` and missed the goal.

---

## Ollama: qwen3.5:9b-q8_0 ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)

<details><summary><b>Tool calls:</b></summary><pre>
list_directory({"path":"."})
read_file({"path":"README.md"})
read_file({"path":"package.json"})
list_directory({"path":"src"})
list_directory({"path":"docs"})
read_file({"path":"src/cli.ts"})
read_file({"path":"docs/ollama.md"})
list_directory({"path":"tools"})
list_directory({"path":"src/tools"})
read_file({"path":"src/tools/index.ts"})
read_file({"path":"src/session.ts"})
read_file({"path":"tsconfig.json"})
read_file({"path":"src/settings.ts"})
read_file({"path":"src/utils.ts"})
list_directory({"path":"tests"})
read_file({"path":"src/tools/file-search.tool.ts"})
read_file({"path":"src/tools/write-file.tool.ts"})
read_file({"path":"src/run.ts"})
read_file({"path":"LICENSE"})
list_directory({"path":"tests"})
write_file({"path":"README.md","content":...
read_file({"path":"README.md"})
</pre></details>
  
**Observations:**

It scanned the files correctly but did not notice the issue.

It completely rewrote `README.md` and missed the goal.

---

## Ollama: qwen3.5:4b ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)

<details><summary><b>Tool calls:</b></summary><pre>
list_directory({"path":"."})
read_file({"path":"README.md"})
read_file({"path":"package.json"})
list_directory({"path":"src"})
list_directory({"path":"docs"})
read_file({"path":"src/cli.ts"})
read_file({"path":"src/run.ts"})
read_file({"path":"package-lock.json","start_line":1,"end_line":50})
list_directory({"path":"src/tools"})
read_file({"path":"package-lock.json","start_line":50,"end_line":100})
read_file({"path":"docs/ollama.md"})
run_shell_command({"command":"cat .gitignore"})
read_file({"path":"tsconfig.json"})
list_directory({"path":"src/tools"})
read_file({"path":"src/tools/index.ts"})
grep_search({"isRegexp":true,"query":"CHANGELOG|changelog|VERSION|version.*update|updated"})
read_file({"path":"src/settings.ts"})
list_directory({"path":"tests"})
write_file({"content":...
</pre></details>

**Observations:**

It scanned the files correctly but did not notice the issue.

It completely rewrote `README.md` and missed the goal.

---

## Ollama: qwen3.5:2b ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)

<details><summary><b>Tool calls:</b></summary><pre>
list_directory({"path":""})
read_file({"path":"README.md"})
read_file({"path":"package.json"})
list_directory({"path":"src/"})
grep_search({"query":"AGENTS","isRegexp":true})
read_file({"path":"src/cli.ts"})
read_file({"path":"src/session.ts"})
read_file({"path":"src/utils.ts"})
read_file({"path":"src/run.ts"})
read_file({"path":"/src/settings.ts"})
read_file({"path":"settings.ts"})
grep_search({"query":"settings.ts","includePattern":"src/**/settings.ts","maxResults":1})
run_shell_command({"command":"find . -name \"settings.ts\" 2\u003e/dev/null"})
run_shell_command({"command":"cat src/settings.ts 2\u003e/dev/null || echo \"File not found\""})
run_shell_command({"command":"cat src/run.ts 2\u003e/dev/null | head -100"})
run_shell_command({"command":"cat src/io.ts 2\u003e/dev/null | head -150"})
run_shell_command({"command":"ls -la src/tools/"})
run_shell_command({"command":"cat src/tools/index.ts 2\u003e/dev/null"})
run_shell_command({"command":"find . -name \"AGENTS*\" -o -name \".localai/*\" ...
run_shell_command({"command":"ls -la /.localai 2\u003e/dev/null || echo \"Directory ...
run_shell_command({"command":"cat node_modules/@types/node/package.json | grep -A5 ...
write_file({"path":"README.md","content":...
grep_search({"query":"# localai$|\\#.*feature$|\\#.*setup$|\\#.*install$|## ...
run_shell_command({"command":"ls -la src/bin/ 2\u003e/dev/null \u0026\u0026 head ...
run_shell_command({"command":"find . -name \"*localai*\" 2\u003e/dev/null | grep ...
read_file({"path":"package.json"})
run_shell_command({"command":"cat README.md"})
read_file({"path":"README.md","start_line":30})
</pre></details>

**Observations:**

The model struggled to use the tools correctly, then gave up and relied only on the shell tool.

It scanned the files correctly but did not notice the issue.

It completely rewrote `README.md` and missed the goal.

---

## oMLX: SirSahOl/K2-Horizon-0.9B-chat-mlx-8bit ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)

<details><summary><b>Tool calls:</b></summary><pre>
list_directory({"path": "."})
read_file({"path": "README.md"})
read_file({"path": "package.json"})
read_file({"path": "tsconfig.json"})
read_file({"path": "biome.json"})
read_file({"path": "AGENTS.md"})
read_file({"path": "docs/ollama.md"})
list_directory({"path": "src"})
read_file({"path": "tests"})
list_directory({"path": "tests"})
read_file({"path": "src/cli.ts"})
read_file({"path": "src/settings.ts"})
read_file({"path": "src/io.ts"})
read_file({"path": "src/session.ts"})
file_search({"query": "AGENTS.md"})
write_file({"path": "README.md", "content": ...
file_search({"query": "AGENTS.md", "includePattern": "*.md"})
web_search({"query": "AGENTS.md"})
write_file({"path": "README.md", "content": ...
read_file({"path": "README.md"})
write_file({"path": "README.md", "content": ...
write_file({"path": "README.md", "content": ...
write_file({"path": "README.md", "content": ...
</pre></details>

**Observations:**

A 0.9B model's ability to maintain coherence during a long agent session is impressive.

However, it did not scan the project correctly and missed the goal.

---

## Ollama: nemotron-3-nano:4b ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)

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

## Ollama: hf.co/JetBrains/Mellum2-12B-A2.5B-Thinking-GGUF-Q4_K_M:Q4_K_M ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)

<details><summary><b>Tool calls:</b></summary><pre>
list_directory({"path":"."})
read_file({"path":"package.json","start_line":1,"end_line":100})
read_file({"start_line":1,"end_line":100,"path":"README.md"})
</pre></details>

**Observations:**

The model read only `package.json` and `README.md`, then decided that everything was up to date.

---

## Ollama: hf.co/inclusionAI/Ling-3.0-tiny-GGUF:Q8_0 ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)

<details><summary><b>Tool calls:</b></summary><pre>
list_directory({"path":"."})
read_file({"path":"README.md"})
read_file({"path":"package.json"})
read_file({"path":"tsconfig.json"})
read_file({"path":"biome.json"})
read_file({"path":"LICENSE"})
read_file({"path":".gitignore"})
read_file({"path":"src/index.ts"})
list_directory({"path":"src"})
list_directory({"path":"docs"})
list_directory({"path":"tests"})
file_search({"query":"*.md"})
read_file({"path":"src/cli.ts"})
read_file({"path":"src/tools.ts"})
read_file({"path":"src/session.ts"})
read_file({"path":"src/settings.ts"})
read_file({"path":"src/thinking.ts"})
read_file({"path":"src/io.ts"})
read_file({"path":"src/run.ts"})
read_file({"path":"src/utils.ts"})
read_file({"path":"docs/ollama.md"})
read_file({"path":"tests/helpers.test.ts"})
read_file({"path":"tests/session.test.ts"})
read_file({"path":"tests/settings.test.ts"})
read_file({"path":"tests/tools.test.ts"})
list_directory({"path":"src/tools"})
read_file({"path":"src/tools/index.ts"})
read_file({"path":"docs/ollama.md"})
write_file({"path":"README.md","content":...
read_file({"path":"README.md"})
</pre></details>

**Observations:**

It made adjustments to `README.md` but did not notice that web search had been removed.

---

## Ollama: hf.co/XHToken/Spark-X2.5-4B-GGUF:Q8_0 ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)

<details><summary><b>Tool calls:</b></summary><pre>
list_directory({"path":"."})
read_file({"path":"package.json"})
read_file({"path":"README.md"})
list_directory({"path":"src"})
list_directory({"path":"tests"})
list_directory({"path":"docs"})
read_file({"path":"tsconfig.json"})
read_file({"path":"biome.json"})
read_file({"path":"src/cli.ts"})
read_file({"path":"src/io.ts"})
read_file({"path":"src/run.ts"})
read_file({"path":"src/session.ts"})
read_file({"path":"src/settings.ts"})
read_file({"path":"src/tools"})
read_file({"path":"src/thinking"})
read_file({"path":"src/utils"})
read_file({"path":"docs/ollama.md"})
list_directory({"path":"src/tools"})
list_directory({"path":"src"})
read_file({"path":"src/utils.ts"})
read_file({"path":"src/tools/index.ts"})
read_file({"path":"src/tools/utils.ts"})
read_file({"path":"src/thinking.ts"})
read_file({"path":"LICENSE"})
read_file({"path":".gitignore"})
read_file({"path":"tests/tools.test.ts"})
read_file({"path":"tests/helpers.test.ts"})
read_file({"path":"tests/session.test.ts"})
read_file({"path":"tests/settings.test.ts"})
write_file({"path":"README.md","content":...
read_file({"path":"README.md"})
</pre></details>

**Observations:**

It scanned the files correctly but did not notice the issue.

It completely rewrote `README.md`, added duplicate sections, and missed the goal.

---

## Ollama: hf.co/LiquidAI/LFM2.5-8B-A1B-GGUF:Q8_0 ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)

<details><summary><b>Tool calls:</b></summary><pre>
list_directory({"path":"."})
read_file({"path":"README.md","start_line":1,"end_line":100})
read_file({"path":"package.json","start_line":1,"end_line":50})
list_directory({"path":"src"})
read_file({"path":"src/cli.ts","start_line":1,"end_line":100})
read_file({"path":"settings.ts","start_line":1,"end_line":100})
read_file({"path":"src/settings.ts","start_line":1,"end_line":100})
read_file({"path":"src/settings.ts","start_line":1,"end_line":100})
replace_string_in_file({"path":"README.md","old_text":...
</pre></details>

**Observations:**

It made it to the end, but every step was incorrect.

It did not read the important files. It used the tools incorrectly. The `README.md` adjustment added duplicated sections.

---

## Ollama: hf.co/LiquidAI/LFM2.5-2.6B-GGUF:Q8_0 ![](https://img.shields.io/badge/FAIL-EXECUTION-red)

**Observations:**

I had to interrupt the agent because it became confused about tool use, repeatedly calling `read_file` instead of using a tool to update the file.

---

## Ollama: granite4.2:3b ![](https://img.shields.io/badge/FAIL-EXECUTION-red)

**Observations:**

I had to interrupt the agent because it began hallucinating and looping in its reasoning about a nonexistent typo.

---

## Ollama: hf.co/ggml-org/SmolLM3-3B-GGUF:Q8_0 ![](https://img.shields.io/badge/FAIL-EXECUTION-red)

**Observations:**

I had to interrupt the agent because it began hallucinating about a Python project before making any tool calls.

---

## Ollama: hf.co/mradermacher/North-Mini-Code-1.0-i1-GGUF:IQ3_M ![](https://img.shields.io/badge/FAIL-EXECUTION-red)

**Observations:**

I had to interrupt the agent because it became confused about tool use, repeatedly calling `read_file` instead of using a tool to update the file.

---

## Ollama: hf.co/mradermacher/Laguna-XS-2.1-i1-GGUF:IQ3_XXS ![](https://img.shields.io/badge/FAIL-EXECUTION-red)

**Observations:**

In the end, when the agent was about to make the update tool call, it stopped.

I tried to interact to make it complete the task but it simply could not make final tool call.

---

## Ollama: hf.co/unsloth/Qwen3.8-27B-GGUF:UD-Q2_K_XL ![](https://img.shields.io/badge/FAIL-EXECUTION-red)

**Observations:**

After a very long session where the model analyzed the project correctly, it suddenly stopped.

This model succeded with 3-bit quantization, but apparently 2-bit is too much.

---

## Ollama: ServiceNow-AI/Apriel-1.6-15b-Thinker:Q4_K_M ![](https://img.shields.io/badge/FAIL-EXECUTION-red)

**Observations:**

The agent only read `README.md` and `package.json`, spent thousands of tokens in reasoning, and in the end, when it was about to call the update tool, it stopped.

---

## Cheap cloud models

### [Hugging Face's Inference Providers](https://huggingface.co/docs/inference-providers)

- **IFM/K2-Horizon-7B:featherless-ai** ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)
- **IFM/K2-Horizon-3.7B:featherless-ai** ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)
- **IFM/K2-Horizon-MoVA-36B-A4B:featherless-ai** ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)
- **meta-models/Muse-Glimmer-30B** ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)
- **Qwen/Qwen3.8-27B** ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)
- **zai-org/GLM-4.7-Flash** ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)
- **InternScience/Agents-A1-4B:featherless-ai** ![](https://img.shields.io/badge/PASS-PARTIAL-yellow)
  - It mostly corrected `README.md`, but did not remove every reference to web search.
- **prism-ml/Ternary-Bonsai-27B-gguf** ![](https://img.shields.io/badge/PASS-PARTIAL-yellow)
  - It mostly corrected `README.md`, but did not remove every reference to web search.
- **prism-ml/Ternary-Bonsai-27B-AWQ-4bit** ![](https://img.shields.io/badge/PASS-PARTIAL-yellow)
  - It mostly corrected `README.md`, but did not remove every reference to web search.
- **ibm-granite/granite-4.2-8b** ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)
  - It read only `README.md` and `package.json`, then made adjustments to `README.md`.
- **ibm-granite/granite-4.2-30b** ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)
  - It made adjustments to `README.md` but did not notice that web search had been removed.
- **Qwen/Qwen3.5-9B** ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)
  - It rewrote `README.md` without removing the references to web search.
- **Qwen/Qwen3.6-35B-A3B** ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)
  - It rewrote `README.md` without removing the references to web search.

### [Ollama's cloud](https://docs.ollama.com/cloud)

- **nemotron-3-super** ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)
- **gpt-oss:120b** ![](https://img.shields.io/badge/PASS-PARTIAL-yellow)
  - It mostly corrected `README.md`, but did not remove every reference to web search.
- **gpt-oss:20b** ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)
  - It rewrote `README.md` without removing the references to web search.
- **nemotron-3-nano:30b** ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)
  - It rewrote `README.md` without removing the references to web search.

### [Openrouter](https://openrouter.ai/)

- **deepseek/deepseek-v4.1-flash** ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)
- **google/gemini-3.5-flash-lite** ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)
- **google/gemma-4-26b-a4b-it** ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)
- **google/gemma-4-31b-it** ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)
- **inclusionai/ling-3.0-flash** ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)
- **nex-agi/nex-n2.5-pro** ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)
- **openai/gpt-5.4-mini** ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)
- **openai/gpt-5.6-luna** ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)
- **openai/gpt-6-luna** ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)
- **poolside/laguna-xs-2.1** ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)
- **qwen/qwen3.8-flash** ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)
- **tencent/hy3** ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)
- **xiaomi/mimo-v2.6-flash** ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)
- **xiaomi/mimo-v2.6-pro** ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)
- **z-ai/glm-5.3-flash** ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)
- **openai/gpt-5-mini** ![](https://img.shields.io/badge/PASS-PARTIAL-yellow)
  - It mostly corrected `README.md`, but did not remove every reference to web search.
- **openai/gpt-5.4-nano** ![](https://img.shields.io/badge/PASS-PARTIAL-yellow)
  - It mostly corrected `README.md`, but did not remove every reference to web search.
- **qwen/qwen3.6-27b** ![](https://img.shields.io/badge/PASS-PARTIAL-yellow)
  - It mostly corrected `README.md`, but did not remove every reference to web search.
- **anthropic/claude-haiku-4.5** ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)
  - It did notice the missing feature but the updated `README.md` had no fix about it.
- **bytedance-seed/seed-2.0-mini** ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)
  - It did not scanned the project correctly, made minor adjustments to `README.md` and missed the goal.
- **google/gemini-3.1-flash-lite** ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)
  - It struggled to use the tools correctly and made adjustments to `README.md` without noticing the missing feature.
- **mistralai/mistral-small-2603** ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)
  - It rewrote `README.md` without removing the references to web search.
- **nvidia/nemotron-3.5-lightning** ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)
  - It only tried to format `README.md`.
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
- **upstage/solar-pro4** ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)
  - It made adjustments to `README.md` but did not notice that web search had been removed.
