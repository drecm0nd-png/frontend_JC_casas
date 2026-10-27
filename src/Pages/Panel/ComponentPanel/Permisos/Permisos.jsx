import { useState } from "react";
import "./Permisos.css";

const USERS_DATA = [
  { id: "USR-001", nombre: "Carlos Mendoza", email: "carlos.mendoza@email.com", rol: "administrador", estado: "Activo" },
  { id: "USR-002", nombre: "Laura Restrepo", email: "laura.restrepo@email.com", rol: "repartidor", estado: "Activo" },
  { id: "USR-003", nombre: "Alejandro Torres", email: "alejandro.torres@email.com", rol: "cliente", estado: "Activo" },
  { id: "USR-004", nombre: "Mariana Gómez", email: "mariana.gomez@email.com", rol: "cliente", estado: "Inactivo" },
  { id: "USR-005", nombre: "Santiago Ramírez", email: "santiago.ramirez@email.com", rol: "repartidor", estado: "Activo" },
];

export default function Permisos() {
  const [usuarios, setUsuarios] = useState(USERS_DATA);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("todos");
  const [selectedUser, setSelectedUser] = useState(null);
  const [tempRol, setTempRol] = useState("");
  const [expandedCardId, setExpandedCardId] = useState(null);

  // Filtrado por buscador y por pestaña de rol
  const filteredUsers = usuarios.filter((user) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      user.nombre.toLowerCase().includes(term) ||
      user.id.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term);

    const matchesFilter =
      activeFilter === "todos" || user.rol === activeFilter;

    return matchesSearch && matchesFilter;
  });

  const totalUsuarios = usuarios.length;
  const totalAdministradores = usuarios.filter((u) => u.rol === "administrador").length;

  const handleOpenModal = (user, e) => {
    e.stopPropagation();
    setSelectedUser(user);
    setTempRol(user.rol);
  };

  const handleSaveRol = (e) => {
    e.preventDefault();
    if (!selectedUser) return;

    setUsuarios((prev) =>
      prev.map((u) => (u.id === selectedUser.id ? { ...u, rol: tempRol } : u))
    );
    setSelectedUser(null);
  };

  const toggleExpand = (id) => {
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  return (
    <div className="permisos-container">
      {/* Cabecera Principal */}
      <div className="permisos-header">
        <div>
          <h2 className="permisos-title">Gestión de Permisos y Roles</h2>
          <p className="permisos-desc">
            Administra los usuarios del sistema, busca por nombre o ID y actualiza sus permisos y accesos.
          </p>
        </div>
      </div>

      {/* Tarjetas de Métricas Superiores */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon-box">👥</div>
          <div>
            <span className="metric-label">Total de Usuarios</span>
            <h3 className="metric-value">{totalUsuarios}</h3>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon-box success">👑</div>
          <div>
            <span className="metric-label">Administradores</span>
            <h3 className="metric-value">{totalAdministradores}</h3>
          </div>
        </div>
      </div>

      {/* Barra de Búsqueda y Pestañas de Filtro */}
      <div className="catalog-toolbar">
        <div className="permisos-search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="permisos-search-input"
            placeholder="Buscar por ID (ej: USR-001) o Nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-search-btn" onClick={() => setSearchTerm("")}>
              ✕
            </button>
          )}
        </div>

        <div className="filter-tabs">
          <button
            className={`filter-tab-btn ${activeFilter === "todos" ? "active" : ""}`}
            onClick={() => setActiveFilter("todos")}
          >
            Todos
          </button>
          <button
            className={`filter-tab-btn ${activeFilter === "administrador" ? "active" : ""}`}
            onClick={() => setActiveFilter("administrador")}
          >
            Administradores
          </button>
          <button
            className={`filter-tab-btn ${activeFilter === "repartidor" ? "active" : ""}`}
            onClick={() => setActiveFilter("repartidor")}
          >
            Repartidores
          </button>
          <button
            className={`filter-tab-btn ${activeFilter === "cliente" ? "active" : ""}`}
            onClick={() => setActiveFilter("cliente")}
          >
            Clientes
          </button>
        </div>
      </div>

      {/* Listado de Tarjetas Estilo Acordeón */}
      <div className="catalog-section">
        <h3 className="section-heading">Directorio de Usuarios</h3>

        <div className="items-list">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => {
              const isExpanded = expandedCardId === user.id;
              return (
                <div
                  key={user.id}
                  className={`item-card-accordion ${isExpanded ? "expanded" : ""}`}
                >
                  <div className="item-card-header" onClick={() => toggleExpand(user.id)}>
                    <div className="item-info-left">
                      <div className="item-avatar-box">
                        {user.rol === "administrador" ? "👑" : user.rol === "repartidor" ? "🛵" : "👤"}
                      </div>
                      <div>
                        <div className="item-meta-row">
                          <span className="item-id-tag">{user.id}</span>
                          <span className="item-email-tag">{user.email}</span>
                        </div>
                        <h4 className="item-name">{user.nombre}</h4>
                      </div>
                    </div>

                    <div className="item-info-right">
                      <span className={`role-pill-badge ${user.rol}`}>
                        {user.rol}
                      </span>
                      <span className={`status-pill ${user.estado === "Activo" ? "active" : "inactive"}`}>
                        {user.estado}
                      </span>
                      <button
                        className="btn-trigger-action"
                        onClick={(e) => handleOpenModal(user, e)}
                      >
                        Cambiar Rol
                      </button>
                      <span className={`chevron-arrow ${isExpanded ? "rotate" : ""}`}>▼</span>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="item-dropdown-body">
                      <div className="dropdown-divider"></div>
                      <div className="dropdown-content-grid">
                        <div>
                          <strong>Información detallada de acceso:</strong>
                          <p style={{ margin: "0.3rem 0 0 0", color: "#726555", fontSize: "0.85rem" }}>
                            Este usuario cuenta con perfil de tipo <strong>{user.rol.toUpperCase()}</strong>. 
                            Puedes modificar sus privilegios de seguridad haciendo clic en el botón "Cambiar Rol".
                          </p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                          <button
                            className="btn-modal-save"
                            style={{ padding: "0.5rem 1rem", fontSize: "0.82rem" }}
                            onClick={(e) => handleOpenModal(user, e)}
                          >
                            Configurar Permisos
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="empty-catalog-box">
              <p>No se encontraron usuarios que coincidan con la búsqueda.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal Emergente para Cambiar Rol */}
      {selectedUser && (
        <div className="modal-overlay" onClick={() => setSelectedUser(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Modificar Rol de Usuario</h3>
              <button className="modal-close-btn" onClick={() => setSelectedUser(null)}>
                ✕
              </button>
            </div>

            <div className="modal-user-summary">
              <span className="item-id-tag">{selectedUser.id}</span>
              <strong>{selectedUser.nombre}</strong>
              <small>{selectedUser.email}</small>
            </div>

            <form onSubmit={handleSaveRol} className="modal-form">
              <label className="modal-label">Selecciona el nuevo rol:</label>

              <div className="roles-options-grid">
                <label className={`role-option-card ${tempRol === "cliente" ? "selected" : ""}`}>
                  <input
                    type="radio"
                    name="rol"
                    value="cliente"
                    checked={tempRol === "cliente"}
                    onChange={(e) => setTempRol(e.target.value)}
                  />
                  <span className="role-icon">👤</span>
                  <div>
                    <strong>Cliente</strong>
                    <small>Acceso estándar para compras y pedidos</small>
                  </div>
                </label>

                <label className={`role-option-card ${tempRol === "repartidor" ? "selected" : ""}`}>
                  <input
                    type="radio"
                    name="rol"
                    value="repartidor"
                    checked={tempRol === "repartidor"}
                    onChange={(e) => setTempRol(e.target.value)}
                  />
                  <span className="role-icon">🛵</span>
                  <div>
                    <strong>Repartidor</strong>
                    <small>Gestión y entrega de pedidos asignados</small>
                  </div>
                </label>

                <label className={`role-option-card ${tempRol === "administrador" ? "selected" : ""}`}>
                  <input
                    type="radio"
                    name="rol"
                    value="administrador"
                    checked={tempRol === "administrador"}
                    onChange={(e) => setTempRol(e.target.value)}
                  />
                  <span className="role-icon">👑</span>
                  <div>
                    <strong>Administrador</strong>
                    <small>Control total sobre menú, pedidos y permisos</small>
                  </div>
                </label>
              </div>

              <div className="modal-actions-row">
                <button type="button" className="btn-modal-cancel" onClick={() => setSelectedUser(null)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-modal-save">
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}