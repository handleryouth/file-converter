import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { ErrorBoundary } from "react-error-boundary";
import { router } from "./library/router.tsx";
import "./translations/i18n.ts";
import "./main.css";
import Error from "./component/Error.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary fallbackRender={Error}>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>,
);
