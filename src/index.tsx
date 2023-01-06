import React from "react";
import ReactDOM from "react-dom/client";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import App from "App";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={true} position="bottom-right" />
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);
