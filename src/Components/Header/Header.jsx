import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../Hooks/UseAuth.js";
import Logo from "../../assets/img/logo.png";
import Button from "../Button/Button.jsx";
import Breadcrumbs from "./Breadcrumbs.jsx";
import "./Header.css";

function Header() {
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  function handleLogout() {
    logout();
    closeMenu();
  }

  return (
    <header className="header">
      <div className="header-top">
        <Link to="/" className="header-brand" onClick={closeMenu}>
          <img src={Logo} alt="" className="header-logo" />
          <span className="header-title">JC Casas Restaurante</span>
        </Link>

        <button
          className={`header-burger ${isMenuOpen ? "is-open" : ""}`}
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
        >
          <span className="burger-line" />
          <span className="burger-line" />
          <span className="burger-line" />
        </button>

        <nav
          id="primary-navigation"
          className={`header-nav ${isMenuOpen ? "is-open" : ""}`}
          aria-label="Navegación principal"
        >
          <NavLink to="/" onClick={closeMenu}>Inicio</NavLink>
          {isAuthenticated ? (
            <>
              <NavLink to="/dashboard" onClick={closeMenu}>Panel</NavLink>
              <Button className="header-logout" variant="secondary" onClick={handleLogout}>
                Cerrar sesión
              </Button>
            </>
          ) : (
            <NavLink to="/login" onClick={closeMenu}>Acceso de demostración</NavLink>
          )}
        </nav>
      </div>

      <button
        className={`header-overlay ${isMenuOpen ? "is-visible" : ""}`}
        type="button"
        aria-label="Cerrar menú de navegación"
        tabIndex={isMenuOpen ? 0 : -1}
        onClick={closeMenu}
      />
      <Breadcrumbs />
    </header>
  );
}

export default Header;
