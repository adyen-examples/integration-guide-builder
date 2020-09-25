import React, { useEffect, useState } from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";
import { useSelector, useDispatch } from "react-redux";
import Nav from "react-bootstrap/Nav";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/solarized.css";

import "./CodeSpace.scss";
import { RootState } from "../../app/store";
import { getOptionsFile, getSelected, SourceFile } from "./codeSpaceSlice";

const cmOptions = {
  lineNumbers: true,
  //   mode: "jdl",
  //   matchBrackets: true,
  //   autoCloseBrackets: true,
  //   keyMap: "sublime",
  //   extraKeys: {
  //     "Ctrl-Space": "autocomplete",
  //   },
};

function CodeSpace() {
  const sourceFiles = useSelector((state: RootState) => state.codeSpace.sourceFiles);
  const [source, setSource] = useState<SourceFile>();
  const dispatch = useDispatch();

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
        // onBeforeChange={this.editorBeforeChange}
        // onChange={this.editorOnChange}
        options={{
          ...cmOptions,
          theme: `solarized dark`,
        }}
      />
    </div>
  );
}

export default CodeSpace;
