import { useState } from "react";
import InventarioM from "./InventarioM/InventarioM.jsx";
import InventarioAd from "./InventarioAdicional/InventarioAd.jsx";
import "./Inventario.css";

export default function Inventario() {
  // Estado para alternar entre el menú y los adicionales
  const [subTab, setSubTab] = useState("menu");

  return (
    <div className="inventario-container-unified">
      {/* Botones estilo switch para alternar entre ambas vistas */}
      <div className="inventario-switch-bar">
        <button
          type="button"
          className={`switch-btn ${subTab === "menu" ? "active" : ""}`}
          onClick={() => setSubTab("menu")}
        >
          Gestión de Menú
        </button>
        <button
          type="button"
          className={`switch-btn ${subTab === "adicionales" ? "active" : ""}`}
          onClick={() => setSubTab("adicionales")}
        >
          Inventario Adicional
        </button>
      </div>

      {/* Contenido dinámico que muestra uno u otro componente según el switch */}
      <div className="inventario-subcontent">
        {subTab === "menu" && <InventarioM />}
        {subTab === "adicionales" && <InventarioAd />}
      </div>
    </div>
  );
}