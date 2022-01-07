import "./index.scss";

// TODO: !!! import all new global styles in index.tsx
import "./utility.scss";
import "./utility-breakpoints.scss";
import "./fonts.scss";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { App } from "./app";

const rootElement = document.getElementById("root");

/* todo is it necessary? <BrowserRouter basename={baseUrl}>*/

//todo use never react router
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootElement
);
