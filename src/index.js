import React from "react";
import App from "./App";
import { AppProvider } from "./App";
import ReactDOM from "react-dom";

ReactDOM.render(
  <AppProvider children={<App />} />,
  document.getElementById("root")
);
