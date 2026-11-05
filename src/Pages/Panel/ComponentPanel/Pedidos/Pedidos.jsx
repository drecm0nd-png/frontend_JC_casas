import React, { useState } from "react";
import { 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Search, 
  MapPin, 
  ChevronDown, 
  Phone, 
  Calendar 
} from "lucide-react";
import "./Pedidos.css";

export default function HistorialPedidos() {
  const [activeFilter, setActiveFilter] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedId, setExpandedId] = useState("PED-003"); // PED-003 abierto por defecto

  const [pedidos, setPedidos] = useState([
    {
      id: "PED-001",
      direccion: "Triunfo 1 - Soacha",
      cliente: "Carlos Pérez",
      telefono: "3101234567",
      fecha: "2026-11-03 12:30 PM",
      estado: "entregado",
      precio: "$14.500",
      platillos: ["Sopa del día", "Pollo Asado", "Ensalada"]
    },
    {
      id: "PED-002",
      direccion: "Prado Vegas Cra 4 #12",
      cliente: "María Rodríguez",
      telefono: "3209876543",
      fecha: "2026-11-03 01:00 PM",
      estado: "pendiente",
      precio: "$29.000",
      platillos: ["Carne Molida", "Jugos Naturales", "Sopa del día"]
    },
    {
      id: "PED-003",
      direccion: "Hogares Soacha Torre 5",
      cliente: "Alejandro Torres",
      telefono: "3159876543",
      fecha: "2026-11-03 01:25 PM",
      estado: "cancelado",
      precio: "$14.500",
      platillos: ["Sopa del día", "Carne Molida", "Ensalada"]
    }
  ]);

  const handleStatusChange = (id, newStatus) => {
    setPedidos(
      pedidos.map((p) => (p.id === id ? { ...p, estado: newStatus } : p))
    );
  };

  const toggleAccordion = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredPedidos = pedidos.filter((p) => {
    const matchesFilter =
      activeFilter === "todos" || p.estado === activeFilter;
    const matchesSearch =
      p.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.direccion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="pedidos-main-card">
      <div className="pedidos-header">
        <h2 className="pedidos-title">Historial de Pedidos</h2>
        <p className="pedidos-subtitle">
          Visualiza y filtra los pedidos registrados.
        </p>
      </div>

      {/* Tarjetas KPI */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon-box amber">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="kpi-label">ENTREGADOS</p>
            <h3 className="kpi-value">
              {pedidos.filter((p) => p.estado === "entregado").length}
            </h3>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-box blue">
            <Clock size={24} />
          </div>
          <div>
            <p className="kpi-label">PENDIENTES POR ENTREGAR</p>
            <h3 className="kpi-value">
              {pedidos.filter((p) => p.estado === "pendiente").length}
            </h3>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-box red">
            <XCircle size={24} />
          </div>
          <div>
            <p className="kpi-label">CANCELADOS</p>
            <h3 className="kpi-value">
              {pedidos.filter((p) => p.estado === "cancelado").length}
            </h3>
          </div>
        </div>
      </div>

      {/* Registros e Inputs */}
      <div className="records-card">
        <div className="search-filter-bar">
          <div className="search-input-box">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Buscar por cliente, dirección o ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-pills">
            <button
              className={`pill-button ${activeFilter === "todos" ? "active" : ""}`}
              onClick={() => setActiveFilter("todos")}
            >
              Todos
            </button>
            <button
              className={`pill-button ${activeFilter === "entregado" ? "active" : ""}`}
              onClick={() => setActiveFilter("entregado")}
            >
              Entregados
            </button>
            <button
              className={`pill-button ${activeFilter === "pendiente" ? "active" : ""}`}
              onClick={() => setActiveFilter("pendiente")}
            >
              Pendientes
            </button>
            <button
              className={`pill-button ${activeFilter === "cancelado" ? "active" : ""}`}
              onClick={() => setActiveFilter("cancelado")}
            >
              Cancelados
            </button>
          </div>
        </div>

        {/* Lista de Pedidos */}
        <div className="pedidos-list">
          {filteredPedidos.map((pedido) => {
            const isExpanded = expandedId === pedido.id;
            return (
              <div
                key={pedido.id}
                className={`item-card-accordion ${isExpanded ? "expanded" : ""}`}
              >
                <div
                  className="item-card-header"
                  onClick={() => toggleAccordion(pedido.id)}
                >
                  <div className="item-info-left">
                    <span className="pedido-id-badge">{pedido.id}</span>
                    <span className="pedido-direccion-compacta">
                      <MapPin size={16} className="icon-map" />
                      {pedido.direccion}
                    </span>
                  </div>

                  <div
                    className="item-info-right"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Selector interactivo de Estado */}
                    <select
                      className={`status-select ${pedido.estado}`}
                      value={pedido.estado}
                      onChange={(e) =>
                        handleStatusChange(pedido.id, e.target.value)
                      }
                    >
                      <option value="entregado">ENTREGADO</option>
                      <option value="pendiente">PENDIENTE</option>
                      <option value="cancelado">CANCELADO</option>
                    </select>

                    <span className="pedido-precio">{pedido.precio}</span>

                    <button
                      className={`btn-chevron ${isExpanded ? "rotate" : ""}`}
                      onClick={() => toggleAccordion(pedido.id)}
                    >
                      <ChevronDown size={20} />
                    </button>
                  </div>
                </div>

                {/* Acordeón de Detalles */}
                {isExpanded && (
                  <div className="item-card-body">
                    <div className="detail-divider"></div>
                    <div className="detail-grid">
                      <div className="detail-info-item">
                        <span className="detail-label">Cliente:</span>
                        <span className="detail-value">{pedido.cliente}</span>
                      </div>

                      <div className="detail-info-item">
                        <span className="detail-label">Teléfono:</span>
                        <span className="detail-value flex-align">
                          <Phone size={14} /> {pedido.telefono}
                        </span>
                      </div>

                      <div className="detail-info-item">
                        <span className="detail-label">Fecha:</span>
                        <span className="detail-value flex-align">
                          <Calendar size={14} /> {pedido.fecha}
                        </span>
                      </div>
                    </div>

                    <div className="detail-platillos-box">
                      <span className="detail-label">Platos del Pedido:</span>
                      <div className="platillos-tags">
                        {pedido.platillos.map((item, idx) => (
                          <span key={idx} className="platillo-tag">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}