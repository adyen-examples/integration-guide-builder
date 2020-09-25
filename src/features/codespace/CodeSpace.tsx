import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Nav from "react-bootstrap/Nav";
// codemirror dependencies and modes
import { UnControlled as CodeMirror } from "react-codemirror2";
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
import { findCMMode } from "./CodeMirrorUtils";

const cmOptions = {
  lineNumbers: true,
  theme: `solarized dark`,
};

function CodeSpace() {
  const sourceFiles = useSelector((state: RootState) => state.codeSpace.sourceFiles);
  const [source, setSource] = useState<SourceFile>();
  const editorRef = useRef<CodeMirror>(null);

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
        ref={editorRef}
        className="code-mirror-editor"
        value={source?.content}
        // onChange={this.editorOnChange}
        options={{
          ...cmOptions,
          mode: findCMMode(source?.name),
        }}
        // selection={{
        //   ranges: [
        //     {
        //       anchor: { ch: 1, line: 40 },
        //       head: { ch: 1, line: 43 },
        //     },
        //   ],
        //   focus: true, // defaults false if not specified
        // }}
      />
    </div>
  );
}

export default CodeSpace;
