import React from "react";
import docsIcon from "./res/docs-icon.svg";
import supportIcon from "./res/support-icon.svg";
import logo from "./res/adyen-logo.svg";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <header className="app-header d-flex justify-content-between">
        <a href="./" className="logo">
          <img src={logo} alt="Adyen logo" />
          <span className="logo-text">Integration Builder</span>
        </a>
        <ul className="nav">
          <li className="nav-item">
            <a className="nav-link" href="https://docs.adyen.com/">
              <img src={docsIcon} alt="documentation" />
              <span className="link-text">Documentation</span>
              <span className="sr-only">Opens in a new tab or window</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="https://support.adyen.com/hc/en-us">
              <img src={supportIcon} alt="support" />
              <span className="link-text">Support</span>
              <span className="sr-only">Opens in a new tab window</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="https://github.com/adyen-examples">
              <img src={docsIcon} alt="examples" />
              <span className="link-text">Examples</span>
              <span className="sr-only">Opens in a new tab window</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link btn" href="https://www.adyen.com/signup">
              <span className="link-text">Sign up</span>
              <span className="sr-only">Opens in a new tab or window</span>
            </a>
          </li>
        </ul>
      </header>
      <div className="container-fluid app-body">
        <div className="row">
          <div className="col-md-6 doc-space">Hello</div>
          <div className="col-md-6 code-space">World</div>
        </div>
      </div>
    </div>
  );
}

export default App;
