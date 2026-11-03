import React, { useState } from 'react';
import { Search, Clock, CheckCircle2, XCircle, MapPin, Phone, Calendar } from 'lucide-react';
import '../Pedidos/Pedidos.css';

// Datos de prueba alineados con los precios y datos de las comandas de JC Casas
const DATOS_PEDIDOS = [
  {
    id: "PED-001",
    cliente: "Carlos Mendoza",
    telefono: "3123478310",
    direccion: "Triunfo 1 - Soacha",
    fecha: "2026-11-03 12:30 PM",
    estado: "entregado", // 'entregado', 'pendiente', 'cancelado'
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
  },
  {
    id: "PED-004",
    cliente: "Mariana Gómez",
    telefono: "3204567890",
    direccion: "Ciudad Verde Apt 302",
    fecha: "2026-11-02 02:00 PM",
    estado: "entregado",
    total: 14500,
    ingredientes: ["Frijoles Guisados", "Chicharrón", "Arepa"]
  }
];

export default function HistorialPedidos() {
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('todos');

  // Filtrado combinado (Texto por cliente/ID + Estado)
  const pedidosFiltrados = DATOS_PEDIDOS.filter((item) => {
    const coincideTexto = 
      item.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.id.toLowerCase().includes(busqueda.toLowerCase());

    const coincideEstado = filtroEstado === 'todos' || item.estado === filtroEstado;

    return coincideTexto && coincideEstado;
  });

  // Métricas dinámicas
  const totalEntregados = DATOS_PEDIDOS.filter(p => p.estado === 'entregado').length;
  const totalPendientes = DATOS_PEDIDOS.filter(p => p.estado === 'pendiente').length;
  const totalCancelados = DATOS_PEDIDOS.filter(p => p.estado === 'cancelado').length;

  return (
    <div className="pedidos-main-card">
      
      {/* Encabezado */}
      <div className="pedidos-header">
        <div>
          <h2 className="pedidos-title">Historial de Pedidos</h2>
          <p className="pedidos-subtitle">
            Visualiza y filtra los pedidos registrados en el local y a domicilio.
          </p>
        </div>
      </div>

      {/* Tarjetas KPI */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon-box amber">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="kpi-label">Entregados</p>
            <p className="kpi-value">{totalEntregados}</p>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-box blue">
            <Clock size={24} />
          </div>
          <div>
            <p className="kpi-label">Pendientes por Entregar</p>
            <p className="kpi-value">{totalPendientes}</p>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-box red">
            <XCircle size={24} />
          </div>
          <div>
            <p className="kpi-label">Cancelados</p>
            <p className="kpi-value">{totalCancelados}</p>
          </div>
        </div>
      </div>

      {/* Contenedor de Registros */}
      <div className="records-card">
        
        {/* Filtros y Búsqueda */}
        <div className="search-filter-bar">
          
          <div className="search-input-box">
            <Search size={16} className="search-icon" />
            <input 
              type="text"
              placeholder="Buscar por cliente o ID (ej: PED-001)..."
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

        {/* Lista de Registros */}
        <div className="pedidos-list">
          {pedidosFiltrados.length > 0 ? (
            pedidosFiltrados.map((pedido) => (
              <div key={pedido.id} className="pedido-item">
                
                <div className="pedido-info-group">
                  <span className="pedido-id-badge">{pedido.id}</span>
                  <div>
                    <h3 className="cliente-nombre">{pedido.cliente}</h3>
                    
                    <div className="pedido-meta">
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <MapPin size={12} /> {pedido.direccion}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Phone size={12} /> {pedido.telefono}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Calendar size={12} /> {pedido.fecha}
                      </span>
                    </div>

                    <div className="platillos-tags">
                      {pedido.ingredientes?.map((ing, idx) => (
                        <span key={idx} className="platillo-tag">{ing}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pedido-actions">
                  <span className={`status-badge ${pedido.estado}`}>
                    {pedido.estado === 'entregado' && <CheckCircle2 size={14} />}
                    {pedido.estado === 'pendiente' && <Clock size={14} />}
                    {pedido.estado === 'cancelado' && <XCircle size={14} />}
                    {pedido.estado === 'pendiente' ? 'Pendiente' : pedido.estado}
                  </span>

                  <span className="pedido-precio">
                    ${pedido.total.toLocaleString('es-CO')}
                  </span>
                </div>

              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--color-header)', fontSize: 'var(--font-size-small)' }}>
              No se encontraron pedidos con el criterio de búsqueda seleccionado.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}