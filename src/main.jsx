import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import { AuthProvider } from "./Context/AuthProvider.jsx";
import { ProfileProvider } from "./Context/ProfileProvider.jsx";

import "./Styles/Variables.css";
import "./Styles/Global.css";
import "./Styles/Pages.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProfileProvider>
          <App />
        </ProfileProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
