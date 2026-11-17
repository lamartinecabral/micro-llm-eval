import React, { Suspense, use } from "react";
import Markdown from "marked-react";
import { getData } from "./tests/identify-obsolete-claims/benchmark.ts";

type Results = Awaited<ReturnType<typeof getData>>[1];

const parseSummary = (results: Results, badges: string[]) => {
  const verdictIndex = (ver: string) =>
    badges.findIndex((b) => b.includes(ver.toUpperCase()));
  return [
    `## Summary`,
    ``,
    `| Model name | Verdict |`,
    `| --- | --- |`,
    ...results
      .slice()
      .sort(
        (a, b) =>
          a.name.localeCompare(b.name) ||
          verdictIndex(a.verdict) - verdictIndex(b.verdict),
      )
      .filter((a, i, arr) => arr.findIndex((b) => b.name === a.name) === i)
      .map((res) => {
        return `| ${res.name} | ${badges.find((b) => b.includes(res.verdict.toUpperCase()))} |`;
      }),
  ].join("\n");
};

const parseResults = (
  results: Results,
  badges: string[],
  category: (typeof results)[number]["category"],
) => {
  const verdictIndex = (ver: string) =>
    badges.findIndex((b) => b.includes(ver.toUpperCase()));
  const compVerdict = (verA: string, verB: string) =>
    verdictIndex(verA) - verdictIndex(verB);
  const filteredResults = results
    .filter((a) => a.category === category)
    .sort((a, b) => {
      const compV = compVerdict(a.verdict, b.verdict);
      if (compV) return compV;
      if (a.total_tokens || b.total_tokens)
        return (a.total_tokens ?? 1e9) - (b.total_tokens ?? 1e9);
      if (a.tool_calls || b.tool_calls)
        return (
          (a.tool_calls?.split("\n").length ?? 1e9) -
          (b.tool_calls?.split("\n").length ?? 1e9)
        );
      return a.name.localeCompare(b.name);
    });

  return [
    `## ${category} class`,
    ``,
    filteredResults.map((res) => parseResult(res, badges)).join("\n\n---\n\n"),
  ].join("\n");
};

const parseResult = (res: Results[number], badges: string[]) => {
  const verdictIndex = (ver: string) =>
    badges.findIndex((b) => b.includes(ver.toUpperCase()));
  const parsed = [
    `### ${res.inference_engine}: ${res.model_id} ${badges[verdictIndex(res.verdict)]}`,
  ];

  if (res.tool_calls)
    parsed.push(
      ...[
        ``,
        `<details><summary><b>Tool calls:</b></summary><pre>`,
        res.tool_calls,
        `</pre></details>`,
      ],
    );

  if (res.total_tokens)
    parsed.push(...[``, `**Total tokens:** ${res.total_tokens}`]);

  if (res.supports_preserve_reasoning)
    parsed.push(...[``, `This model preserves reasoning across turns.`]);

  const reasoning =
    "reasoning" in res
      ? `reasoning ${typeof res.reasoning === "string" ? res.reasoning : res.reasoning ? "enabled" : "disabled"}`
      : null;
  if (reasoning || res.sampling_parameters)
    parsed.push(
      ...[
        ``,
        `**Settings:** ${[reasoning, res.sampling_parameters].filter((a) => a).join(", ")}`,
      ],
    );

  if (res.observations)
    parsed.push(...[``, `**Observations:**`, ``, res.observations]);

  return parsed.join("\n");
};

const Evaluation = () => {
  const [details, results] = use(getData());
  const badges = details.match(/!\[\]\(.+\)/g) ?? [];

  const summary = parseSummary(results, badges);

  const dense4Bresults = parseResults(results, badges, "4B dense");
  const sparse30Besults = parseResults(results, badges, "30B sparse");
  const dense8Besults = parseResults(results, badges, "8B dense");
  const dense30Bresults = parseResults(results, badges, "30B dense");
  const sparse8Bresults = parseResults(results, badges, "8B sparse");
  const dense1Bresults = parseResults(results, badges, "1B dense");

  return (
    <Markdown
      renderer={{
        html: (code: string) => (
          <span dangerouslySetInnerHTML={{ __html: code }}></span>
        ),
      }}
    >
      {[
        details,
        summary,
        dense4Bresults,
        sparse30Besults,
        dense8Besults,
        dense30Bresults,
        sparse8Bresults,
        dense1Bresults,
      ].join("\n\n---\n\n")}
    </Markdown>
  );
};

const App = () => {
  return (
    <Suspense fallback="loading...">
      <Evaluation />
    </Suspense>
  );
};

export default App;
