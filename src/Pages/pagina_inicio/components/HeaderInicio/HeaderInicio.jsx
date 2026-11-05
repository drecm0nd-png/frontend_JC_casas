import { useState } from "react";
import Logo from "../../../../assets/img/logo.png";
import { NAV_LINKS } from "../../data/inicioData.js";
import "./HeaderInicio.css";

function HeaderInicio({ onNavigate, onOrder }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleNavigate(index) {
    setIsMenuOpen(false);
    onNavigate(index);
  }

  return (
    <header className="inicio-header">
      <div className="inicio-header__bar">
        <button
          type="button"
          className="inicio-header__brand"
          onClick={() => handleNavigate(0)}
          aria-label="Ir al inicio de la página"
        >
          <img
            src={Logo}
            alt=""
            className="inicio-header__logo"
            aria-hidden="true"
          />
          <span className="inicio-header__brand-name">JC Casas Restaurante</span>
        </button>

        <nav
          id="inicio-navigation"
          className={`inicio-header__nav ${isMenuOpen ? "is-open" : ""}`}
          aria-label="Navegación de la página"
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.index}
              type="button"
              className="inicio-header__nav-link"
              onClick={() => handleNavigate(link.index)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="inicio-header__actions">
          <button
            type="button"
            className="inicio-button inicio-button--outline inicio-header__cta"
            onClick={onOrder}
          >
            Pedir ¡YA!
          </button>

          <button
            type="button"
            className={`inicio-header__burger ${
              isMenuOpen ? "is-open" : ""
            }`}
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
            aria-controls="inicio-navigation"
          >
            <span className="inicio-header__burger-line" />
            <span className="inicio-header__burger-line" />
            <span className="inicio-header__burger-line" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default HeaderInicio;
