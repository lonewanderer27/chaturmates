import "./theme/index.css";

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

import { Analytics } from '@vercel/analytics/react';
import App from "./App";
import {Provider} from "react-supabase";
import {client} from "./client";
import {createRoot} from "react-dom/client";

// eslint-disable-next-line no-undef
const container = document.getElementById("root");

// instantiate a jotai root
// @ts-ignore
const root = createRoot(container);

// instantiate tanstack client
export const qClient = new QueryClient();

root.render(
  <Provider value={client}>
    <QueryClientProvider client={qClient}>
      <App />
      <Analytics />
    </QueryClientProvider>
  </Provider>
);
