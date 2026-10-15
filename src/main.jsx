import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "../src/App.jsx"
import { AuthProvider } from "./Context/AuthContext.jsx";

import "./Styles/Variables.css";
import "./Styles/Global.css";

import Main from "./Pages/main(inicio)/Main.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Main />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
