import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-supabase";
import { client } from "./client";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <Provider value={client}>
      <App />
    </Provider>
  </React.StrictMode>
);
