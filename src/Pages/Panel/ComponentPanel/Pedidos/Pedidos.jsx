import React, { useState } from 'react';
import { Search, Clock, CheckCircle2, XCircle, MapPin, Phone, Calendar, ChevronDown } from 'lucide-react';
import './Pedidos.css';

const DATOS_PEDIDOS_INICIALES = [
  {
    id: "PED-001",
    cliente: "Carlos Mendoza",
    telefono: "3123478310",
    direccion: "Triunfo 1 - Soacha",
    fecha: "2026-11-03 12:30 PM",
    estado: "entregado",
    total: 14500,
    ingredientes: ["Sopa de Verduras", "Frijoles Guisados", "Carne Asada", "Arroz Blanco"]
  },
  {
    id: "PED-002",
    cliente: "Laura Restrepo",
    telefono: "3001234567",
    direccion: "Prado Vegas Cra 4 #12",
    fecha: "2026-11-03 01:10 PM",
    estado: "pendiente",
    total: 29000,
    ingredientes: ["Lentejas Caseras", "Pechuga a la Plancha", "Tajada", "Jugo Natural"]
  },
  {
    id: "PED-003",
    cliente: "Alejandro Torres",
    telefono: "3159876543",
    direccion: "Hogares Soacha Torre 5",
    fecha: "2026-11-03 01:25 PM",
    estado: "cancelado",
    total: 14500,
    ingredientes: ["Sopa del día", "Carne Molida", "Ensalada"]
  }
];

export default function Pedidos() {
  const [pedidos, setPedidos] = useState(DATOS_PEDIDOS_INICIALES);
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [pedidoDesplegado, setPedidoDesplegado] = useState(null);

  const toggleDesplegar = (id) => {
    setPedidoDesplegado(pedidoDesplegado === id ? null : id);
  };

  const handleCambiarEstado = (id, nuevoEstado) => {
    setPedidos(prev =>
      prev.map(p => p.id === id ? { ...p, estado: nuevoEstado } : p)
    );
  };

  const pedidosFiltrados = pedidos.filter((item) => {
    const coincideTexto = 
      item.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.id.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.direccion.toLowerCase().includes(busqueda.toLowerCase());

    const coincideEstado = filtroEstado === 'todos' || item.estado === filtroEstado;
    return coincideTexto && coincideEstado;
  });

  const totalEntregados = pedidos.filter(p => p.estado === 'entregado').length;
  const totalPendientes = pedidos.filter(p => p.estado === 'pendiente').length;
  const totalCancelados = pedidos.filter(p => p.estado === 'cancelado').length;

  return (
    <div className="pedidos-main-card">
      <div className="pedidos-header">
        <div>
          <h2 className="pedidos-title">Historial de Pedidos</h2>
          <p className="pedidos-subtitle">Visualiza y filtra los pedidos registrados.</p>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon-box amber"><CheckCircle2 size={24} /></div>
          <div><p className="kpi-label">Entregados</p><p className="kpi-value">{totalEntregados}</p></div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon-box blue"><Clock size={24} /></div>
          <div><p className="kpi-label">Pendientes por Entregar</p><p className="kpi-value">{totalPendientes}</p></div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon-box red"><XCircle size={24} /></div>
          <div><p className="kpi-label">Cancelados</p><p className="kpi-value">{totalCancelados}</p></div>
        </div>
      </div>

      <div className="records-card">
        <div className="search-filter-bar">
          <div className="search-input-box">
            <Search size={16} className="search-icon" />
            <input 
              type="text"
              placeholder="Buscar por cliente, dirección o ID..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <div className="filter-pills">
            {[
              { label: 'Todos', value: 'todos' },
              { label: 'Entregados', value: 'entregado' },
              { label: 'Pendientes', value: 'pendiente' },
              { label: 'Cancelados', value: 'cancelado' }
            ].map((btn) => (
              <button
                key={btn.value}
                onClick={() => setFiltroEstado(btn.value)}
                className={`pill-button ${filtroEstado === btn.value ? 'active' : ''}`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        <div className="pedidos-list">
          {pedidosFiltrados.map((pedido) => {
            const estaExpandido = pedidoDesplegado === pedido.id;
            return (
              <div key={pedido.id} className={`item-card-accordion ${estaExpandido ? 'expanded' : ''}`}>
                <div className="item-card-header" onClick={() => toggleDesplegar(pedido.id)}>
                  <div className="item-info-left">
                    <span className="pedido-id-badge">{pedido.id}</span>
                    <span className="pedido-direccion-compacta">
                      <MapPin size={15} className="icon-map" />
                      {pedido.direccion}
                    </span>
                  </div>

                  <div className="item-info-right" onClick={(e) => e.stopPropagation()}>
                    <select 
                      className={`status-select ${pedido.estado}`}
                      value={pedido.estado}
                      onChange={(e) => handleCambiarEstado(pedido.id, e.target.value)}
                    >
                      <option value="entregado">ENTREGADO</option>
                      <option value="pendiente">PENDIENTE</option>
                      <option value="cancelado">CANCELADO</option>
                    </select>

                    <span className="pedido-precio">${pedido.total.toLocaleString('es-CO')}</span>

                    <button 
                      type="button" 
                      className={`btn-chevron ${estaExpandido ? 'rotate' : ''}`}
                      onClick={() => toggleDesplegar(pedido.id)}
                    >
                      <ChevronDown size={18} />
                    </button>
                  </div>
                </div>

                {estaExpandido && (
                  <div className="item-card-body">
                    <div className="detail-divider"></div>
                    <div className="detail-grid">
                      <div className="detail-info-item">
                        <span className="detail-label">Cliente:</span>
                        <span className="detail-value">{pedido.cliente}</span>
                      </div>
                      <div className="detail-info-item">
                        <span className="detail-label">Teléfono:</span>
                        <span className="detail-value flex-align"><Phone size={13} /> {pedido.telefono}</span>
                      </div>
                      <div className="detail-info-item">
                        <span className="detail-label">Fecha:</span>
                        <span className="detail-value flex-align"><Calendar size={13} /> {pedido.fecha}</span>
                      </div>
                    </div>
                    <div className="detail-platillos-box">
                      <span className="detail-label">Platos del Pedido:</span>
                      <div className="platillos-tags">
                        {pedido.ingredientes?.map((ing, idx) => (
                          <span key={idx} className="platillo-tag">{ing}</span>
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