import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { getVisitorId } from "./visitorId";

getVisitorId();

void fetch("/api/health", {
  cache: "no-store",
  signal: AbortSignal.timeout(90_000),
}).catch(() => {
  // No need for handling exceptions, as the purpose is to warm up the backend service
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
