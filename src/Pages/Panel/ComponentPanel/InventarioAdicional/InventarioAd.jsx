import { useState } from "react";
import "./InventarioAd.css";

const INITIAL_ADICIONALES = [
  {
    id: 1,
    nombre: "Sopa de Ajiaco Santafereño",
    descripcion: "Con pollo, mazorca, alcaparras y crema de leche.",
    categoria: "Sopas & Ensaladas",
    precio: 8000,
    cantidad: 15,
    disponible: true,
  },
  {
    id: 2,
    nombre: "Sopa de Sancocho",
    descripcion: "Sopa especial con plátano, yuca y verdura fresca.",
    categoria: "Sopas & Ensaladas",
    precio: 7500,
    cantidad: 10,
    disponible: true,
  },
  {
    id: 3,
    nombre: "Ensalada Especial",
    descripcion: "Aguacate, maíz dulce, queso y lechugas.",
    categoria: "Sopas & Ensaladas",
    precio: 6500,
    cantidad: 12,
    disponible: true,
  },
  {
    id: 4,
    nombre: "Jugos Naturales",
    descripcion: "Maracuyá, Mora, Mango o Lulo en agua o leche.",
    categoria: "Bebidas",
    precio: 4000,
    cantidad: 25,
    disponible: true,
  },
  {
    id: 5,
    nombre: "Limonada Cerezada",
    descripcion: "Refrescante limonada recién preparada con hielo.",
    categoria: "Bebidas",
    precio: 5500,
    cantidad: 18,
    disponible: true,
  },
  {
    id: 6,
    nombre: "Gaseosas y Refrescos",
    descripcion: "Coca-Cola, Sprite, Colombiana o Postobón personal.",
    categoria: "Bebidas",
    precio: 3500,
    cantidad: 30,
    disponible: true,
  },
];

export default function AdicionalesM() {
  const [adicionales, setAdicionales] = useState(INITIAL_ADICIONALES);
  const [filterCategory, setFilterCategory] = useState("Todos");
  const [expandedId, setExpandedId] = useState(null);

  // Estados para Modal de Edición
  const [editingItem, setEditingItem] = useState(null);
  const [tempNombre, setTempNombre] = useState("");
  const [tempDesc, setTempDesc] = useState("");
  const [tempCategoria, setTempCategoria] = useState("Sopas & Ensaladas");
  const [tempPrecio, setTempPrecio] = useState(0);

  // Estados para Modal de Añadir Nuevo Adicional
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newNombre, setNewNombre] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newCategoria, setNewCategoria] = useState("Sopas & Ensaladas");
  const [newPrecio, setNewPrecio] = useState(5000);
  const [newCantidad, setNewCantidad] = useState(15);

  // Estados para Modal de Eliminación
  const [deletingId, setDeletingId] = useState(null);

  const totalAdicionales = adicionales.length;
  const disponibles = adicionales.filter((item) => item.disponible && item.cantidad > 0).length;

  const updateCantidad = (id, delta, e) => {
    e.stopPropagation();
    setAdicionales((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nuevaCant = Math.max(0, item.cantidad + delta);
          return {
            ...item,
            cantidad: nuevaCant,
            disponible: nuevaCant > 0 ? item.disponible : false,
          };
        }
        return item;
      })
    );
  };

  const toggleDisponible = (id, e) => {
    e.stopPropagation();
    setAdicionales((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, disponible: !item.disponible } : item
      )
    );
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const nuevoAdicional = {
      id: Date.now(),
      nombre: newNombre,
      descripcion: newDesc,
      categoria: newCategoria,
      precio: Number(newPrecio),
      cantidad: Number(newCantidad),
      disponible: Number(newCantidad) > 0,
    };

    setAdicionales([nuevoAdicional, ...adicionales]);
    setIsAddModalOpen(false);
    setNewNombre("");
    setNewDesc("");
    setNewPrecio(5000);
    setNewCantidad(15);
  };

  const handleEditClick = (item, e) => {
    e.stopPropagation();
    setEditingItem(item);
    setTempNombre(item.nombre);
    setTempDesc(item.descripcion);
    setTempCategoria(item.categoria);
    setTempPrecio(item.precio);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setAdicionales((prev) =>
      prev.map((item) =>
        item.id === editingItem.id
          ? {
              ...item,
              nombre: tempNombre,
              descripcion: tempDesc,
              categoria: tempCategoria,
              precio: Number(tempPrecio),
            }
          : item
      )
    );
    setEditingItem(null);
  };

  const handleDeleteClick = (id, e) => {
    e.stopPropagation();
    setDeletingId(id);
  };

  const confirmDelete = () => {
    setAdicionales((prev) => prev.filter((item) => item.id !== deletingId));
    if (expandedId === deletingId) setExpandedId(null);
    setDeletingId(null);
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const itemsFiltrados = adicionales.filter((item) => {
    if (filterCategory === "Todos") return true;
    return item.categoria === filterCategory;
  });

  return (
    <div className="adicionales-container">
      {/* Cabecera */}
      <div className="adicionales-header">
        <div>
          <h2 className="adicionales-title">Gestión de Adicionales y Bebidas</h2>
          <p className="adicionales-desc">
            Administra productos independientes como sopas, ensaladas y bebidas con sus respectivos precios y stock.
          </p>
        </div>
        <button className="btn-add-element" onClick={() => setIsAddModalOpen(true)}>
          <span>+</span> Añadir producto
        </button>
      </div>

      {/* Métricas */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon blue">🥤</div>
          <div className="metric-info">
            <span className="metric-label">Total Productos</span>
            <strong className="metric-value">{totalAdicionales}</strong>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon green">✓</div>
          <div className="metric-info">
            <span className="metric-label">Disponibles a la Venta</span>
            <strong className="metric-value">{disponibles}</strong>
          </div>
        </div>
      </div>

      {/* Toolbar y Filtros */}
      <div className="cards-section-wrapper">
        <div className="table-toolbar">
          <span className="toolbar-title">Catálogo de Adicionales</span>
          <div className="category-filters">
            {["Todos", "Sopas & Ensaladas", "Bebidas"].map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${filterCategory === cat ? "active" : ""}`}
                onClick={() => setFilterCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tarjetas Desplegables */}
        <div className="cards-accordion-list">
          {itemsFiltrados.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className={`accordion-card ${isExpanded ? "expanded" : ""}`}
                onClick={() => toggleExpand(item.id)}
              >
                <div className="card-summary-row">
                  <div className="element-detail">
                    <div className="element-avatar">
                      {item.categoria === "Bebidas" ? "🥤" : "🍲"}
                    </div>
                    <div>
                      <strong className="element-name">{item.nombre}</strong>
                      <small className="element-desc">{item.descripcion}</small>
                    </div>
                  </div>

                  <div className="card-summary-badges">
                    <span className="price-tag-badge">${item.precio.toLocaleString()}</span>
                    <span className={`badge-cat ${item.categoria === "Bebidas" ? "bebidas" : "sopas"}`}>
                      {item.categoria}
                    </span>
                    <button
                      type="button"
                      className={`status-badge ${item.disponible && item.cantidad > 0 ? "available" : "unavailable"}`}
                      onClick={(e) => toggleDisponible(item.id, e)}
                    >
                      {item.disponible && item.cantidad > 0 ? "Disponible" : "Agotado"}
                    </button>
                    <span className="expand-chevron">{isExpanded ? "▲" : "▼"}</span>
                  </div>
                </div>

                {isExpanded && (
                  <div className="card-dropdown-content" onClick={(e) => e.stopPropagation()}>
                    <div className="dropdown-divider"></div>

                    <div className="dropdown-controls-grid">
                      <div className="control-group">
                        <span className="control-label">Precio Unitario</span>
                        <span className="price-tag">${item.precio.toLocaleString()}</span>
                      </div>

                      <div className="control-group">
                        <span className="control-label">Inventario / Stock</span>
                        <div className="quantity-control">
                          <button onClick={(e) => updateCantidad(item.id, -1, e)}>-</button>
                          <span>{item.cantidad}</span>
                          <button onClick={(e) => updateCantidad(item.id, 1, e)}>+</button>
                        </div>
                      </div>

                      <div className="control-group actions-group">
                        <span className="control-label">Acciones</span>
                        <div className="action-buttons">
                          <button
                            className="btn-icon edit"
                            title="Editar"
                            onClick={(e) => handleEditClick(item, e)}
                          >
                            ✏️ Editar
                          </button>
                          <button
                            className="btn-icon delete"
                            title="Eliminar"
                            onClick={(e) => handleDeleteClick(item.id, e)}
                          >
                            🗑️ Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= MODAL DE AÑADIR ================= */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Añadir Nuevo Adicional o Bebida</h3>
              <button className="modal-close-btn" onClick={() => setIsAddModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleAddSubmit} className="modal-form">
              <div className="form-group">
                <label>Nombre del producto:</label>
                <input
                  type="text"
                  placeholder="Ej. Salpicón de Frutas"
                  value={newNombre}
                  onChange={(e) => setNewNombre(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Descripción / Detalle:</label>
                <input
                  type="text"
                  placeholder="Ej. Con leche condensada y helado"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  required
                />
              </div>

              <div className="form-row-dual">
                <div className="form-group">
                  <label>Categoría:</label>
                  <select
                    value={newCategoria}
                    onChange={(e) => setNewCategoria(e.target.value)}
                    className="modal-select"
                  >
                    <option value="Sopas & Ensaladas">Sopas & Ensaladas</option>
                    <option value="Bebidas">Bebidas</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Precio ($):</label>
                  <input
                    type="number"
                    min="0"
                    step="500"
                    value={newPrecio}
                    onChange={(e) => setNewPrecio(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Cantidad Inicial en Stock:</label>
                <input
                  type="number"
                  min="0"
                  value={newCantidad}
                  onChange={(e) => setNewCantidad(e.target.value)}
                  required
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setIsAddModalOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  Crear Producto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL DE EDICIÓN ================= */}
      {editingItem && (
        <div className="modal-overlay" onClick={() => setEditingItem(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Editar Adicional / Bebida</h3>
              <button className="modal-close-btn" onClick={() => setEditingItem(null)}>✕</button>
            </div>
            <form onSubmit={handleSaveEdit} className="modal-form">
              <div className="form-group">
                <label>Nombre del producto:</label>
                <input
                  type="text"
                  value={tempNombre}
                  onChange={(e) => setTempNombre(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Descripción:</label>
                <input
                  type="text"
                  value={tempDesc}
                  onChange={(e) => setTempDesc(e.target.value)}
                  required
                />
              </div>

              <div className="form-row-dual">
                <div className="form-group">
                  <label>Categoría:</label>
                  <select
                    value={tempCategoria}
                    onChange={(e) => setTempCategoria(e.target.value)}
                    className="modal-select"
                  >
                    <option value="Sopas & Ensaladas">Sopas & Ensaladas</option>
                    <option value="Bebidas">Bebidas</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Precio ($):</label>
                  <input
                    type="number"
                    min="0"
                    step="500"
                    value={tempPrecio}
                    onChange={(e) => setTempPrecio(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setEditingItem(null)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL DE ELIMINACIÓN ================= */}
      {deletingId !== null && (
        <div className="modal-overlay" onClick={() => setDeletingId(null)}>
          <div className="modal-card confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-icon">⚠️</div>
            <h3>¿Estás seguro que deseas eliminar este producto?</h3>
            <p>Se borrará del menú de adicionales e inventario de forma permanente.</p>
            <div className="modal-actions">
              <button type="button" className="btn-secondary" onClick={() => setDeletingId(null)}>
                Cancelar
              </button>
              <button type="button" className="btn-danger" onClick={confirmDelete}>
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}