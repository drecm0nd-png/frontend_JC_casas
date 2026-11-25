import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "./Hooks/UseAuth.js";
import Sidebar from "./Components/Sidebar/Sidebar";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import AppRoutes from "./Routes/AppRoutes";

export default function App() {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();

  // Sincroniza el modo oscuro globalmente (funciona tanto con shell como sin shell)
  useEffect(() => {
    try {
      const raw = localStorage.getItem("jcasas:config_state");
      const saved = raw ? JSON.parse(raw) : {};
      const root = document.documentElement;
      if (saved.darkMode) {
        root.setAttribute("data-theme", "dark");
        root.classList.add("dark-mode");
      } else {
        root.removeAttribute("data-theme");
        root.classList.remove("dark-mode");
      }
    } catch {
      // Ignorado
    }
  }, []);

  // Sin shell: la landing sin sesión y las pantallas de login/registro
  const sinShell =
    pathname === "/login" ||
    pathname === "/registro" ||
    (pathname === "/" && !isAuthenticated);
  const landingConSesion = pathname === "/" && isAuthenticated;

  if (sinShell) {
    return <AppRoutes />;
  }

  return (
    <div
      className={`app-with-sidebar${
        landingConSesion ? " app-shell-desplegable" : ""
      }`}
    >
      {landingConSesion && <span className="app-shell-corner" />}
      <Sidebar />

      <main className="app-main-content">
        <Header />

        <div className="app-page-wrapper">
          <AppRoutes />
        </div>

        <Footer />
      </main>
    </div>
  );
}