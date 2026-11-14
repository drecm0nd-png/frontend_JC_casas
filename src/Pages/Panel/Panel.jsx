import { useSearchParams } from "react-router-dom";
import { FaChartPie } from "react-icons/fa6";
import Inventario from "./ComponentPanel/Inventario/Inventario.jsx";
import Pedidos from "./ComponentPanel/Pedidos/Pedidos.jsx"; 
import Permisos from "./ComponentPanel/Permisos/Permisos.jsx";
import Impresion from "./ComponentPanel/Impresion/Impresion.jsx";

import "./Panel.css";

export default function Panel() {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "inventario";

  return (
    <div className="panel-page-container">
      <div className="panel-inner-wrapper">
        
        {/* Cabecera limpia integrada al fondo */}
        <div className="panel-header-section">
          <div>
            <span className="panel-subtitle">Centro Operativo</span>
            <h1 className="panel-title">Panel de Administración</h1>
            <p className="panel-description">
              Control en tiempo real para la gestión de inventarios, despachos, permisos e impresión.
            </p>
          </div>
          <div className="panel-header-badge">
            <FaChartPie className="fa-spin" size={16} />
            <span>Jcasas POS</span>
          </div>
        </div>

        {/* Tarjeta contenedora de la pestaña activa */}
        <section className="panel-content-box">
          {activeTab === "inventario" && <Inventario />}
          {activeTab === "pedidos" && <Pedidos />}
          {activeTab === "permisos" && <Permisos />}
          {activeTab === "impresion" && <Impresion />}
        </section>
      </div>
    </div>
  );
}