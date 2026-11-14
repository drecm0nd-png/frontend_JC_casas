import { NavLink, Link } from "react-router-dom";
import { FaUserGroup, FaUtensils, FaChartPie, FaCartShopping, FaGear } from "react-icons/fa6";
import Logo from "../../assets/img/logo.png";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="app-sidebar">
      {/* Solo el logotipo centrado en la parte superior del Sidebar */}
      <Link to="/" className="sidebar-brand" title="Ir a Nosotros">
        <img src={Logo} alt="Logo JC Casas" className="sidebar-logo-img" />
      </Link>

      {/* Enlaces principales */}
      <nav className="sidebar-nav">
        <NavLink to="/" className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`} end>
          <FaUserGroup size={20} />
          <span>Inicio</span>
        </NavLink>

        <NavLink to="/menu" className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}>
          <FaUtensils size={20} />
          <span>Menú</span>
        </NavLink>

        <NavLink to="/panel" className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}>
          <FaChartPie size={20} />
          <span>Panel</span>
        </NavLink>

        <NavLink to="/car" className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}>
          <FaCartShopping size={20} />
          <span>Carrito</span>
        </NavLink>
      </nav>

      {/* Pie del Sidebar */}
      <div className="sidebar-footer">
        <NavLink to="/configuracion" className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}>
          <FaGear size={20} />
          <span>Configuración</span>
        </NavLink>
      </div>
    </aside>
  );
}