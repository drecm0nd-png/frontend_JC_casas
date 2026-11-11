import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStopwatch } from "react-icons/fa6";
import { Plus, X, ArrowLeft, LogIn } from "lucide-react";
import BebidasSection from "../../Components/BebidasSection/BebidasSection";
import "./Menu.css";

export default function Menu() {
  const navigate = useNavigate();

  // Estados para controlar qué categoría se despliega en móviles
  const [openPrincipio, setOpenPrincipio] = useState(false);
  const [openProteina, setOpenProteina] = useState(false);
  const [openAcompanamiento, setOpenAcompanamiento] = useState(false);

  // Estados para la ventana emergente (Modal)
  const [modalAbierto, setModalAbierto] = useState(false);
  const [itemSeleccionado, setItemSeleccionado] = useState(null);
  
  // Estado para controlar el paso actual del formulario (1 al 4)
  const [pasoActual, setPasoActual] = useState(1);

  // Estados del formulario dentro del modal[cite: 5]
  const [principio, setPrincipio] = useState("");
  const [proteina, setProteina] = useState("");
  const [acompanamiento, setAcompanamiento] = useState("");
  const [observaciones, setObservaciones] = useState("");

  // Abrir Modal con el producto base seleccionado y reiniciar pasos
  const handleAbrirModal = (item) => {
    setItemSeleccionado(item);
    setPrincipio("");
    setProteina("");
    setAcompanamiento("");
    setObservaciones("");
    setPasoActual(1);
    setModalAbierto(true);
  };

  // Cerrar y limpiar Modal
  const handleCerrarModal = () => {
    setModalAbierto(false);
    setItemSeleccionado(null);
    setPasoActual(1);
  };

  // Funciones de Auto-Avance al seleccionar un ingrediente
  const handleSelectPrincipio = (e) => {
    setPrincipio(e.target.value);
    if (e.target.value) {
      setTimeout(() => setPasoActual(2), 350);
    }
  };

  const handleSelectProteina = (e) => {
    setProteina(e.target.value);
    if (e.target.value) {
      setTimeout(() => setPasoActual(3), 350);
    }
  };

  const handleSelectAcompanamiento = (e) => {
    setAcompanamiento(e.target.value);
    if (e.target.value) {
      setTimeout(() => setPasoActual(4), 350);
    }
  };

  // Confirmar creación del pedido
  const handleGuardarAlmuerzo = (e) => {
    e.preventDefault();
    const nuevoPedido = {
      base: itemSeleccionado,
      principio,
      proteina,
      acompanamiento,
      observaciones
    };

    console.log("Pedido agregado exitosamente:", nuevoPedido);
    alert(`¡${itemSeleccionado?.nombre} agregado al pedido con éxito!`);
    handleCerrarModal();
  };

  return (
    <div className="menu-page-container">
      <div className="menu-main-content">
        {/* Banner interactivo de Estado del Pedido que redirige a /car */}
        <button
          type="button"
          className="order-status-banner-btn"
          onClick={() => navigate("/car")}
        >
          <div className="banner-content">
            <span className="banner-icon" aria-hidden="true">
              <FaStopwatch />
            </span>
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
            <button 
              type="button"
              className="btn-primary-action"
              onClick={() => handleAbrirModal({ nombre: "Almuerzo Corriente / Ejecutivo", precio: 22500 })}
            >
              Armar mi Almuerzo
            </button>
          </div>
        </section>

        {/* SECCIÓN AGRUPADA DE INGREDIENTES */}
        <section className="horizontal-section-group-3">
          <div className="lunch-section-title-wrapper">
            <h3>Componentes de tu almuerzo</h3>
          </div>

          {/* Columna 1: Principios */}
          <div className="third-column">
            <div className="category-header">
              <span className="step-number">1</span>
              <h3>Opciones de Principio</h3>
            </div>
            <button
              type="button"
              className={`category-toggle-btn ${openPrincipio ? "is-open" : ""}`}
              onClick={() => setOpenPrincipio(!openPrincipio)}
            >
              <span>Opciones de Principio</span>
              <span className="toggle-arrow">▼</span>
            </button>
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
            <div className="category-header">
              <span className="step-number">2</span>
              <h3>Opciones de Proteína</h3>
            </div>
            <button
              type="button"
              className={`category-toggle-btn ${openProteina ? "is-open" : ""}`}
              onClick={() => setOpenProteina(!openProteina)}
            >
              <span>Opciones de Proteína</span>
              <span className="toggle-arrow">▼</span>
            </button>
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
            <div className="category-header">
              <span className="step-number">3</span>
              <h3>Acompañamientos</h3>
            </div>
            <button
              type="button"
              className={`category-toggle-btn ${openAcompanamiento ? "is-open" : ""}`}
              onClick={() => setOpenAcompanamiento(!openAcompanamiento)}
            >
              <span>Acompañamientos</span>
              <span className="toggle-arrow">▼</span>
            </button>
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
                  <button 
                    type="button" 
                    className="btn-add"
                    onClick={() => handleAbrirModal({ nombre: "Sopa de Ajiaco Santafereño", precio: 8000 })}
                  >
                    <Plus size={18} />
                  </button>
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
                  <button 
                    type="button" 
                    className="btn-add"
                    onClick={() => handleAbrirModal({ nombre: "Sopa de Sancocho", precio: 7500 })}
                  >
                    <Plus size={18} />
                  </button>
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
                  <button 
                    type="button" 
                    className="btn-add"
                    onClick={() => handleAbrirModal({ nombre: "Ensalada Especial", precio: 6500 })}
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COMPONENTE REUTILIZABLE DE BEBIDAS */}
        <BebidasSection onSelectBebida={handleAbrirModal} />

      </div>

      {/* VENTANA EMERGENTE (MODAL WIZARD PASO A PASO) */}
      {modalAbierto && (
        <div className="modal-overlay" onClick={handleCerrarModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            
            {/* Encabezado del Modal */}
            <div className="modal-header">
              <div>
                <p className="modal-subtitle">Personalización guiada</p>
                <h3>{itemSeleccionado?.nombre}</h3>
              </div>
              <button 
                type="button" 
                className="btn-close-modal" 
                onClick={handleCerrarModal}
                title="Cerrar"
              >
                <X size={18} />
              </button>
            </div>

            {/* Stepper (Indicador visual de pasos) */}
            <div className="stepper-wrapper">
              <div className={`step-item ${pasoActual >= 1 ? "active" : ""}`}>1</div>
              <div className={`step-line ${pasoActual >= 2 ? "active" : ""}`}></div>
              <div className={`step-item ${pasoActual >= 2 ? "active" : ""}`}>2</div>
              <div className={`step-line ${pasoActual >= 3 ? "active" : ""}`}></div>
              <div className={`step-item ${pasoActual >= 3 ? "active" : ""}`}>3</div>
              <div className={`step-line ${pasoActual >= 4 ? "active" : ""}`}></div>
              <div className={`step-item ${pasoActual >= 4 ? "active" : ""}`}>4</div>
            </div>

            {/* Formulario Dinámico */}
            <form onSubmit={handleGuardarAlmuerzo} className="modal-body step-body">
              
              {pasoActual === 1 && (
                <div className="step-content fade-in">
                  <label className="step-label">Selecciona un Principio / Grano</label>
                  <p className="step-desc">Elige la base de tu almuerzo para continuar.</p>
                  <select 
                    value={principio} 
                    onChange={handleSelectPrincipio}
                    required
                    className="step-select"
                  >
                    <option value="">-- Elige un principio --</option>
                    <option value="Fríjoles Guisados">Fríjoles Guisados</option>
                    <option value="Lentejas Caseras">Lentejas Caseras</option>
                    <option value="Sopa del día">Sopa del día</option>
                  </select>
                </div>
              )}

              {pasoActual === 2 && (
                <div className="step-content fade-in">
                  <label className="step-label">Selecciona una Proteína / Carne</label>
                  <p className="step-desc">¿Qué proteína deseas agregar hoy?</p>
                  <select 
                    value={proteina} 
                    onChange={handleSelectProteina}
                    required
                    className="step-select"
                  >
                    <option value="">-- Elige una proteína --</option>
                    <option value="Carne Asada">Carne Asada</option>
                    <option value="Pechuga a la Plancha">Pechuga a la Plancha</option>
                    <option value="Carne Molida">Carne Molida</option>
                    <option value="Chicharrón">Chicharrón</option>
                  </select>
                </div>
              )}

              {pasoActual === 3 && (
                <div className="step-content fade-in">
                  <label className="step-label">Selecciona un Acompañamiento</label>
                  <p className="step-desc">Elige el contorno ideal para tu plato.</p>
                  <select 
                    value={acompanamiento} 
                    onChange={handleSelectAcompanamiento}
                    required
                    className="step-select"
                  >
                    <option value="">-- Elige un acompañamiento --</option>
                    <option value="Arroz Blanco y Tajada">Arroz Blanco y Tajada</option>
                    <option value="Ensalada Dulce">Ensalada Dulce</option>
                    <option value="Papa Cocida">Papa Cocida</option>
                  </select>
                </div>
              )}

              {pasoActual === 4 && (
                <div className="step-content fade-in">
                  <label className="step-label">Observaciones (Opcional)</label>
                  <p className="step-desc">¿Algún detalle extra para la cocina?</p>
                  <textarea
                    placeholder="Ej: Sin hielo, azúcar separada, poco arroz..."
                    value={observaciones}
                    onChange={(e) => setObservaciones(e.target.value)}
                    rows={2}
                    className="step-textarea"
                  />
                  
                  {/* Banner Requerido de Autenticación */}
                  <div className="login-prompt-banner">
                    <div className="login-prompt-info">
                      <LogIn size={18} />
                      <span>Inicia sesión para generar tu pedido.</span>
                    </div>
                    <button 
                      type="button" 
                      className="btn-login-redirect" 
                      onClick={() => navigate("/login")}
                    >
                      Iniciar Sesión
                    </button>
                  </div>
                </div>
              )}

              {/* Botones de Navegación Inferior */}
              <div className="modal-actions step-actions">
                {pasoActual > 1 ? (
                  <button type="button" className="btn-cancel" onClick={() => setPasoActual(pasoActual - 1)}>
                    <ArrowLeft size={16} style={{ marginRight: '4px' }} /> Atrás
                  </button>
                ) : (
                  <button type="button" className="btn-cancel" onClick={handleCerrarModal}>
                    Cancelar
                  </button>
                )}

                {pasoActual < 4 ? (
                  <button 
                    type="button" 
                    className="btn-save" 
                    onClick={() => setPasoActual(pasoActual + 1)}
                    disabled={(pasoActual === 1 && !principio) || (pasoActual === 2 && !proteina) || (pasoActual === 3 && !acompanamiento)}
                  >
                    Siguiente
                  </button>
                ) : (
                  <button type="submit" className="btn-save btn-finish">
                    Agregar (${itemSeleccionado?.precio?.toLocaleString("es-CO")})
                  </button>
                )}
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}