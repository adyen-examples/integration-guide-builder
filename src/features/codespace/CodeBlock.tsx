import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs } from "react-syntax-highlighter/dist/esm/styles/prism";

function CodeBlock({ value = "", language = null }) {
  return (
    <SyntaxHighlighter language={language} style={vs}>
      {value}
    </SyntaxHighlighter>
  );
}

export default CodeBlock;
