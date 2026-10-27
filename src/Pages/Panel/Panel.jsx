import { useState, useRef } from "react";
import InventarioM from "./ComponentPanel/InventarioM/InventarioM.jsx";
import InventarioAd from "./ComponentPanel/InventarioAdicional/InventarioAd.jsx";
import Permisos from "./ComponentPanel/Permisos/Permisos.jsx";
import Impresion from "./ComponentPanel/Impresion/Impresion.jsx";
import "./Panel.css";

export default function Panel() {
  const [activeTab, setActiveTab] = useState("menu");
  const scrollRef = useRef(null);

  // Función para desplazar la barra con las flechas
  const scrollNav = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -250 : 250;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="panel-page-container">
      <main className="panel-main-content">
        
        {/* Cabecera Superior del Panel */}
        <header className="panel-top-bar">
          <div className="panel-brand-group">
            <span className="panel-badge-admin">Panel de Administración</span>
          </div>
        </header>

        {/* Contenedor con Flechas Laterales y Barra de Pestañas */}
        <div className="panel-subnav-container">
          <button className="nav-arrow-btn left" onClick={() => scrollNav("left")} title="Desplazar izquierda">
            ‹
          </button>

          <nav className="panel-subnav" ref={scrollRef} aria-label="Secciones del panel">
            <button 
              className={`subnav-btn ${activeTab === "menu" ? "active" : ""}`}
              onClick={() => setActiveTab("menu")}
            >
              Gestion del Menu
            </button>
            <button 
              className={`subnav-btn ${activeTab === "adicionales" ? "active" : ""}`}
              onClick={() => setActiveTab("adicionales")}
            >
              Gestion de Adicionales
            </button>
            <button 
              className={`subnav-btn ${activeTab === "pedidos" ? "active" : ""}`}
              onClick={() => setActiveTab("pedidos")}
            >
              Pedidos
            </button>
            <button 
              className={`subnav-btn ${activeTab === "permisos" ? "active" : ""}`}
              onClick={() => setActiveTab("permisos")}
            >
              Permisos
            </button>
            <button 
              className={`subnav-btn ${activeTab === "configuracion" ? "active" : ""}`}
              onClick={() => setActiveTab("configuracion")}
            >
              Configuración
            </button>
            <button 
              className={`subnav-btn ${activeTab === "impresion" ? "active" : ""}`}
              onClick={() => setActiveTab("impresion")}
            >
              Impresión
            </button>
          </nav>

          <button className="nav-arrow-btn right" onClick={() => scrollNav("right")} title="Desplazar derecha">
            ›
          </button>
        </div>

        {/* Contenido Dinámico */}
        <section className="panel-content-box">
          {activeTab === "menu" && <InventarioM />}

          {activeTab === "adicionales" && <InventarioAd />}

          {activeTab === "pedidos" && (
            <div>
              <h2 className="section-title">Gestión de Pedidos</h2>
              <p className="section-desc">Visualiza y actualiza el estado de las entregas asignadas.</p>
            </div>
          )}

          {activeTab === "permisos" && <Permisos />}

          {activeTab === "configuracion" && (
            <div>
              <h2 className="section-title">Configuración</h2>
              <p className="section-desc">Ajustes generales del sistema.</p>
            </div>
          )}

          {activeTab === "impresion" && <Impresion />}
        </section>

      </main>
    </div>
  );
}