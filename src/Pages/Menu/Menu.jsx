import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer.jsx";
import "./Menu.css";

export default function Menu() {
  const navigate = useNavigate();

  // Estados para controlar qué categoría se despliega en móviles
  const [openPrincipio, setOpenPrincipio] = useState(false);
  const [openProteina, setOpenProteina] = useState(false);
  const [openAcompanamiento, setOpenAcompanamiento] = useState(false);

  return (
    <div className="menu-page-container">
      <main className="menu-main-content">
        
        {/* Banner interactivo de Estado del Pedido que redirige a /pedidos */}
        <button 
          type="button" 
          className="order-status-banner-btn"
          onClick={() => navigate("/pedidos")}
        >
          <div className="banner-content">
            <span className="banner-icon" role="img" aria-label="Reloj">⏱️</span>
            <div className="banner-text">
              <strong>Tu pedido va en camino</strong>
              <small>Tiempo estimado de llegada: 10 a 15 min</small>
            </div>
          </div>
          <span className="banner-arrow" aria-hidden="true">&gt;</span>
        </button>

        {/* Banner Destacado del Almuerzo Tradicional */}
        <section className="hero-dish-card">
          <div className="hero-overlay">
            <div className="hero-info">
              <span className="hero-badge">Plato Principal</span>
              <h2>Almuerzo Corriente / Ejecutivo</h2>
              <p>Incluye: 1 Principio + 1 Proteína + Acompañamiento + Bebida</p>
              <span className="hero-price">22.500$</span>
            </div>
            <button className="btn-primary-action">Armar mi Almuerzo</button>
          </div>
        </section>

        {/* SECCIÓN AGRUPADA DE INGREDIENTES CON DEGRADADO Y ENCABEZADOS */}
        <section className="horizontal-section-group-3">
          
          {/* Título de la sección para dar contexto */}
          <div className="lunch-section-title-wrapper">
            <h3>Componentes de tu almuerzo</h3>
          </div>

          {/* Columna 1: Principios */}
          <div className="third-column">
            {/* Cabecera visible en escritorio */}
            <div className="category-header">
              <span className="step-number">1</span>
              <h3>Opciones de Principio</h3>
            </div>

            {/* Botón interactivo visible en móvil */}
            <button 
              type="button"
              className={`category-toggle-btn ${openPrincipio ? "is-open" : ""}`}
              onClick={() => setOpenPrincipio(!openPrincipio)}
            >
              <span>Opciones de Principio</span>
              <span className="toggle-arrow">▼</span>
            </button>

            {/* Cuadrícula de tarjetas */}
            <div className={`cards-grid-vertical ${openPrincipio ? "is-expanded" : ""}`}>
              <div className="mini-card">
                <div className="mini-card-img">Fríjoles</div>
                <div className="mini-card-body">
                  <h4>Fríjoles Guisados</h4>
                  <p>Guisados estilo tradicional.</p>
                </div>
              </div>

              <div className="mini-card">
                <div className="mini-card-img">Lentejas</div>
                <div className="mini-card-body">
                  <h4>Lentejas Caseras</h4>
                  <p>Con ahogado de la casa.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Columna 2: Proteínas */}
          <div className="third-column">
            {/* Cabecera visible en escritorio */}
            <div className="category-header">
              <span className="step-number">2</span>
              <h3>Opciones de Proteína</h3>
            </div>

            {/* Botón interactivo visible en móvil */}
            <button 
              type="button"
              className={`category-toggle-btn ${openProteina ? "is-open" : ""}`}
              onClick={() => setOpenProteina(!openProteina)}
            >
              <span>Opciones de Proteína</span>
              <span className="toggle-arrow">▼</span>
            </button>

            {/* Cuadrícula de tarjetas */}
            <div className={`cards-grid-vertical ${openProteina ? "is-expanded" : ""}`}>
              <div className="mini-card">
                <div className="mini-card-img">Carne</div>
                <div className="mini-card-body">
                  <h4>Carne Asada</h4>
                  <p>Corte magro a la plancha.</p>
                </div>
              </div>

              <div className="mini-card">
                <div className="mini-card-img">Pechuga</div>
                <div className="mini-card-body">
                  <h4>Pechuga a la Plancha</h4>
                  <p>Fileteada con sazón casera.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Columna 3: Acompañamientos */}
          <div className="third-column">
            {/* Cabecera visible en escritorio */}
            <div className="category-header">
              <span className="step-number">3</span>
              <h3>Acompañamientos</h3>
            </div>

            {/* Botón interactivo visible en móvil */}
            <button 
              type="button"
              className={`category-toggle-btn ${openAcompanamiento ? "is-open" : ""}`}
              onClick={() => setOpenAcompanamiento(!openAcompanamiento)}
            >
              <span>Acompañamientos</span>
              <span className="toggle-arrow">▼</span>
            </button>

            {/* Cuadrícula de tarjetas */}
            <div className={`cards-grid-vertical ${openAcompanamiento ? "is-expanded" : ""}`}>
              <div className="mini-card">
                <div className="mini-card-img">Arroz</div>
                <div className="mini-card-body">
                  <h4>Arroz Blanco</h4>
                  <p>Porción tradicional de la casa.</p>
                </div>
              </div>

              <div className="mini-card">
                <div className="mini-card-img">Plátano / Ensalada</div>
                <div className="mini-card-body">
                  <h4>Tajada o Ensalada</h4>
                  <p>Maduro frito o ensalada fresca.</p>
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* ADICIONALES: SOPAS Y ENSALADAS */}
        <section className="extra-section">
          <h2 className="section-title">Adicionales: Sopas &amp; Ensaladas</h2>
          <div className="cards-grid-3">
            <div className="extra-card">
              <div className="extra-img">Sopa de Ajiaco</div>
              <div className="extra-body">
                <h4>Sopa de Ajiaco Santafereño</h4>
                <p>Con pollo, mazorca, alcaparras y crema de leche.</p>
                <div className="extra-footer">
                  <span className="price">8.000$</span>
                  <button className="btn-add">+</button>
                </div>
              </div>
            </div>

            <div className="extra-card">
              <div className="extra-img">Sancocho</div>
              <div className="extra-body">
                <h4>Sopa de Sancocho</h4>
                <p>Sopa especial con plátano, yuca y verdura fresca.</p>
                <div className="extra-footer">
                  <span className="price">7.500$</span>
                  <button className="btn-add">+</button>
                </div>
              </div>
            </div>

            <div className="extra-card">
              <div className="extra-img">Ensalada</div>
              <div className="extra-body">
                <h4>Ensalada Especial</h4>
                <p>Aguacate, maíz dulce, queso y lechugas.</p>
                <div className="extra-footer">
                  <span className="price">6.500$</span>
                  <button className="btn-add">+</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BEBIDAS */}
        <section className="extra-section">
          <h2 className="section-title">Bebidas</h2>
          <div className="cards-grid-3">
            <div className="extra-card">
              <div className="extra-img">Jugos</div>
              <div className="extra-body">
                <h4>Jugos Naturales</h4>
                <p>Maracuyá, Mora, Mango o Lulo en agua o leche.</p>
                <div className="extra-footer">
                  <span className="price">4.000$</span>
                  <button className="btn-add">+</button>
                </div>
              </div>
            </div>

            <div className="extra-card">
              <div className="extra-img">Limonada</div>
              <div className="extra-body">
                <h4>Limonada Cerezada</h4>
                <p>Refrescante limonada recién preparada con hielo.</p>
                <div className="extra-footer">
                  <span className="price">5.500$</span>
                  <button className="btn-add">+</button>
                </div>
              </div>
            </div>

            <div className="extra-card">
              <div className="extra-img">Gaseosas</div>
              <div className="extra-body">
                <h4>Gaseosas y Refrescos</h4>
                <p>Coca-Cola, Sprite, Colombiana o Postobón personal.</p>
                <div className="extra-footer">
                  <span className="price">3.500$</span>
                  <button className="btn-add">+</button>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}