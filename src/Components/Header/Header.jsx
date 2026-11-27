import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Hooks/UseAuth.js";
import { scrollToSection } from "../../Utils/ScrollToSection.js";
import {
  FaArrowRightToBracket,
  FaRightFromBracket,
  FaUserPlus,
  FaBagShopping,
  FaLock,
  FaUserPen,
  FaCircleInfo,
  FaBell,
  FaUser,
} from "react-icons/fa6";
import NotificationsDropdown from "../NotificationsDropdown/NotificationsDropdown";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";
import "./Header.css";

const PROFILE_TABS = [
  { id: "perfil", label: "Perfil" },
  { id: "seguridad", label: "Seguridad" },
  { id: "notificaciones", label: "Notificaciones" },
  { id: "preferencias", label: "Preferencias" },
  { id: "cuenta", label: "Cuenta" },
];

function Header() {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState(location.hash || "#lp-portada");

  const [showBrandMessage, setShowBrandMessage] = useState(false);

  const [showNotifications, setShowNotifications] = useState(false);
  const [tieneNotificaciones, setTieneNotificaciones] = useState(true);
  const notifRef = useRef(null);

  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);

  const isLoginPage = location.pathname === "/login";
  const currentPath = location.pathname;

  useEffect(() => {
    setActiveHash(
      location.hash ||
        (currentPath === "/" || currentPath === "/inicio" ? "#lp-portada" : "")
    );
  }, [location.pathname, location.hash, currentPath]);

  useEffect(() => {
    const hashTargets = {
      "/": ["#lp-portada", "#nosotros", "#menu", "#cobertura", "#preguntas-contacto"],
      "/inicio": ["#lp-portada", "#nosotros", "#menu", "#cobertura", "#preguntas-contacto"],
      "/menu": ["#almuerzo", "#bebidas", "#adicionales"],
    };

    const targets = hashTargets[currentPath];
    if (!targets) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      let currentSection = "";

      for (const selector of targets) {
        const el = document.querySelector(selector);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentSection = selector;
            break;
          }
        }
      }

      if (currentSection) {
        setActiveHash(currentSection);
      } else if (
        window.scrollY < 140 &&
        (currentPath === "/" || currentPath === "/inicio")
      ) {
        setActiveHash("#lp-portada");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPath]);

  const currentProfileTab = (() => {
    if (location.state?.tab) return location.state.tab;
    const params = new URLSearchParams(location.search);
    const tabFromUrl = params.get("tab");
    if (tabFromUrl) return tabFromUrl;
    try {
      return JSON.parse(localStorage.getItem("cfg:section") || '"perfil"');
    } catch {
      return "perfil";
    }
  })();

  const currentPanelTab = (() => {
    const params = new URLSearchParams(location.search);
    return params.get("tab") || "inventario";
  })();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const selectProfileTab = (tabId) => {
    try {
      localStorage.setItem("cfg:section", JSON.stringify(tabId));
    } catch {
      // Ignorado si no hay acceso a localStorage
    }
    window.dispatchEvent(new CustomEvent("cfg:tab-change", { detail: tabId }));
    navigate(`/perfil?tab=${tabId}`, { state: { tab: tabId } });
  };

  const isLinkActive = (link) => {
    if (link.tabId) {
      return currentProfileTab === link.tabId;
    }
    if (link.to) {
      const [pathname, query] = link.to.split("?");
      if (query) {
        const params = new URLSearchParams(query);
        const targetTab = params.get("tab");
        return targetTab ? currentPanelTab === targetTab : false;
      }
      return currentPath === pathname;
    }
    if (link.href) {
      if (
        link.href === "#lp-portada" &&
        !activeHash &&
        (currentPath === "/" || currentPath === "/inicio")
      ) {
        return true;
      }
      return activeHash === link.href;
    }
    return false;
  };

  const getDynamicNavContent = () => {
    switch (currentPath) {
      case "/":
      case "/inicio":
        return {
          type: "links",
          items: [
            { label: "Inicio", href: "#lp-portada" },
            { label: "Nosotros", href: "#nosotros" },
            { label: "Nuestro menú", href: "#menu" },
            { label: "Horarios y ubicación", href: "#cobertura" },
            { label: "Preguntas y contacto", href: "#preguntas-contacto" },
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
      case "/perfil":
        return {
          type: "links",
          items: PROFILE_TABS.map((tab) => ({
            label: tab.label,
            tabId: tab.id,
            isDanger: tab.id === "cuenta",
          })),
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

  const handleItemAction = (link) => {
    if (link.tabId) {
      selectProfileTab(link.tabId);
    } else if (link.to) {
      navigate(link.to);
    } else if (link.href) {
      setActiveHash(link.href);
      const sectionId = link.href.replace(/^#/, "");
      if (sectionId === "lp-portada") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const element =
        document.getElementById(sectionId) || document.querySelector(link.href);
      if (element) {
        const headerOffset =
          document.querySelector(".header-wrapper")?.offsetHeight || 90;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: Math.max(0, elementPosition - headerOffset - 12),
          behavior: "smooth",
        });
      } else {
        scrollToSection(sectionId);
      }
    }
  };

  return (
    <header className="header-wrapper">
      <div className="header-main">
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

          {showBrandMessage && (
            <div className="brand-hover-tooltip">¿Qué vas a pedir hoy?</div>
          )}
        </div>

        <div className="header-right-group">
          <div
            className="notification-wrapper-container"
            ref={notifRef}
            style={{ position: "relative" }}
          >
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
              {tieneNotificaciones && (
                <span className="notification-badge-dot"></span>
              )}
            </button>

            <NotificationsDropdown
              isOpen={showNotifications}
              onClose={() => setShowNotifications(false)}
            />
          </div>

          <div
            className="profile-wrapper-container"
            ref={profileRef}
            style={{ position: "relative" }}
          >
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
                {isLoginPage ? (
                  <FaUserPlus size={16} />
                ) : (
                  <FaArrowRightToBracket size={16} />
                )}
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

      <nav className="header-subnav desktop-only">
        {navContent.type === "links" ? (
          <div className="subnav-links">
            {navContent.items.map((link, index) => {
              const active = isLinkActive(link);
              return (
                <button
                  key={index}
                  type="button"
                  className={`subnav-link ${active ? "is-active" : ""} ${
                    link.isDanger ? "is-danger" : ""
                  }`}
                  aria-current={active ? "page" : undefined}
                  onClick={() => handleItemAction(link)}
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

      <nav className={`header-nav ${menuOpen ? "is-open" : ""}`}>
        <div className="mobile-menu-header">
          <span className="mobile-menu-title">
            {navContent.type === "links" ? "Opciones de Sección" : "Aviso"}
          </span>
        </div>

        <div className="mobile-nav-links-group">
          {navContent.type === "links" ? (
            navContent.items.map((link, index) => {
              const active = isLinkActive(link);
              return (
                <button
                  key={index}
                  type="button"
                  className={`mobile-nav-link ${active ? "is-active" : ""} ${
                    link.isDanger ? "is-danger" : ""
                  }`}
                  aria-current={active ? "page" : undefined}
                  onClick={() => {
                    closeMenu();
                    handleItemAction(link);
                  }}
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
              onClick={() => {
                logout();
                closeMenu();
              }}
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
              {isLoginPage ? (
                <FaUserPlus size={16} />
              ) : (
                <FaArrowRightToBracket size={16} />
              )}
              <span>{isLoginPage ? "Registrarse" : "Iniciar sesión"}</span>
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;