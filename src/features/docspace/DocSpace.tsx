import React from "react";
import ReactMarkdown from "react-markdown";
import "./DocSpace.scss";

const input = "# This is a header\n\nAnd this is a paragraph from markdown";

function DocSpace() {
  return (
    <div className="doc-space">
      <ReactMarkdown source={input} />
    </div>
  );
}

export default DocSpace;
