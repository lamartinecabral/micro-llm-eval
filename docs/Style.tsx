import React from "react";

const Style = () => {
  const css = `
td,
th {
  border: 0.5px solid black;
  padding: 6px 13px;
}

table {
  border: 0.5px solid black;
  border-spacing: 0;
  margin: 1em 0;
}

tr:not(:has(:is(td, th:not(:empty)))) {
  display: none;
}

tr:nth-child(2n) {
  background-color: hsla(0, 0%, 50%, 0.1);
}

pre {
  font-size: 0.85rem;
  padding: 1rem;
  border-radius: 6px;
  background-color: hsla(0, 0%, 50%, 0.1);
  overflow-x: scroll;
}
`;
  return <style>{css}</style>;
};

export default Style;
