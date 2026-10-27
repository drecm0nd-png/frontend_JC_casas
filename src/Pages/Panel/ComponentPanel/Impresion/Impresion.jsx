import { useState } from "react";
import "./Impresion.css";

// Historial de ejemplo con fechas y montos
const HISTORIAL_IMPRESIONES = [
  { id: "CMD-1042", fecha: "2026-10-27", hora: "14:30", cliente: "Carlos Mendoza", items: "2x Sopa de Ajiaco, 1x Jugo Natural", total: 20000, impresora: "Impresora Cocina 1 (EPSON TM-T20)", estado: "Impreso" },
  { id: "CMD-1041", fecha: "2026-10-27", hora: "13:15", cliente: "Laura Restrepo", items: "1x Sopa de Sancocho, 1x Limonada", total: 13000, impresora: "Impresora Barra ( térmica)", estado: "Impreso" },
  { id: "CMD-1040", fecha: "2026-10-27", hora: "12:05", cliente: "Alejandro Torres", items: "3x Ensalada Especial, 2x Gaseosas", total: 26500, impresora: "Impresora Cocina 1 (EPSON TM-T20)", estado: "Impreso" },
  { id: "CMD-1039", fecha: "2026-10-26", hora: "20:40", cliente: "Mariana Gómez", items: "1x Sopa de Ajiaco, 1x Cerveza", total: 12500, impresora: "Impresora Barra ( térmica)", estado: "Impreso" },
];

const DISPOSITIVOS_DISPONIBLES = [
  "Impresora Cocina 1 (EPSON TM-T20)",
  "Impresora Barra ( térmica)",
  "Impresora Caja Principal (Bluetooth)",
  "Impresora Secundaria Cocina"
];

export default function Impresion() {
  const [impresoraSeleccionada, setImpresoraSeleccionada] = useState(DISPOSITIVOS_DISPONIBLES[0]);
  // Fecha actual por defecto en formato YYYY-MM-DD
  const [fechaFiltro, setFechaFiltro] = useState("2026-10-27");
  const [expandedCardId, setExpandedCardId] = useState(null);

  // Filtrar impresiones según la fecha seleccionada
  const impresionesDelDia = HISTORIAL_IMPRESIONES.filter(
    (item) => item.fecha === fechaFiltro
  );

  // Calcular el valor total de las ventas de ese día
  const totalVentasDia = impresionesDelDia.reduce((acc, item) => acc + item.total, 0);
  const totalImpresionesDia = impresionesDelDia.length;

  const toggleExpand = (id) => {
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  const handleTestPrint = () => {
    alert(`Enviando página de prueba a: ${impresoraSeleccionada}`);
  };

  return (
    <div className="impresion-container">
      {/* Cabecera del Módulo */}
      <div className="impresion-header">
        <div>
          <h2 className="impresion-title">Impresión y Comandas</h2>
          <p className="impresion-desc">
            Configura el dispositivo de salida y consulta el historial de comandas impresas junto con el total de ventas.
          </p>
        </div>
      </div>

      {/* Configuración de Dispositivo */}
      <div className="printer-config-card">
        <div className="printer-config-info">
          <span className="printer-icon">🖨️</span>
          <div>
            <span className="metric-label">Dispositivo Activo para Comandas</span>
            <select
              className="printer-select"
              value={impresoraSeleccionada}
              onChange={(e) => setImpresoraSeleccionada(e.target.value)}
            >
              {DISPOSITIVOS_DISPONIBLES.map((imp, idx) => (
                <option key={idx} value={imp}>
                  {imp}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className="btn-test-print" onClick={handleTestPrint}>
          Imprimir Prueba
        </button>
      </div>

      {/* Tarjetas de Métricas del Día */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon-box">📄</div>
          <div>
            <span className="metric-label">Comandas Impresas (Día)</span>
            <h3 className="metric-value">{totalImpresionesDia}</h3>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon-box success">💰</div>
          <div>
            <span className="metric-label">Valor Total Ventas (Día)</span>
            <h3 className="metric-value">${totalVentasDia.toLocaleString()}</h3>
          </div>
        </div>
      </div>

      {/* Barra de Filtro por Día */}
      <div className="catalog-toolbar">
        <div className="filter-date-group">
          <label htmlFor="fecha-input" className="filter-date-label">Filtrar por Fecha:</label>
          <input
            id="fecha-input"
            type="date"
            className="date-input-field"
            value={fechaFiltro}
            onChange={(e) => setFechaFiltro(e.target.value)}
          />
        </div>
        <div className="date-badge-info">
          Mostrando registros del día: <strong>{fechaFiltro}</strong>
        </div>
      </div>

      {/* Listado de Historial Estilo Acordeón */}
      <div className="catalog-section">
        <h3 className="section-heading">Historial de Comandas</h3>

        <div className="items-list">
          {impresionesDelDia.length > 0 ? (
            impresionesDelDia.map((item) => {
              const isExpanded = expandedCardId === item.id;
              return (
                <div
                  key={item.id}
                  className={`item-card-accordion ${isExpanded ? "expanded" : ""}`}
                >
                  <div className="item-card-header" onClick={() => toggleExpand(item.id)}>
                    <div className="item-info-left">
                      <div className="item-avatar-box">🧾</div>
                      <div>
                        <div className="item-meta-row">
                          <span className="item-id-tag">{item.id}</span>
                          <span className="item-email-tag">{item.fecha} - {item.hora}</span>
                        </div>
                        <h4 className="item-name">{item.cliente}</h4>
                      </div>
                    </div>

                    <div className="item-info-right">
                      <span className="price-tag-view">${item.total.toLocaleString()}</span>
                      <span className="status-pill active">{item.estado}</span>
                      <span className={`chevron-arrow ${isExpanded ? "rotate" : ""}`}>▼</span>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="item-dropdown-body">
                      <div className="dropdown-divider"></div>
                      <div className="dropdown-content-grid">
                        <div>
                          <strong>Detalle de Productos en Comanda:</strong>
                          <p style={{ margin: "0.3rem 0 0 0", color: "#726555", fontSize: "0.85rem" }}>
                            {item.items}
                          </p>
                        </div>
                        <div>
                          <strong>Dispositivo de Salida:</strong>
                          <p style={{ margin: "0.3rem 0 0 0", color: "#bd732f", fontSize: "0.82rem", fontWeight: "700" }}>
                            {item.impresora}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="empty-catalog-box">
              <p>No se encontraron impresiones ni ventas registradas para la fecha {fechaFiltro}.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}