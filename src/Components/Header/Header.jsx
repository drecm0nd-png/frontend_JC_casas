// src/components/Header/Header.jsx
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../Hooks/UseAuth.js";
import Breadcrumbs from "./Breadcrumbs.jsx";
import Logo from "../../assets/img/logo.png";
import "./Header.css";

function Header() {
  const { isAuthenticated } = useAuth();

  return (
    <header className="header">
      <div className="header-top">
        <Link to="/" className="header-brand">
          <img src={Logo} alt="Logo JC Casas" className="header-logo" />
          <span className="header-title">JC Casas Restaurante</span>
        </Link>

        <nav className="header-nav" aria-label="Navegación principal">
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/nosotros">Nosotros</NavLink>
          <NavLink to="/menu">Menú</NavLink>
          <NavLink to="/contacto">Contacto</NavLink>

          {isAuthenticated ? (
            <div className="header-actions">
              <Link to="/carrito" className="header-icon" aria-label="Carrito">
                🛒
              </Link>
              <Link to="/perfil" className="header-icon" aria-label="Perfil">
                👤
              </Link>
            </div>
          ) : (
            <NavLink to="/registro" className="header-register">
              Regístrate
            </NavLink>
          )}
        </nav>
      </div>

      <Breadcrumbs />
    </header>
  );
}

export default Header;
