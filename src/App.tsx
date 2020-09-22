import React from "react";
import "./App.scss";
import Header from "./features/header/Header";
import CodeSpace from "./features/codespace/CodeSpace";
import DocSpace from "./features/docspace/DocSpace";
import Preview from "./features/preview/Preview";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="container-fluid app-body">
        <div className="row">
          <DocSpace />
          <CodeSpace />
        </div>
      </div>
      <Preview />
    </div>
  );
}

export default App;
