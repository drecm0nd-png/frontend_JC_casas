import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../Hooks/UseAuth.js";
import Logo from "../../assets/img/logo.png";
import CarroLogo from "../../assets/img/carro_logo.png";
import Button from "../Button/Button.jsx";
import Breadcrumbs from "./Breadcrumbs.jsx";
import "./Header.css";

function Header() {
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setIsMenuOpen(false);

  function handleLogout() {
    logout();
    closeMenu();
  }

  // Verifica si la ruta actual es la de Login para alternar el botón
  const isLoginPage = location.pathname === "/login";

  return (
    <header className="header">
      <div className="header-top">
        <Link to="/" className="header-brand" onClick={closeMenu}>
          <img src={Logo} alt="Logo JC Casas" className="header-logo" />
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
          <NavLink to="/" onClick={closeMenu}>
            Nosotros
          </NavLink>
          <NavLink to="/menu" onClick={closeMenu}>
            Menú
          </NavLink>
          <NavLink to="/panel" onClick={closeMenu}>
            Panel
          </NavLink>

          {/* Botón Carrito de Pedidos dirigido a /car */}
          <NavLink 
            to="/car" 
            onClick={closeMenu} 
            className="header-cart-btn"
            title="Ver mi carrito"
            aria-label="Ir al carrito de compras"
          >
            <img src={CarroLogo} alt="Icono Carrito" className="cart-icon-img" />
          </NavLink>

          {isAuthenticated ? (
            <Button
              className="header-logout"
              variant="secondary"
              onClick={handleLogout}
            >
              Cerrar sesión
            </Button>
          ) : (
            <NavLink
              to={isLoginPage ? "/registro" : "/login"}
              onClick={closeMenu}
              className="header-register"
            >
              {isLoginPage ? "Registrarse" : "Iniciar sesión"}
            </NavLink>
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