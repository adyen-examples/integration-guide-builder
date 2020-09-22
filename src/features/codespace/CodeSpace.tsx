import React, { useState } from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";
import { useSelector, useDispatch } from "react-redux";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/solarized.css";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from "./counterSlice";
import "./CodeSpace.scss";

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

const code = "<h1>I ♥ react-codemirror2</h1>";

function CodeSpace() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState("2");

  return (
    <div className="col-md-6 code-space">
      <div className="code-header-tabs">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className="nav-link active" href="#">
              Active.js
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Link
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Link
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href="#">
              Disabled
            </a>
          </li>
        </ul>
      </div>
      <CodeMirror
        // ref={this.editorRef}
        className="code-mirror-editor"
        value={code}
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
