import { NavLink, Link, useLocation } from "react-router-dom";
import {
  FaUserGroup,
  FaUtensils,
  FaChartPie,
  FaCartShopping,
  FaGear,
  FaLock,
  FaArrowRightToBracket,
  FaHouse,
} from "react-icons/fa6";
import { useAuth } from "../../Hooks/UseAuth.js";
import Logo from "../../assets/img/logo.png";
import "./Sidebar.css";

export default function Sidebar() {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();
  const isAuthRoute = pathname === "/login" || pathname === "/registro";

  return (
    <aside className="app-sidebar">
      <Link to="/" className="sidebar-brand" title="Inicio">
        <img src={Logo} alt="Logo JC Casas" className="sidebar-logo-img" />
      </Link>

      {isAuthenticated ? (
        <nav className="sidebar-nav">
          <NavLink
            to="/"
            className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
            end
          >
            <FaUserGroup size={20} />
            <span>Inicio</span>
          </NavLink>

          <NavLink
            to="/menu"
            className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
          >
            <FaUtensils size={20} />
            <span>Menú</span>
          </NavLink>

          <NavLink
            to="/panel"
            className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
          >
            <FaChartPie size={20} />
            <span>Panel</span>
          </NavLink>

          <NavLink
            to="/car"
            className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
          >
            <FaCartShopping size={20} />
            <span>Carrito</span>
          </NavLink>
        </nav>
      ) : (
        <div className="sidebar-nav">
          <div className="sidebar-locked-box" role="status">
            <div className="sidebar-locked-icon" aria-hidden="true">
              <FaLock size={18} />
            </div>
            <p className="sidebar-locked-text">
              Para acceder a la navegación completa del sistema primero debes iniciar
              sesión.
            </p>
            <Link to="/login" className="sidebar-locked-btn">
              <FaArrowRightToBracket size={14} />
              <span>Iniciar sesión</span>
            </Link>
          </div>

          <NavLink
            to="/"
            className={({ isActive }) =>
              `sidebar-link sidebar-compact-link ${isActive ? "active" : ""}`
            }
            title="Inicio"
            aria-label="Inicio"
            end
          >
            <FaHouse size={20} />
            <span>Inicio</span>
          </NavLink>

          <NavLink
            to="/login"
            className={({ isActive }) =>
              `sidebar-link sidebar-compact-link ${
                isActive || isAuthRoute ? "active" : ""
              }`
            }
            title="Iniciar sesión"
            aria-label="Iniciar sesión"
          >
            <FaArrowRightToBracket size={20} />
            <span>Iniciar sesión</span>
          </NavLink>
        </div>
      )}

      <div className="sidebar-footer">
        <NavLink
          to="/configuracion"
          className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
        >
          <FaGear size={20} />
          <span>Configuración</span>
        </NavLink>
      </div>
    </aside>
  );
}