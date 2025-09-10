import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { WidgetProvider } from "./store/WidgetContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <WidgetProvider>
    <App />
  </WidgetProvider>
);
