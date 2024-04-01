import { defineCustomElements } from "@ionic/pwa-elements/loader";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import "./index.css";
import { persistor, store } from "./store/store";
import appTheme from "./theme.js";

const container = document.getElementById("root");
const root = createRoot(container);
defineCustomElements(window);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10, // 10 minutes
      cacheTime: 1000 * 60 * 15, // 15 minutes
      useErrorBoundary: true,
      retry: 0,
    },
  },
});

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={appTheme} withGlobalStyles withNormalizeCss>
          <App />
        </MantineProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);
