import { useState, useRef } from "react";
import InventarioM from "./ComponentPanel/InventarioM/InventarioM.jsx";
import InventarioAd from "./ComponentPanel/InventarioAdicional/InventarioAd.jsx";
import Permisos from "./ComponentPanel/Permisos/Permisos.jsx";
import Impresion from "./ComponentPanel/Impresion/Impresion.jsx";
import Pedidos from "./ComponentPanel/Pedidos/Pedidos.jsx"; 

// 1. IMPORTA TU NUEVO COMPONENTE DE CONFIGURACIÓN
import Configuracion from "./ComponentPanel/Configuracion/Configuracion.jsx";

import "./Panel.css";

export default function Panel() {
  const [activeTab, setActiveTab] = useState("menu");
  const scrollRef = useRef(null);

  const scrollNav = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -250 : 250;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="panel-page-container">
      <div className="panel-main-content">
        <header className="panel-top-bar">
          <div className="panel-brand-group">
            <span className="panel-badge-admin">Panel de Administración</span>
          </div>
        </header>

        <div className="panel-subnav-container">
          <button className="nav-arrow-btn left" onClick={() => scrollNav("left")}>‹</button>

          <nav className="panel-subnav" ref={scrollRef}>
            <button className={`subnav-btn ${activeTab === "menu" ? "active" : ""}`} onClick={() => setActiveTab("menu")}>Gestion del Menu</button>
            <button className={`subnav-btn ${activeTab === "adicionales" ? "active" : ""}`} onClick={() => setActiveTab("adicionales")}>Gestion de Adicionales</button>
            <button className={`subnav-btn ${activeTab === "pedidos" ? "active" : ""}`} onClick={() => setActiveTab("pedidos")}>Pedidos</button>
            <button className={`subnav-btn ${activeTab === "permisos" ? "active" : ""}`} onClick={() => setActiveTab("permisos")}>Permisos</button>
            <button className={`subnav-btn ${activeTab === "configuracion" ? "active" : ""}`} onClick={() => setActiveTab("configuracion")}>Configuración</button>
            <button className={`subnav-btn ${activeTab === "impresion" ? "active" : ""}`} onClick={() => setActiveTab("impresion")}>Impresión</button>
          </nav>

          <button className="nav-arrow-btn right" onClick={() => scrollNav("right")}>›</button>
        </div>

        <section className="panel-content-box">
          {activeTab === "menu" && <InventarioM />}
          {activeTab === "adicionales" && <InventarioAd />}
          {activeTab === "pedidos" && <Pedidos />}
          {activeTab === "permisos" && <Permisos />}
          
          {/* 2. RENDERIZADO DEL COMPONENTE DE CONFIGURACIÓN */}
          {activeTab === "configuracion" && <Configuracion />}

          {activeTab === "impresion" && <Impresion />}
        </section>
      </div>
    </div>
  );
}