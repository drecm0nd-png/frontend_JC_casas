import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStopwatch } from "react-icons/fa6";
import { Plus, X } from "lucide-react";
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

  // Estados del formulario dentro del modal
  const [principio, setPrincipio] = useState("");
  const [proteina, setProteina] = useState("");
  const [acompanamiento, setAcompanamiento] = useState("");
  const [observaciones, setObservaciones] = useState("");

  // Abrir Modal con el producto base seleccionado
  const handleAbrirModal = (item) => {
    setItemSeleccionado(item);
    setPrincipio("");
    setProteina("");
    setAcompanamiento("");
    setObservaciones("");
    setModalAbierto(true);
  };

  // Cerrar y limpiar Modal
  const handleCerrarModal = () => {
    setModalAbierto(false);
    setItemSeleccionado(null);
    setPrincipio("");
    setProteina("");
    setAcompanamiento("");
    setObservaciones("");
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
        
        {/* Banner interactivo de Estado del Pedido */}
        <button
          type="button"
          className="order-status-banner-btn"
          onClick={() => navigate("/pedidos")}
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
          <span className="banner-arrow" aria-hidden="true">
            &gt;
          </span>
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

      {/* MINI VENTANA EMERGENTE (MODAL CON PASOS UNIFICADOS) */}
      {modalAbierto && (
        <div className="modal-overlay" onClick={handleCerrarModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            
            {/* Encabezado del Modal */}
            <div className="modal-header">
              <div>
                <p className="modal-subtitle">Personalización</p>
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

            {/* Formulario */}
            <form onSubmit={handleGuardarAlmuerzo} className="modal-body">
              
              {/* Paso 1: Principio */}
              <div className="form-group">
                <label>1. Selecciona un Principio / Grano</label>
                <select 
                  value={principio} 
                  onChange={(e) => setPrincipio(e.target.value)}
                  required
                >
                  <option value="">-- Elige un principio --</option>
                  <option value="Fríjoles Guisados">Fríjoles Guisados</option>
                  <option value="Lentejas Caseras">Lentejas Caseras</option>
                  <option value="Sopa del día">Sopa del día</option>
                </select>
              </div>

              {/* Paso 2: Proteína */}
              <div className="form-group">
                <label>2. Selecciona una Proteína / Carne</label>
                <select 
                  value={proteina} 
                  onChange={(e) => setProteina(e.target.value)}
                  required
                >
                  <option value="">-- Elige una proteína --</option>
                  <option value="Carne Asada">Carne Asada</option>
                  <option value="Pechuga a la Plancha">Pechuga a la Plancha</option>
                  <option value="Carne Molida">Carne Molida</option>
                  <option value="Chicharrón">Chicharrón</option>
                </select>
              </div>

              {/* Paso 3: Acompañamiento */}
              <div className="form-group">
                <label>3. Selecciona un Acompañamiento</label>
                <select 
                  value={acompanamiento} 
                  onChange={(e) => setAcompanamiento(e.target.value)}
                  required
                >
                  <option value="">-- Elige un acompañamiento --</option>
                  <option value="Arroz Blanco y Tajada">Arroz Blanco y Tajada</option>
                  <option value="Ensalada Dulce">Ensalada Dulce</option>
                  <option value="Papa Cocida">Papa Cocida</option>
                </select>
              </div>

              {/* Observaciones generales */}
              <div className="form-group">
                <label>Observaciones o Notas (Opcional)</label>
                <textarea
                  placeholder="Ej: Sin hielo, azúcar separada, poco arroz..."
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                  rows={2}
                />
              </div>

              {/* Botones de Acción */}
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={handleCerrarModal}>
                  Cancelar
                </button>
                <button type="submit" className="btn-save">
                  Agregar (${itemSeleccionado?.precio?.toLocaleString("es-CO")})
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}