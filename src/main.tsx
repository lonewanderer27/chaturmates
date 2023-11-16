import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-supabase";
import { client } from "./client";
import "./theme/index.css";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <Provider value={client}>
    <App />
  </Provider>
);
