import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import AppRoutes from "./Routes/AppRoutes";

export default function App() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [sidebarHovered, setSidebarHovered] = useState(false);

  useEffect(() => {
    setSidebarHovered(false);
  }, [pathname]);

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

  const sinShell = pathname === "/login" || pathname === "/registro";

  if (sinShell) {
    return <AppRoutes />;
  }

  return (
    <div
      className={`app-with-sidebar${
        isHome ? " app-with-sidebar--home-trigger" : ""
      }`}
    >
      {isHome && (
        <button
          type="button"
          className="home-sidebar-arrow-btn"
          aria-label="Mostrar menú lateral"
          onMouseEnter={() => setSidebarHovered(true)}
          onFocus={() => setSidebarHovered(true)}
        >
          &rsaquo;
        </button>
      )}

      <div
        className={`home-sidebar-drawer${
          isHome ? (sidebarHovered ? " is-open" : " is-collapsed") : ""
        }`}
        onMouseLeave={() => {
          if (isHome) setSidebarHovered(false);
        }}
      >
        <Sidebar isHome={isHome} isDrawerOpen={isHome ? sidebarHovered : true} />
      </div>

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