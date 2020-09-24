import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import ReactMarkdown from "react-markdown";
import { useSelector, useDispatch } from "react-redux";

import { setSelected, getSelected, getOptions, SelectedOptions } from "./codeSpaceSlice";
import "./DocSpace.scss";

const input = "# This is a header\n\nAnd this is a paragraph from markdown";

function DocSpace() {
  const dispatch = useDispatch();
  const selected = useSelector(getSelected);
  const { platforms } = useSelector(getOptions);

  return (
    <div className="doc-space">
      <div className="code-selector d-flex justify-content-start">
        <Dropdown className="mr-4">
          <Dropdown.Toggle variant="success" id="dropdown-platform">
            Platform: {selected.platform?.label}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {platforms.map((pt) => (
              <Dropdown.Item key={pt.name} onClick={() => dispatch(setSelected(calculateSelected(selected, { platform: pt })))}>
                {pt.label}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown className="mr-4">
          <Dropdown.Toggle variant="success" id="dropdown-platform">
            Server: {selected.server?.label}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {selected.platform && selected.platform.servers
              ? selected.platform?.servers.map((sv) => (
                  <Dropdown.Item key={sv.name} onClick={() => dispatch(setSelected(calculateSelected(selected, { server: sv })))}>
                    {sv.label}
                  </Dropdown.Item>
                ))
              : null}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-platform">
            Client: {selected.client?.label}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {selected.server && selected.server.clients
              ? selected.server?.clients.map((cl) => (
                  <Dropdown.Item key={cl.name} onClick={() => dispatch(setSelected(calculateSelected(selected, { client: cl })))}>
                    {cl.label}
                  </Dropdown.Item>
                ))
              : null}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="mt-4">
        <ReactMarkdown source={input} />
      </div>
    </div>
  );
}

export default DocSpace;

function calculateSelected(prevSelected: SelectedOptions, selected: SelectedOptions): SelectedOptions {
  const tmpSelected = {
    ...prevSelected, // to avoid mutation
  };
  debugger;
  if (selected.platform && (!tmpSelected.platform || tmpSelected.platform.name !== selected.platform.name)) {
    tmpSelected.platform = selected.platform;
    tmpSelected.server = undefined;
    tmpSelected.client = undefined;
  }
  if (selected.server && (!tmpSelected.server || tmpSelected.server.name !== selected.server.name)) {
    tmpSelected.server = selected.server;
    tmpSelected.client = undefined;
  }
  if (selected.client) {
    tmpSelected.client = selected.client;
  }
  tmpSelected.isAllSet = tmpSelected.platform?.name && tmpSelected.server?.name && tmpSelected.client?.name ? true : false;
  return tmpSelected;
}
