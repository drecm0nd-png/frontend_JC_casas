// src/components/Header/Header.jsx
import { useState } from "react"; 
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../Hooks/UseAuth.js";
import Breadcrumbs from "./Breadcrumbs.jsx";
import Logo from "../../assets/img/logo.png";
import perfilIcon from "../../assets/img/perfil_logo.png";
import carritoIcon from "../../assets/img/carro_logo.png";
import "./Header.css";

function Header() {
  const { isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-top">
        <Link to="/" className="header-brand" onClick={closeMenu}>
          <img src={Logo} alt="Logo JC Casas" className="header-logo" />
          <span className="header-title">JC Casas Restaurante</span>
        </Link>

        {/* BOTÓN HAMBURGUESA */}
        <button 
          className={`header-burger ${isMenuOpen ? 'is-open' : ''}`}
          onClick={toggleMenu}
          aria-label="Abrir menú de navegación"
          aria-expanded={isMenuOpen}
        >
          <span className="burger-line"></span>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
        </button>

        {/* NAVEGACIÓN SLIDER */}
        <nav 
          className={`header-nav ${isMenuOpen ? 'is-open' : ''}`} 
          aria-label="Navegación principal"
        >
          <NavLink to="/" onClick={closeMenu}>Inicio</NavLink>
          <NavLink to="/nosotros" onClick={closeMenu}>Nosotros</NavLink>
          <NavLink to="/menu" onClick={closeMenu}>Menú</NavLink>
          <NavLink to="/contacto" onClick={closeMenu}>Contacto</NavLink>

          {isAuthenticated ? (
            <div className="header-actions">
              <Link to="/carrito" className="header-icon" aria-label="Carrito" onClick={closeMenu}>
                <img src={carritoIcon} alt="Carrito" />
              </Link>
              <Link to="/perfil" className="header-icon" aria-label="Perfil" onClick={closeMenu}>
                <img src={perfilIcon} alt="Perfil" />
              </Link>
            </div>
          ) : (
            <NavLink to="/registro" className="header-register" onClick={closeMenu}>
              Regístrate
            </NavLink>
          )}
        </nav>
      </div>

      {/* NUEVO: Telón de fondo opaco. Si se cliquea, se cierra el menú */}
      <div 
        className={`header-overlay ${isMenuOpen ? 'is-visible' : ''}`} 
        onClick={closeMenu}
      ></div>

      <Breadcrumbs />
    </header>
  );
}

export default Header;
