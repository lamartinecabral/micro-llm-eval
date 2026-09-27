# Evaluating micro LLMs

I prepared a simple task for autonomous AI agents to evaluate the capabilities of small LLMs.

The focus is on 4B-parameter models running on consumer hardware.

As the evaluation evolved, I noticed that the task was challenging even for larger models such as Qwen 3.6 35B A3B and Granite 4.2 30B.

I also included results from inexpensive cloud models for comparison.

### The environment

The task uses a TypeScript project from which I removed all code related to a web search feature.

I expect the model to notice that the feature is no longer available and update the documentation accordingly.

It would be interesting to see whether the model takes a shortcut by checking the commit history.

[LAWT](https://github.com/lamartinecabral/lawt) serves as the agent's underlying harness, providing a minimal execution environment with a basic system prompt, tools for file manipulation and shell command execution, and visibility into the model's responses.

The local inference engines are Ollama and oMLX.

### The prompt

```
analyze the project in the current dir and make `README.md` up to date
```

The reasoning effort is set to "medium".

### Scoring rules

Scores are based on the final `README.md` produced for the run.

- ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)
  - The model noticed the missing feature and updated the README accurately.
- ![](https://img.shields.io/badge/PASS-PARTIAL-yellow)
  - The model noticed the missing feature and updated the README but missed a reference to the removed feature.
- ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)
  - The model completed the run but did not notice the missing feature.
- ![](https://img.shields.io/badge/FAIL-EXECUTION-red)
  - The run was not completed because the model got stuck in a reasoning loop or had to be interrupted after a critical hallucination.

---

## ollama: batiai/gemma4-26b:iq4 ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)

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

## oMLX: mlx-community/K2-Horizon-7B-Uno-oQ6e (oMLX v0.7.0.dev4) ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)

<details><summary><b>Tool calls:</b></summary><pre>
list_directory({"path": "."})
read_file({"file_path": "README.md"})
read_file({"file_path": "package.json"})
list_directory({"path": "src"})
list_directory({"file_path": "docs"})
list_directory({"file_path": "tests"})
list_directory({"path": "docs"})
list_directory({"path": "tests"})
list_directory({"path": "src/tools"})
read_file({"file_path": ... it was 24 read_file calls in a row
run_shell_command({"command": "git log --oneline -10 && cat .vsco...
run_shell_command({"command": "git show 0fff37f --stat && git sho...
run_shell_command({"command": "git show 0fff37f -- src/utils.ts s...
read_file({"file_path": "LICENSE"})
grep_search({"query": "web search|web-search|fetch|tavily|ollama ...
replace_string_in_file({"file_path": "README.md", "old_text": ...
replace_string_in_file({"file_path": "README.md", "new_text": ...
replace_string_in_file({"file_path": "README.md", "new_text": ...
read_file({"file_path": "README.md"})
</pre></details>

**Observations:**

The agent thoroughly scanned the project and even checked the commit history.

It noticed the issue and made precise adjustments instead of rewriting the entire file.

It also used the `replace_string_in_file` tool correctly. Small models often struggle with this tool or avoid it entirely.

The only drawback was efficiency: it did too much work for such a simple task.

---

## oMLX: DreamFoundries/K2-Horizon-3.7B-MLX-8bit ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)

<details><summary><b>Tool calls:</b></summary><pre>
Since the run was very similiar to the one with the 7B version, I decided to not include the log of tool calls.
</pre></details>

**Observations:**

The agent thoroughly scanned the project and even checked the commit history.

It noticed the issue and made precise adjustments instead of rewriting the entire file.

It also used the `replace_string_in_file` tool correctly. Small models often struggle with this tool or avoid it entirely.

The only drawback was efficiency: it did too much work for such a simple task.

---

## ollama: gemma4:12b-it-qat ![](https://img.shields.io/badge/PASS-PARTIAL-yellow)

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

## ollama: hf.co/InternScience/Agents-A1-4B-Q8_0-GGUF:Q8_0 ![](https://img.shields.io/badge/PASS-PARTIAL-yellow)

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

## ollama: gemma4:e4b-it-qat ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)

<details><summary><b>Tool calls:</b></summary><pre>
list_directory({"path":"./"})
list_directory({"path":"src"})
list_directory({"path":"src/tools"})
read_file({"file_path":"README.md","start_line":1})
read_file({"file_path":"package.json","start_line":1})
write_file({"content":...
</pre></details>

**Observations:**

It scanned the files correctly but did not notice the issue.

It made minor adjustments to `README.md` but missed the goal.

---

## ollama: gemma4:e2b-it-qat ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)

<details><summary><b>Tool calls:</b></summary><pre>
list_directory({"path":"."})
read_file({"end_line":100,"file_path":"README.md","start_line":1})
write_file({"content":"...
</pre></details>

**Observations:**

It read `README.md`, then completely rewrote it and missed the goal entirely.

---

## ollama: qwen3.5:4b ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)

<details><summary><b>Tool calls:</b></summary><pre>
list_directory({"path":"."})
read_file({"file_path":"package.json"})
read_file({"file_path":"README.md"})
list_directory({"path":"docs"})
file_search({"query":"src/**/*.{ts,json}"})
read_file({"file_path":"docs/ollama.md"})
read_file({"file_path":"src/cli.ts"})
read_file({"file_path":"CONTRIBUTING.md"})
list_directory({"path":"tests"})
grep_search({"query":"AGENTS\\.md","isRegep":"false"})
search({"query":"**/AGENTS.md"})
list_directory({"path":"src/tools"})
read_file({"file_path":"src/session.ts"})
read_file({"file_path":"src/tools/index.ts"})
read_file({"file_path":"src/run.ts"})
read_file({"file_path":"biome.json"})
list_directory({"path":"tests"})
write_file({"file_path":"README.md","content":...
read_file({"file_path":"README.md"})
</pre></details>

**Observations:**

It scanned the files correctly but did not notice the issue.

It completely rewrote `README.md` and missed the goal.

---

## ollama: qwen3.5:2b ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)

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

## ollama: nemotron-3-nano:4b ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)

<details><summary><b>Tool calls:</b></summary><pre>
list_directory({"path":"."})
file_search({"query":"src/**/*.js"})
list_directory({"path":"src"})
read_file({"file_Path":"package.json","start_Line":"1","end_Line":"10"})
read_file({"file_path":"package.json","start_line":1,"end_line":10})
read_file({"file_path":"src/cli.ts","start_line":1,"end_line":20})
write_file({"file_path":"README.md","content":...
</pre></details>

**Observations:**

It read only part of `package.json` and `src/cli.ts`, then completely rewrote `README.md` and missed the goal.

---

## ollama: hf.co/JetBrains/Mellum2-12B-A2.5B-Thinking-GGUF-Q4_K_M:Q4_K_M ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)

<details><summary><b>Tool calls:</b></summary><pre>
list_directory({"path":"."})
read_file({"path":"package.json","start_line":1,"end_line":100})
read_file({"start_line":1,"end_line":100,"path":"README.md"})
</pre></details>

**Observations:**

The model read only `package.json` and `README.md`, then decided that everything was up to date.

---

## ollama: hf.co/XHToken/Spark-X2.5-4B-GGUF:Q8_0 ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)

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

## ollama: granite4.2:3b ![](https://img.shields.io/badge/FAIL-EXECUTION-red)

**Observations:**

I had to interrupt the agent because it began hallucinating and looping in its reasoning about a nonexistent typo.

---

## ollama: hf.co/ggml-org/SmolLM3-3B-GGUF:Q8_0 ![](https://img.shields.io/badge/FAIL-EXECUTION-red)

**Observations:**

I had to interrupt the agent because it began hallucinating about a Python project before making any tool calls.

---

## ollama: hf.co/LiquidAI/LFM2.5-2.6B-GGUF:Q8_0 ![](https://img.shields.io/badge/FAIL-EXECUTION-red)

**Observations:**

I had to interrupt the agent because it became confused about tool use, repeatedly calling `read_file` instead of using a tool to update the file.

---

## Cheap cloud models

### [Hugging Face's Inference Providers](https://huggingface.co/docs/inference-providers)

- **IFM/K2-Horizon-7B:featherless-ai** ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)
- **IFM/K2-Horizon-3.7B:featherless-ai** ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)
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
- **nemotron-3-nano:30b** ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)
  - It rewrote `README.md` without removing the references to web search.

### [Openrouter](https://openrouter.ai/)

- **google/gemma-4-26b-a4b-it** ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)
- **google/gemma-4-31b-it** ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)
- **inclusionai/ling-3.0-flash** ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)
- **nex-agi/nex-n2.5-pro** ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)
- **poolside/laguna-xs-2.1** ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)
- **qwen/qwen3.8-flash** ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)
- **tencent/hy3** ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)
- **xiaomi/mimo-v2.6-pro** ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)
- **z-ai/glm-5.3-flash** ![](https://img.shields.io/badge/PASS-CORRECT-brightgreen)
- **nvidia/nemotron-3.5-lightning** ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)
  - It only tried to format `README.md`.
- **qwen/qwen3.6-35b-a3b** ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)
  - It made adjustments to `README.md` but did not notice that web search had been removed.
- **qwen/qwen3.7-flash** ![](https://img.shields.io/badge/FAIL-INCORRECT-orange)
  - It rewrote `README.md` without removing the references to web search.
- **prism-ml/ternary-bonsai-2-27b** ![](https://img.shields.io/badge/FAIL-EXECUTION-red)
  - It had trouble closing reasoning blocks and required user interaction to continue. The run was going well but ended prematurely with error 429.
- **xiaomi/mimo-v2.6-flash** ![](https://img.shields.io/badge/FAIL-EXECUTION-red)
  - It got stuck in a tool-calling loop.
