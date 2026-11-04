import { useEffect, useRef, useState } from "react";
import {
  FaBowlFood,
  FaDrumstickBite,
  FaBowlRice,
  FaTriangleExclamation,
  FaPen,
  FaTrash,
} from "react-icons/fa6";
import "./InventarioM.css";

const CATEGORY_OPTIONS = [
  { value: "Principio", Icon: FaBowlFood },
  { value: "Proteína", Icon: FaDrumstickBite },
  { value: "Acompañamiento", Icon: FaBowlRice },
];

function CategoryDropdown({ value, onChange, placeholder, invalid = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const optionRefs = useRef([]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const closeOnOutsideClick = (event) => {
      if (!dropdownRef.current?.contains(event.target)) setIsOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  const selectedOption = CATEGORY_OPTIONS.find(
    (option) => option.value === value,
  );
  const SelectedIcon = selectedOption?.Icon;

  return (
    <div className="category-dropdown" ref={dropdownRef}>
      <button
        ref={triggerRef}
        type="button"
        className="category-dropdown-trigger"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-invalid={invalid}
        onClick={() => {
          if (isOpen) {
            setIsOpen(false);
          } else {
            setIsOpen(true);
            requestAnimationFrame(() => optionRefs.current[0]?.focus());
          }
        }}
      >
        <span className="category-dropdown-value">
          {SelectedIcon && <SelectedIcon aria-hidden="true" />}
          {selectedOption?.value || placeholder}
        </span>
        <svg
          className={`category-dropdown-chevron${isOpen ? " is-open" : ""}`}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
      {isOpen && (
        <ul className="category-dropdown-options" role="listbox">
          {CATEGORY_OPTIONS.map(({ value: option, Icon }, index) => (
            <li key={option} role="none">
              <button
                ref={(element) => {
                  optionRefs.current[index] = element;
                }}
                type="button"
                className="category-dropdown-option"
                role="option"
                aria-selected={value === option}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                    event.preventDefault();
                    const direction = event.key === "ArrowDown" ? 1 : -1;
                    const nextIndex =
                      (index + direction + CATEGORY_OPTIONS.length) %
                      CATEGORY_OPTIONS.length;
                    optionRefs.current[nextIndex]?.focus();
                  }
                  if (event.key === "Escape") {
                    setIsOpen(false);
                    triggerRef.current?.focus();
                  }
                }}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                  triggerRef.current?.focus();
                }}
              >
                <Icon aria-hidden="true" />
                <span>{option}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {invalid && (
        <span className="category-dropdown-error">
          Selecciona una categoría.
        </span>
      )}
    </div>
  );
}

const INITIAL_ITEMS = [
  {
    id: 1,
    nombre: "Fríjoles Guisados",
    descripcion: "Guisados estilo tradicional",
    categoria: "Principio",
    cantidad: 20,
    disponible: true,
  },
  {
    id: 2,
    nombre: "Lentejas Caseras",
    descripcion: "Con ahogado de la casa",
    categoria: "Principio",
    cantidad: 15,
    disponible: true,
  },
  {
    id: 3,
    nombre: "Carne Asada",
    descripcion: "Corte magro a la plancha",
    categoria: "Proteína",
    cantidad: 12,
    disponible: true,
  },
  {
    id: 4,
    nombre: "Pechuga a la Plancha",
    descripcion: "Fileteada con sazón casera",
    categoria: "Proteína",
    cantidad: 8,
    disponible: true,
  },
  {
    id: 5,
    nombre: "Arroz Blanco",
    descripcion: "Porción tradicional de la casa",
    categoria: "Acompañamiento",
    cantidad: 30,
    disponible: true,
  },
  {
    id: 6,
    nombre: "Tajada o Ensalada",
    descripcion: "Maduro frito o ensalada fresca",
    categoria: "Acompañamiento",
    cantidad: 4,
    disponible: true,
  },
];

export default function InventarioM() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [filterCategory, setFilterCategory] = useState("Todos");
  const [expandedId, setExpandedId] = useState(null);

  // Estados para el Modal de Edición
  const [editingItem, setEditingItem] = useState(null);
  const [tempNombre, setTempNombre] = useState("");
  const [tempDesc, setTempDesc] = useState("");
  const [tempCategoria, setTempCategoria] = useState("Principio");
  const [tempIcono, setTempIcono] = useState("Principio");

  // Estados para el Modal de Añadir Nuevo Elemento
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newNombre, setNewNombre] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newCategoria, setNewCategoria] = useState("");
  const [categoryError, setCategoryError] = useState(false);
  const [newCantidad, setNewCantidad] = useState(10);

  // Estados para el Modal de Confirmación de Eliminación
  const [deletingId, setDeletingId] = useState(null);

  const totalElementos = items.length;
  const disponibles = items.filter(
    (item) => item.disponible && item.cantidad > 0,
  ).length;
  const pocoStock = items.filter(
    (item) => item.cantidad <= 5 || !item.disponible,
  ).length;

  const updateCantidad = (id, delta, e) => {
    e.stopPropagation();
    setItems((prev) =>
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
      }),
    );
  };

  const toggleDisponible = (id, e) => {
    e.stopPropagation();
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, disponible: !item.disponible } : item,
      ),
    );
  };

  // Guardar nuevo elemento
  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newCategoria) {
      setCategoryError(true);
      return;
    }
    const nuevoElemento = {
      id: Date.now(),
      nombre: newNombre,
      descripcion: newDesc,
      categoria: newCategoria,
      cantidad: Number(newCantidad),
      disponible: Number(newCantidad) > 0,
    };

    setItems([nuevoElemento, ...items]);
    setIsAddModalOpen(false);
    // Limpiar campos
    setNewNombre("");
    setNewDesc("");
    setNewCantidad(10);
    setNewCategoria("");
  };

  const handleEditClick = (item, e) => {
    e.stopPropagation();
    setEditingItem(item);
    setTempNombre(item.nombre);
    setTempDesc(item.descripcion);
    setTempCategoria(item.categoria);
    const iconoActual = item.categoria;
    setTempIcono(iconoActual);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setItems((prev) =>
      prev.map((item) =>
        item.id === editingItem.id
          ? {
              ...item,
              nombre: tempNombre,
              descripcion: tempDesc,
              categoria: tempCategoria,
            }
          : item,
      ),
    );
    setEditingItem(null);
  };

  const handleDeleteClick = (id, e) => {
    e.stopPropagation();
    setDeletingId(id);
  };

  const confirmDelete = () => {
    setItems((prev) => prev.filter((item) => item.id !== deletingId));
    if (expandedId === deletingId) setExpandedId(null);
    setDeletingId(null);
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const itemsFiltrados = items.filter((item) => {
    if (filterCategory === "Todos") return true;
    return item.categoria === filterCategory;
  });

  return (
    <div className="inventario-container">
      {/* Encabezado interno */}
      <div className="inventario-header">
        <div>
          <h2 className="inventario-title">Inventario de Componentes</h2>
          <p className="inventario-desc">
            Gestiona la disponibilidad y stock de los componentes del menú. Haz
            clic en una tarjeta para ver opciones.
          </p>
        </div>
        <button
          className="btn-add-element"
          onClick={() => {
            setNewCategoria("");
            setCategoryError(false);
            setIsAddModalOpen(true);
          }}
        >
          <span>+</span> Añadir nuevo elemento
        </button>
      </div>

      {/* Tarjetas de Métricas */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon blue">
            <FaBowlFood aria-hidden="true" />
          </div>
          <div className="metric-info">
            <span className="metric-label">Total Componentes</span>
            <strong className="metric-value">{totalElementos}</strong>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon green">✓</div>
          <div className="metric-info">
            <span className="metric-label">Disponibles</span>
            <strong className="metric-value">{disponibles}</strong>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon orange">
            <FaTriangleExclamation aria-hidden="true" />
          </div>
          <div className="metric-info">
            <span className="metric-label">Poco Stock / Agotados</span>
            <strong className="metric-value">{pocoStock}</strong>
          </div>
        </div>
      </div>

      {/* Toolbar y Filtros */}
      <div className="cards-section-wrapper">
        <div className="table-toolbar">
          <span className="toolbar-title">Elementos Registrados</span>
          <div className="category-filters">
            {["Todos", "Principio", "Proteína", "Acompañamiento"].map((cat) => (
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

        {/* Listado de Tarjetas Desplegables */}
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
                      {item.categoria === "Principio" && (
                        <FaBowlFood aria-hidden="true" />
                      )}
                      {item.categoria === "Proteína" && (
                        <FaDrumstickBite aria-hidden="true" />
                      )}
                      {item.categoria === "Acompañamiento" && (
                        <FaBowlRice aria-hidden="true" />
                      )}
                    </div>
                    <div>
                      <strong className="element-name">{item.nombre}</strong>
                      <small className="element-desc">{item.descripcion}</small>
                    </div>
                  </div>

                  <div className="card-summary-badges">
                    <span
                      className={`badge-cat ${item.categoria.toLowerCase()}`}
                    >
                      {item.categoria}
                    </span>
                    <button
                      type="button"
                      className={`status-badge ${item.disponible && item.cantidad > 0 ? "available" : "unavailable"}`}
                      onClick={(e) => toggleDisponible(item.id, e)}
                    >
                      {item.disponible && item.cantidad > 0
                        ? "Disponible"
                        : "Agotado"}
                    </button>
                    <span className="expand-chevron">
                      {isExpanded ? "▲" : "▼"}
                    </span>
                  </div>
                </div>

                {isExpanded && (
                  <div
                    className="card-dropdown-content"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="dropdown-divider"></div>

                    <div className="dropdown-controls-grid">
                      <div className="control-group">
                        <span className="control-label">Cantidad en Stock</span>
                        <div className="quantity-control">
                          <button
                            onClick={(e) => updateCantidad(item.id, -1, e)}
                          >
                            -
                          </button>
                          <span>{item.cantidad}</span>
                          <button
                            onClick={(e) => updateCantidad(item.id, 1, e)}
                          >
                            +
                          </button>
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
                            <FaPen aria-hidden="true" /> Editar
                          </button>
                          <button
                            className="btn-icon delete"
                            title="Eliminar"
                            onClick={(e) => handleDeleteClick(item.id, e)}
                          >
                            <FaTrash aria-hidden="true" /> Eliminar
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

      {/* ================= MODAL DE AÑADIR NUEVO ELEMENTO ================= */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Añadir Nuevo Elemento</h3>
              <button
                className="modal-close-btn"
                onClick={() => setIsAddModalOpen(false)}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="modal-form">
              <div className="form-group">
                <label>Nombre del elemento:</label>
                <input
                  type="text"
                  placeholder="Ej. Sancocho de Gallina"
                  value={newNombre}
                  onChange={(e) => setNewNombre(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Descripción / Detalle:</label>
                <input
                  type="text"
                  placeholder="Ej. Caldo tradicional con presa"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Categoría:</label>
                <CategoryDropdown
                  value={newCategoria}
                  onChange={(category) => {
                    setNewCategoria(category);
                    setCategoryError(false);
                  }}
                  placeholder="Selecciona una categoría"
                  invalid={categoryError}
                />
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
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  Crear Elemento
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
              <h3>Editar Elemento</h3>
              <button
                className="modal-close-btn"
                onClick={() => setEditingItem(null)}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSaveEdit} className="modal-form">
              <div className="form-group">
                <label>Nombre del elemento:</label>
                <input
                  type="text"
                  value={tempNombre}
                  onChange={(e) => setTempNombre(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Descripción / Detalle:</label>
                <input
                  type="text"
                  value={tempDesc}
                  onChange={(e) => setTempDesc(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Categor&#237;a:</label>
                <CategoryDropdown
                  value={tempCategoria}
                  onChange={(category) => {
                    setTempCategoria(category);
                    setTempIcono(category);
                  }}
                  placeholder="Selecciona una categoría"
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setEditingItem(null)}
                >
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

      {/* ================= MODAL DE CONFIRMACIÓN DE ELIMINACIÓN ================= */}
      {deletingId !== null && (
        <div className="modal-overlay" onClick={() => setDeletingId(null)}>
          <div
            className="modal-card confirm-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="confirm-icon">
              <FaTriangleExclamation aria-hidden="true" />
            </div>
            <h3>¿Estás seguro que deseas eliminar este elemento?</h3>
            <p>
              Esta acción no se puede deshacer y el componente se borrará del
              menú.
            </p>
            <div className="modal-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setDeletingId(null)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn-danger"
                onClick={confirmDelete}
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
