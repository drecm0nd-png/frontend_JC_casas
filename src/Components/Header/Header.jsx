import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Hooks/UseAuth.js";
import { 
  FaArrowRightToBracket, 
  FaRightFromBracket, 
  FaUserPlus, 
  FaBagShopping, 
  FaLock, 
  FaUserPen, 
  FaCircleInfo,
  FaBell,
  FaUser 
} from "react-icons/fa6";
import NotificationsDropdown from "../NotificationsDropdown/NotificationsDropdown";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";
import "./Header.css";

function Header() {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Estado para controlar si el mouse está sobre la marca (Jcasas)
  const [showBrandMessage, setShowBrandMessage] = useState(false);

  // Estados para notificaciones y perfil...
  const [showNotifications, setShowNotifications] = useState(false);
  const [tieneNotificaciones, setTieneNotificaciones] = useState(true);
  const notifRef = useRef(null);

  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);

  const isLoginPage = location.pathname === "/login";
  const currentPath = location.pathname;

  

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  // Aplica el destello momentáneo a una sección
  const flashSection = (el) => {
    if (!el) return;
    el.classList.remove("section-highlight");
    void el.offsetWidth; // reinicia la animación si ya estaba aplicada
    el.classList.add("section-highlight");
    setTimeout(() => el.classList.remove("section-highlight"), 2400);
  };

  // Hace scroll suave a la sección y, solo en el menú, la resalta momentáneamente
  const scrollToHash = (href) => {
    const el = document.querySelector(href);
    if (!el) return;

    const isMenu = currentPath === "/menu";
    // La última sección (Bebidas) se centra: no hay contenido suficiente debajo
    // para alinearla arriba y el navegador no podría desplazarse.
    const block = isMenu && !el.nextElementSibling ? "center" : "start";

    el.scrollIntoView({ behavior: "smooth", block });

    if (!isMenu) return;

    const targets = [el];
    // Al ir a Almuerzo, resaltar también los componentes del almuerzo
    if (href === "#almuerzo") {
      const componentes = document.querySelector("#componentes");
      if (componentes) targets.push(componentes);
    }

    targets.forEach(flashSection);
  };

  // ... (tus demás funciones de cierre y navegación dinámicas se mantienen igual)
  const getDynamicNavContent = () => {
    switch (currentPath) {
      case "/":
      case "/inicio":
        return {
          type: "links",
          items: [
            { label: "Nosotros", href: "#nosotros" },
            { label: "Restaurante", href: "#restaurante" },
            { label: "Información", href: "#informacion" },
            { label: "Contacto", href: "#contacto" },
          ],
        };
      case "/menu":
        return {
          type: "links",
          items: [
            { label: "Almuerzo", href: "#almuerzo" },
            { label: "Bebidas", href: "#bebidas" },
            { label: "Adicionales", href: "#adicionales" },
          ],
        };
      case "/panel":
        return {
          type: "links",
          items: [
            { label: "Inventario", to: "/panel?tab=inventario" },
            { label: "Pedidos", to: "/panel?tab=pedidos" },
            { label: "Permisos", to: "/panel?tab=permisos" },
            { label: "Impresión", to: "/panel?tab=impresion" },
          ],
        };
      case "/carrito":
      case "/car":
        return {
          type: "text",
          icon: <FaBagShopping size={16} />,
          message: "Aquí podrás visualizar tus compras y el historial de las mismas",
        };
      case "/configuracion":
      case "/config":
        return {
          type: "text",
          icon: <FaCircleInfo size={16} />,
          message: "Aquí podrás configurar tus preferencias y ajustes del sistema",
        };
      case "/perfil":
        return {
          type: "text",
          icon: <FaUser size={16} />,
          message: "Aquí podrás administrar la información detallada de tu cuenta",
        };
      case "/login":
        return {
          type: "text",
          icon: <FaLock size={16} />,
          message: "Inicia sesión aquí y ahora para operar en el sistema",
        };
      case "/registro":
        return {
          type: "text",
          icon: <FaUserPen size={16} />,
          message: "Regístrate ahora y forma parte de Jcasas",
        };
      default:
        return {
          type: "text",
          icon: <FaCircleInfo size={16} />,
          message: "Sección informativa del sistema operativo",
        };
    }
  };

  const navContent = getDynamicNavContent();

  return (
    <header className="header-wrapper">
      <div className="header-main">
        {/* Contenedor de Marca con evento de hover */}
        <div className="header-brand-container">
          <Link 
            to="/" 
            className="header-brand-text" 
            onClick={closeMenu}
            onMouseEnter={() => setShowBrandMessage(true)}
            onMouseLeave={() => setShowBrandMessage(false)}
          >
            <span className="header-title">Jcasas</span>
            <span className="header-subtitle">Restaurante</span>
          </Link>

          {/* Mensaje emergente al pasar el mouse sobre Jcasas */}
          {showBrandMessage && (
            <div className="brand-hover-tooltip">
              ¿Qué vas a pedir hoy?
            </div>
          )}
        </div>

        <div className="header-right-group">
          {/* Campana de Notificaciones */}
          <div className="notification-wrapper-container" ref={notifRef} style={{ position: "relative" }}>
            <button 
              type="button" 
              className="header-notification-btn"
              title="Notificaciones"
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfile(false);
                if (tieneNotificaciones) setTieneNotificaciones(false);
              }}
            >
              <FaBell size={18} />
              {tieneNotificaciones && <span className="notification-badge-dot"></span>}
            </button>

            <NotificationsDropdown 
              isOpen={showNotifications} 
              onClose={() => setShowNotifications(false)} 
            />
          </div>

          {/* Botón de Perfil */}
          <div className="profile-wrapper-container" ref={profileRef} style={{ position: "relative" }}>
            <button 
              type="button" 
              className="header-notification-btn"
              title="Perfil de Usuario"
              onClick={() => {
                setShowProfile(!showProfile);
                setShowNotifications(false);
              }}
            >
              <FaUser size={18} />
            </button>

            <ProfileDropdown 
              isOpen={showProfile} 
              onClose={() => setShowProfile(false)} 
            />
          </div>

          {/* Acciones de Escritorio */}
          <div className="header-right-actions desktop-only">
            {isAuthenticated ? (
              <button
                type="button"
                className="header-auth-btn"
                onClick={logout}
                title="Cerrar sesión"
              >
                <FaRightFromBracket size={16} />
                <span>Cerrar sesión</span>
              </button>
            ) : (
              <NavLink
                to={isLoginPage ? "/registro" : "/login"}
                className="header-auth-btn"
                title={isLoginPage ? "Registrarse" : "Iniciar sesión"}
              >
                {isLoginPage ? <FaUserPlus size={16} /> : <FaArrowRightToBracket size={16} />}
                <span>{isLoginPage ? "Registrarse" : "Iniciar sesión"}</span>
              </NavLink>
            )}
          </div>

          <button
            type="button"
            className={`header-burger ${menuOpen ? "is-open" : ""}`}
            onClick={toggleMenu}
            aria-label="Abrir menú"
          >
            <span className="burger-line"></span>
            <span className="burger-line"></span>
            <span className="burger-line"></span>
          </button>
        </div>
      </div>

      {/* Barra secundaria con botones */}
      <nav className="header-subnav desktop-only">
        {navContent.type === "links" ? (
          <div className="subnav-links">
            {navContent.items.map((link, index) => {
              const handleActionClick = () => {
                if (link.to) {
                  navigate(link.to);
                } else if (link.href) {
                  scrollToHash(link.href);
                }
              };

              return (
                <button
                  key={index}
                  type="button"
                  className="subnav-link"
                  onClick={handleActionClick}
                >
                  {link.label}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="subnav-info-text">
            {navContent.icon}
            <span>{navContent.message}</span>
          </div>
        )}
      </nav>

      {/* Panel Móvil */}
      <nav className={`header-nav ${menuOpen ? "is-open" : ""}`}>
        <div className="mobile-menu-header">
          <span className="mobile-menu-title">
            {navContent.type === "links" ? "Opciones de Sección" : "Aviso"}
          </span>
        </div>

        <div className="mobile-nav-links-group">
          {navContent.type === "links" ? (
            navContent.items.map((link, index) => {
              const handleMobileActionClick = () => {
                closeMenu();
                if (link.to) {
                  navigate(link.to);
                } else if (link.href) {
                scrollToHash(link.href);
                }
              };

              return (
                <button
                  key={index}
                  type="button"
                  className="mobile-nav-link"
                  onClick={handleMobileActionClick}
                >
                  {link.label}
                </button>
              );
            })
          ) : (
            <div className="mobile-info-text-box">
              <div className="mobile-info-icon">{navContent.icon}</div>
              <p>{navContent.message}</p>
            </div>
          )}
        </div>

        <div className="mobile-auth-container">
          {isAuthenticated ? (
            <button
              type="button"
              className="header-register"
              onClick={() => { logout(); closeMenu(); }}
            >
              <FaRightFromBracket size={16} />
              <span>Cerrar sesión</span>
            </button>
          ) : (
            <NavLink
              to={isLoginPage ? "/registro" : "/login"}
              className="header-register"
              onClick={closeMenu}
            >
              {isLoginPage ? <FaUserPlus size={16} /> : <FaArrowRightToBracket size={16} />}
              <span>{isLoginPage ? "Registrarse" : "Iniciar sesión"}</span>
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;