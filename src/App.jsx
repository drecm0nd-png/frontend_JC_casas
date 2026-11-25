import { useEffect } from "react";
import Sidebar from "./Components/Sidebar/Sidebar";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import AppRoutes from "./Routes/AppRoutes";

export default function App() {
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

  return (
    <div className="app-with-sidebar">
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