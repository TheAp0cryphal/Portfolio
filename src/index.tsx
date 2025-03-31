import { render } from "solid-js/web";
import "./cheatsheet.scss";
import App from "./App";
import { Analytics } from "@vercel/analytics/react";

render(() => (
  <>
    <App />
    <Analytics />
  </>
), document.getElementById("root")!);
