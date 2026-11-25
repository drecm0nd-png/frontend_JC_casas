import { useLocation } from "react-router-dom";
import { useAuth } from "./Hooks/UseAuth.js";
import Sidebar from "./Components/Sidebar/Sidebar";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import AppRoutes from "./Routes/AppRoutes";

export default function App() {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();

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
