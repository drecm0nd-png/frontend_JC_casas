import { useLayoutEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../Hooks/UseAuth.js";
import Logo from "../../assets/img/logo.png";
import Button from "../Button/Button.jsx";
import Breadcrumbs from "./Breadcrumbs.jsx";
import "./Header.css";

function Header() {
  const { isAuthenticated, logout } = useAuth();
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const spacerRef = useRef(null);
  const closeMenu = () => setIsMenuOpen(false);

  useLayoutEffect(() => {
    const header = headerRef.current;
    const spacer = spacerRef.current;
    if (!header || !spacer) return undefined;

    function syncSpacerHeight() {
      spacer.style.height = `${header.getBoundingClientRect().height}px`;
    }

    syncSpacerHeight();

    if ("ResizeObserver" in window) {
      const observer = new window.ResizeObserver(syncSpacerHeight);
      observer.observe(header);
      return () => observer.disconnect();
    }

    window.addEventListener("resize", syncSpacerHeight);
    return () => window.removeEventListener("resize", syncSpacerHeight);
  }, [isAuthenticated, pathname]);

  function handleLogout() {
    logout();
    closeMenu();
  }

  return (
    <>
    <header className="header" ref={headerRef}>
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
    <div className="header-spacer" ref={spacerRef} aria-hidden="true" />
    </>
  );
}

export default Header;
