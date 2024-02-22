import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

//entry point for website, highest point that calls app,
//and therefore renders all of the website's information.

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
