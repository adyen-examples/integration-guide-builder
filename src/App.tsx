import React from "react";
import Split from "react-split";

import "./App.scss";
import Header from "./features/header/Header";
import CodeSpace from "./features/codespace/CodeSpace";
import DocSpace from "./features/codespace/DocSpace";
import Preview from "./features/preview/Preview";

const GUTTER_SIZE = 10;
function App() {
  return (
    <div className="app">
      <Header />
      <Split
        className="main-split-container d-flex flex-column"
        direction="vertical"
        sizes={[75, 25]}
        minSize={[200, 50]}
        gutterSize={GUTTER_SIZE}
      >
        <div className="app-body">
          <Split
            className="inner-split-container d-flex"
            direction="horizontal"
            sizes={[50, 50]}
            minSize={[200, 300]}
            gutterSize={GUTTER_SIZE}
          >
            <DocSpace />
            <CodeSpace />
          </Split>
        </div>
        <Preview />
      </Split>
    </div>
  );
}

export default App;
