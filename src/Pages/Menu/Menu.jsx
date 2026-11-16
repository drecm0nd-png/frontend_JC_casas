import React, { useState } from "react";
import { Plus } from "lucide-react";
import BebidasSection from "../../Components/BebidasSection/BebidasSection";
import TarjetasMenu from '../../Components/Tarjetas/TarjetasMenu';
import LunchBuilder from "../../Components/LunchBuilder/LunchBuilder";
import "./Menu.css";

export default function Menu() {
  const DatosPrincipio = [
    { id: 1, imagen: 'Frijoles', titulo: 'Frijoles Guisados', descripcion: 'Guisados estilo Tradicional.' },
    { id: 2, imagen: 'Lentejas', titulo: 'Lentejas Caseras', descripcion: 'Con ahogado de la casa.' }
  ];

  const DatosProteina = [
    { id: 1, imagen: 'Carne', titulo: 'Carne Asada', descripcion: 'Corte magro a la plancha.' },
    { id: 2, imagen: 'Pechuga', titulo: 'Pechuga a la plancha', descripcion: 'Fileteada con sazon casera.' }
  ];

  const DatosAcompanamiento = [
    { id: 1, imagen: 'Arroz', titulo: 'Arroz Blanco', descripcion: 'Porcion tradicional de la casa.' },
    { id: 2, imagen: 'Platano/Ensalada', titulo: 'Tajada o Ensalada', descripcion: 'Maduro frito o ensalda fresca.' }
  ];

  // Estados visuales principales
  const [openPrincipio, setOpenPrincipio] = useState(false);
  const [openProteina, setOpenProteina] = useState(false);
  const [openAcompanamiento, setOpenAcompanamiento] = useState(false);

  // Estado del Modal de armado de almuerzo
  const [modalAbierto, setModalAbierto] = useState(false);
  const [itemSeleccionado, setItemSeleccionado] = useState(null);

  const handleAbrirModal = (item) => {
    setItemSeleccionado(item);
    setModalAbierto(true);
  };

  const handleCerrarModal = () => {
    setModalAbierto(false);
    setItemSeleccionado(null);
  };

  return (
    <div className="menu-page-container">
      
      {/* Cabecera unificada */}
      <div className="global-header">
        <div>
          <span className="g-subtitle">Nuestra Carta</span>
          <h1 className="g-title">Menú de Almuerzos y Platos</h1>
          <p className="g-description">Control en tiempo real para la selección de platos y personalización.</p>
        </div>
        <div className="g-badge">
          <span>Jcasas POS</span>
        </div>
      </div>

      <div className="menu-main-content">

        {/* Banner Destacado del Almuerzo */}
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

        {/* COMPONENTES EN VISTA PRINCIPAL */}
        <section className="horizontal-section-group-3">
          <div className="lunch-section-title-wrapper">
            <h3>Componentes de tu almuerzo</h3>
          </div>

          <div className="third-column">
            <div className="category-header"><span className="step-number">1</span><h3>Opciones de Principio</h3></div>
            <button type="button" className={`category-toggle-btn ${openPrincipio ? "is-open" : ""}`} onClick={() => setOpenPrincipio(!openPrincipio)}>
              <span>Opciones de Principio</span><span className="toggle-arrow">▼</span>
            </button>
            <div className={`cards-grid-vertical ${openPrincipio ? "is-expanded" : ""}`}>
              {DatosPrincipio.map((item) => (
                <TarjetasMenu key={item.id} imagen={item.imagen} titulo={item.titulo} descripcion={item.descripcion} />
              ))}
            </div>
          </div>

          <div className="third-column">
            <div className="category-header"><span className="step-number">2</span><h3>Opciones de Proteína</h3></div>
            <button type="button" className={`category-toggle-btn ${openProteina ? "is-open" : ""}`} onClick={() => setOpenProteina(!openProteina)}>
              <span>Opciones de Proteína</span><span className="toggle-arrow">▼</span>
            </button>
            <div className={`cards-grid-vertical ${openProteina ? "is-expanded" : ""}`}>
              {DatosProteina.map((item) => (
                <TarjetasMenu key={item.id} imagen={item.imagen} titulo={item.titulo} descripcion={item.descripcion} />
              ))}
            </div> 
          </div>

          <div className="third-column">
            <div className="category-header"><span className="step-number">3</span><h3>Acompañamientos</h3></div>
            <button type="button" className={`category-toggle-btn ${openAcompanamiento ? "is-open" : ""}`} onClick={() => setOpenAcompanamiento(!openAcompanamiento)}>
              <span>Acompañamientos</span><span className="toggle-arrow">▼</span>
            </button>
            <div className={`cards-grid-vertical ${openAcompanamiento ? "is-expanded" : ""}`}>
              {DatosAcompanamiento.map((item) => (
                <TarjetasMenu key={item.id} imagen={item.imagen} titulo={item.titulo} descripcion={item.descripcion} />
              ))}
            </div>
          </div>
        </section>

        {/* ADICIONALES */}
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
                  <button type="button" className="btn-add" onClick={() => handleAbrirModal({ nombre: "Sopa de Ajiaco Santafereño", precio: 8000 })}>
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
                  <button type="button" className="btn-add" onClick={() => handleAbrirModal({ nombre: "Sopa de Sancocho", precio: 7500 })}>
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
                  <button type="button" className="btn-add" onClick={() => handleAbrirModal({ nombre: "Ensalada Especial", precio: 6500 })}>
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <BebidasSection onSelectBebida={handleAbrirModal} />

      </div>

      {/* COMPONENTE INDEPENDIENTE DE ARMADO DE ALMUERZO */}
      <LunchBuilder 
        isOpen={modalAbierto} 
        onClose={handleCerrarModal} 
        itemSeleccionado={itemSeleccionado} 
      />

    </div>
  );
}