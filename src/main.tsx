import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "@/assets/styles/index.css";
import { routes } from "./config/routes.config";
import { StarknetProvider } from "./components/providers/starknet";
import { Toaster } from "./components/ui/sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StarknetProvider>
      <Toaster richColors theme="light" />
      <RouterProvider router={routes} />
    </StarknetProvider>
  </StrictMode>,
);
