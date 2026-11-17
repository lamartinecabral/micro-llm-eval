import z from "zod";

const basicResultSchema = z.object({
  model_id: z.string(),
  name: z.string(),
  verdict: z.enum([
    "pass-correct",
    "pass-partial",
    "fail-incorrect",
    "fail-execution",
    "fail-crashed",
  ]),
});

const resultSchema = z
  .object({
    inference_engine: z.enum(["llama.cpp", "Ollama"]),
    category: z.enum([
      "1B dense",
      "4B dense",
      "8B dense",
      "30B dense",
      "8B sparse",
      "30B sparse",
  ]),
  tool_calls: z.string().optional(),
  total_tokens: z.number().optional(),
  reasoning: z.boolean().or(z.string()).optional(),
  supports_preserve_reasoning: z.boolean().optional(),
  sampling_parameters: z.string().optional(),
  observations: z.string().optional(),
  })
  .extend(basicResultSchema.shape);

const resultFiles = [
  "AtomicChat-Flint-GGUF-IQ2_XXS.json",
  "AtomicChat-Ornith-1.5-35B-A3B-GGUF-IQ3_XXS.json",
  "AtomicChat-Qwen3.5-4B-GGUF-Q8_0.json",
  "AtomicChat-gemma-4-26B-A4B-it-GGUF-IQ4_XS.json",
  "IFM-K2-Horizon-0.9B-GGUF-Q8_0.json",
  "IFM-K2-Horizon-3.7B-GGUF-Q4_K_M.json",
  "IFM-K2-Horizon-3.7B-GGUF-Q8_0.json",
  "IFM-K2-Horizon-7B-GGUF-Q4_K_M.json",
  "InternScience-Agents-A1-4B-Q8_0-GGUF-Q8_0.json",
  "JetBrains-Mellum2.1-12B-A2.5B-Thinking-GGUF-Q4_K_M.json",
  "LiquidAI-LFM2.5-2.6B-GGUF-Q8_0.json",
  "LiquidAI-LFM2.5-24B-A2B-GGUF-Q4_0.json",
  "LiquidAI-LFM3-1.7B-GGUF-Q8_0.json",
  "ServiceNow-AI-Apriel-1.6-15b-Thinker-Q4_K_M.json",
  "bartowski-Laguna-XS-2.1-GGUF-IQ3_XXS.json",
  "bartowski-MiMo-V2.6-Distill-Qwen-9B-GGUF-Q4_K_M.json",
  "bartowski-Nanbeige_Nanbeige4.3-33B-GGUF-IQ2_XXS.json",
  "bartowski-ai9stars_G9v3-3B-GGUF-Q8_0.json",
  "bartowski-zai-org_GLM-4.7-Flash-GGUF-IQ3_M.json",
  "batiai-Qwen3.8-27B-GGUF-Q2_K_S.json",
  "bonsai-2-4b.json",
  "ggml-org-SmolLM3-3B-GGUF-Q8_0.json",
  "ggml-org-gemma-4-12B-it-GGUF-Q4_0.json",
  "ggml-org-gemma-4-E4B-it-GGUF-Q8_0.json",
  "granite4.2-3b.json",
  "inclusionAI-Ling-3.0-tiny-GGUF-Q8_0.json",
  "janhq-Jan-code-4b-gguf-Q8_0.json",
  "nemotron-3-nano-4b.json",
  "north-mini-code-1.0-q4_K_M.json",
  "ornith-ai-Ornith-1.5-9B-GGUF-Q4_K_M.json",
  "poolside-Laguna-XS-2.1-GGUF-Q4_K_M.json",
  "prism-ml-Ternary-Bonsai-2-27B-gguf-Q2_0.json",
];

const resultPath =
  import.meta.url.split("/").slice(0, -1).join("/") + "/results/";

const fetchResults = async () => {
  const results = await Promise.all(
    resultFiles.map((file) => fetch(resultPath + file).then((a) => a.json())),
  );
  return results.map((res) => resultSchema.parse(res));
};

const fetcher = <T extends any>(fn: () => Promise<T>) => {
  let promise: Promise<T>;
  return () => {
    if (promise) return promise;
    return (promise = fn());
  };
};

export const getData = fetcher(() =>
  Promise.all([
    fetch(
      import.meta.url.split("/").slice(0, -1).join("/") + "/details.md",
    ).then((res) => res.text()),
    fetchResults(),
  ]),
);
