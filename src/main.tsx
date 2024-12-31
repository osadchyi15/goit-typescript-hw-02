import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";

import "./reset.css";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <App />
    <Toaster />
  </>
);
