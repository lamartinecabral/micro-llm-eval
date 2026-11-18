import React, { Suspense, use } from "react";
import Markdown from "marked-react";
import { getData } from "./tests/identify-obsolete-claims/benchmark.ts";

type Results = Awaited<ReturnType<typeof getData>>[1];
type Cloud = Awaited<ReturnType<typeof getData>>[3];

const Summary = (props: { results: Results; badges: string[] }) => {
  const verdictIndex = (ver: string) =>
    props.badges.findIndex((b) => b.includes(ver.toUpperCase()));
  const results = props.results
    .slice()
    .sort(
      (a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase()) ||
        verdictIndex(a.verdict) - verdictIndex(b.verdict),
    )
    .filter((a, i, arr) => arr.findIndex((b) => b.name === a.name) === i)
    .map((res) => {
      return {
        name: res.name,
        badge: props.badges.find((b) => b.includes(res.verdict.toUpperCase())),
      };
    });
  return (
    <>
      <h2>Summary</h2>
      <table>
        <tr>
          <th>Model name</th>
          <th>Verdict</th>
        </tr>
        {results.map((res) => (
          <tr>
            <td>{res.name}</td>
            <td>
              <Markdown>{res.badge}</Markdown>
            </td>
          </tr>
        ))}
      </table>
    </>
  );
};

const Result = ({
  result: res,
  badges,
}: {
  result: Results[number];
  badges: string[];
}) => {
  const verdictIndex = (ver: string) =>
    badges.findIndex((b) => b.includes(ver.toUpperCase()));
  const badge = badges[verdictIndex(res.verdict)];
  const reasoning =
    "reasoning" in res
      ? `reasoning ${typeof res.reasoning === "string" ? res.reasoning : res.reasoning ? "enabled" : "disabled"}`
      : null;
  return (
    <>
      <Markdown>
        {`### ${res.inference_engine}: ${res.model_id} ${badge}`}
      </Markdown>
      {!!res.tool_calls && (
        <details>
          <summary>
            <b>Tool calls:</b>
          </summary>
          <pre>{res.tool_calls}</pre>
        </details>
      )}
      {!!res.total_tokens && (
        <Markdown>{`**Total tokens:** ${res.total_tokens}`}</Markdown>
      )}
      {!!res.supports_preserve_reasoning && (
        <p>This model preserves reasoning across turns.</p>
      )}
      {!!(reasoning || res.sampling_parameters) && (
        <Markdown>
          {`**Settings:** ${[reasoning, res.sampling_parameters].filter((a) => a).join(", ")}`}
        </Markdown>
      )}
      {!!res.observations && (
        <>
          <Markdown>**Observations:**</Markdown>
          <Markdown>{res.observations}</Markdown>
        </>
      )}
    </>
  );
};

const ClassResults = ({
  results,
  badges,
  category,
}: {
  results: Results;
  badges: string[];
  category: Results[number]["category"];
}) => {
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
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });
  return (
    <>
      <h2>{category} class</h2>
      {filteredResults.map((result, i) => (
        <>
          {!!i && <hr />}
          <Result key={result.model_id} result={result} badges={badges} />
        </>
      ))}
    </>
  );
};

const CloudResults = ({
  results,
  badges,
}: {
  results: Cloud;
  badges: string[];
}) => {
  const verdictIndex = (ver: string) =>
    badges.findIndex((b) => b.includes(ver.toUpperCase()));
  const compVerdict = (verA: string, verB: string) =>
    verdictIndex(verA) - verdictIndex(verB);

  const filterResults = (
    provider: Cloud[number]["provider"],
    withUsage: boolean,
  ) =>
    results
      .filter((a) => a.provider === provider && !!a.usage === withUsage)
      .sort((a, b) => {
        const compV = compVerdict(a.verdict, b.verdict);
        if (compV) return compV;
        if (withUsage)
          return (a.usage?.total_cost || 1e9) - (b.usage?.total_cost || 1e9);
        else return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
      });

  const formatK = (value?: number) => +((value || 0) / 1000).toFixed(3) + "K";

  const providers: {
    name: Cloud[number]["provider"];
    label: string;
    url: string;
  }[] = [
    {
      name: "Openrouter",
      label: "Openrouter",
      url: "https://openrouter.ai/",
    },
    {
      name: "Hugging Face",
      label: "Hugging Face's Inference Providers",
      url: "https://huggingface.co/docs/inference-providers",
    },
    {
      name: "Ollama cloud",
      label: "Ollama cloud",
      url: "https://docs.ollama.com/cloud",
    },
  ];

  return (
    <>
      {providers.map((provider) => {
        const results = filterResults(provider.name, false);
        const resultsWithCost = filterResults(provider.name, true);
        return (
          <div key={provider.label}>
            <h3>
              <a href={provider.url}>{provider.label}</a>
            </h3>
            {!!resultsWithCost.length && (
              <table>
                <tr>
                  <th>Model ID</th>
                  <th>Cost</th>
                  <th>Output</th>
                  <th>Requests</th>
                </tr>
                {resultsWithCost.map((res) => (
                  <tr key={res.model_id}>
                    <td>
                      <strong>{res.model_id}</strong>
                    </td>
                    <td>${res.usage?.total_cost}</td>
                    <td>{formatK(res.usage?.total_output_tokens)}</td>
                    <td>{res.usage?.request_count}</td>
                  </tr>
                ))}
              </table>
            )}
            {!!results.length && (
              <ul>
                {results.map((res) => (
                  <li key={res.model_id}>
                    <strong>{res.model_id}</strong>{" "}
                    <img src={badges[verdictIndex(res.verdict)].slice(4, -1)} />
                    {!!res.observations && (
                      <Markdown>{`- ${res.observations}`}</Markdown>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </>
  );
};

const Evaluation = () => {
  const [details, results, cloudDetails, cloudResults] = use(getData());
  const badges = details.match(/!\[\]\(.+\)/g) ?? [];

  return (
    <>
      <Markdown>{details}</Markdown>
      <hr />
      <Summary results={results} badges={badges} />
      <hr />
      <ClassResults results={results} badges={badges} category="4B dense" />
      <hr />
      <ClassResults results={results} badges={badges} category="30B sparse" />
      <hr />
      <ClassResults results={results} badges={badges} category="8B dense" />
      <hr />
      <ClassResults results={results} badges={badges} category="30B dense" />
      <hr />
      <ClassResults results={results} badges={badges} category="8B sparse" />
      <hr />
      <ClassResults results={results} badges={badges} category="1B dense" />
      <hr />
      <Markdown>{cloudDetails}</Markdown>
      <CloudResults results={cloudResults} badges={badges} />
    </>
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
