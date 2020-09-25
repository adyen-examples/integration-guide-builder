import React, { useEffect, useState } from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";
import { useSelector } from "react-redux";
import Nav from "react-bootstrap/Nav";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/solarized.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/htmlembedded/htmlembedded";
import "codemirror/mode/handlebars/handlebars";
import "codemirror/mode/jsx/jsx";
import "codemirror/mode/vue/vue";
import "codemirror/mode/php/php";
import "codemirror/mode/go/go";
import "codemirror/mode/clike/clike";
import "codemirror/mode/python/python";
import "codemirror/mode/ruby/ruby";
import "codemirror/mode/swift/swift";

import "./CodeSpace.scss";
import { RootState } from "../../app/store";
import { SourceFile } from "./codeSpaceSlice";

const cmOptions = {
  lineNumbers: true,
  theme: `solarized dark`,
};

function CodeSpace() {
  const sourceFiles = useSelector((state: RootState) => state.codeSpace.sourceFiles);
  const [source, setSource] = useState<SourceFile>();

  useEffect(() => {
    if (sourceFiles && sourceFiles[0]) {
      setSource(sourceFiles[0]);
    }
  }, [sourceFiles, setSource]);

  return (
    <div className="code-space">
      <div className="code-header-tabs">
        <Nav variant="tabs" activeKey={source?.name}>
          {sourceFiles.map((file) => (
            <Nav.Item key={file.name}>
              <Nav.Link eventKey={file.name} onClick={() => setSource(file)}>
                {file.name}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </div>
      <CodeMirror
        // ref={this.editorRef}
        className="code-mirror-editor"
        value={source?.content}
        // onChange={this.editorOnChange}
        options={{
          ...cmOptions,
          mode: findCMMode(source?.name),
        }}
      />
    </div>
  );
}

export default CodeSpace;

function findCMMode(fileName: string | undefined): string {
  if (!fileName) return "";
  const parts = fileName.split(".");
  const ext = parts.length > 0 ? parts[parts.length - 1] : "";
  switch (ext) {
    case "html":
      return "text/html";
    case "css":
      return "text/css";
    case "js":
      return "text/javascript";
    case "ts":
      return "text/typescript";
    case "jsx":
      return "text/jsx";
    case "tsx":
      return "text/typescript-jsx";
    case "vue":
      return "text/x-vue";
    case "java":
      return "text/x-java";
    case "kt":
      return "text/x-kotlin";
    case "cs":
      return "text/x-csharp";
    case "cshtml":
      return "text/x-aspx";
    case "go":
      return "text/x-go";
    case "php":
      return "text/x-php";
    case "py":
      return "text/x-python";
    case "rb":
      return "text/x-ruby";
    case "swift":
      return "text/x-swift";
    default:
      return "";
  }
}
