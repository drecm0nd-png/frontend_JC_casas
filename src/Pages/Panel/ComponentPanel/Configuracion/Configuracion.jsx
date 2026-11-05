import { useState } from "react";
import "./Configuracion.css";

export default function Configuracion() {
  // Estado principal de datos de usuario (incluyendo la foto)
  const [userData, setUserData] = useState({
    nombre: "Felipe Galeano",
    correo: "exampleCorreo@gmail.com",
    telefono: "+57 300 123 4567",
    rol: "Administrador General",
    avatar: null // Guardará la URL o archivo de la foto
  });

  // Preferencias del sistema (Toggles)
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    orderAlerts: true,
  });

  // Modales
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false); // Modal para cambiar foto

  // Estados temporales para edición
  const [tempName, setTempName] = useState(userData.nombre);
  const [tempEmail, setTempEmail] = useState(userData.correo);
  const [tempPhone, setTempPhone] = useState(userData.telefono);
  const [tempAvatarUrl, setTempAvatarUrl] = useState("");

  // Estados para contraseña
  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirmPass: ""
  });

  // Manejo de guardado de perfil
  const handleSaveEdit = (e) => {
    e.preventDefault();
    setUserData({ ...userData, nombre: tempName, correo: tempEmail, telefono: tempPhone });
    setShowEditModal(false);
    alert("¡Perfil actualizado con éxito!");
  };

  // Manejo de cambio de contraseña
  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwords.newPass !== passwords.confirmPass) {
      alert("Las nuevas contraseñas no coinciden.");
      return;
    }
    alert("Contraseña actualizada correctamente.");
    setPasswords({ current: "", newPass: "", confirmPass: "" });
    setShowPasswordModal(false);
  };

  // Manejo de carga de imagen por archivo local
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setTempAvatarUrl(imageUrl);
    }
  };

  // Guardar nueva foto de perfil
  const handleSaveAvatar = (e) => {
    e.preventDefault();
    if (tempAvatarUrl) {
      setUserData({ ...userData, avatar: tempAvatarUrl });
      setShowAvatarModal(false);
      alert("¡Foto de perfil actualizada con éxito!");
    }
  };

  const handleToggle = (key) => {
    setPreferences({ ...preferences, [key]: !preferences[key] });
  };

  return (
    <div className="config-container">
      {/* Tarjeta contenedora principal */}
      <div className="config-card">
        
        {/* Banner / Portada */}
        <div className="config-banner-wrapper">
          <img 
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80" 
            alt="Paisaje de montañas" 
            className="config-banner-img"
          />
          {/* Avatar flotante con botón para cambiar foto */}
          <div className="config-avatar-floating" onClick={() => setShowAvatarModal(true)} title="Cambiar foto de perfil">
            <div className="config-avatar-circle">
              {userData.avatar ? (
                <img src={userData.avatar} alt="Avatar" className="config-avatar-img" />
              ) : (
                <svg viewBox="0 0 24 24" width="56" height="56" fill="currentColor" style={{ color: "#fff" }}>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
              )}
            </div>
            <div className="avatar-edit-overlay">
              <span>📷</span>
            </div>
          </div>
        </div>

        {/* Cuerpo de la configuración */}
        <div className="config-body">
          <h2 className="config-title">Configuración de Cuenta</h2>
          <p className="config-desc">
            Administra la información de tu perfil, credenciales de acceso, preferencias del sistema y parámetros avanzados de seguridad para tu labor en el restaurante.
          </p>

          <div className="config-grid-sections">
            
            {/* SECCIÓN 1: INFORMACIÓN PERSONAL */}
            <div className="config-section-box">
              <h3 className="section-subtitle">👤 Información Personal</h3>
              <div className="config-details">
                <div className="config-field">
                  <span className="config-label">Nombre:</span>
                  <span className="config-value">{userData.nombre}</span>
                </div>
                <div className="config-field">
                  <span className="config-label">Correo:</span>
                  <span className="config-value">{userData.correo}</span>
                </div>
                <div className="config-field">
                  <span className="config-label">Teléfono:</span>
                  <span className="config-value">{userData.telefono}</span>
                </div>
                <div className="config-field">
                  <span className="config-label">Rol:</span>
                  <span className="config-badge-role">{userData.rol}</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: "0.5rem", flexDirection: "column" }}>
                <button className="btn-action btn-edit" onClick={() => { setTempName(userData.nombre); setTempEmail(userData.correo); setTempPhone(userData.telefono); setShowEditModal(true); }}>
                  ✏️ Editar Datos Personales
                </button>
                <button className="btn-action btn-secondary-pro" onClick={() => { setTempAvatarUrl(userData.avatar || ""); setShowAvatarModal(true); }}>
                  🖼️ Cambiar Foto de Perfil
                </button>
              </div>
            </div>

            {/* SECCIÓN 2: SEGURIDAD Y CONTRASEÑA */}
            <div className="config-section-box">
              <h3 className="section-subtitle">🔒 Seguridad</h3>
              <p className="section-box-desc">
                Protege tu cuenta actualizando tu contraseña periódicamente.
              </p>
              <div className="config-field" style={{ marginBottom: "1.5rem" }}>
                <span className="config-label">Contraseña:</span>
                <span className="config-value">••••••••••••</span>
              </div>
              <button className="btn-action btn-secondary-pro" onClick={() => setShowPasswordModal(true)}>
                🔑 Cambiar Contraseña
              </button>
            </div>

            {/* SECCIÓN 3: PREFERENCIAS DEL SISTEMA */}
            <div className="config-section-box full-width">
              <h3 className="section-subtitle">⚙️ Preferencias de Notificaciones</h3>
              <div className="preferences-list">
                <div className="pref-item">
                  <div>
                    <span className="pref-title">Notificaciones por correo</span>
                    <p className="pref-desc">Recibe reportes semanales y resúmenes del sistema.</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" checked={preferences.emailNotifications} onChange={() => handleToggle('emailNotifications')} />
                    <span className="slider round"></span>
                  </label>
                </div>

                <div className="pref-item">
                  <div>
                    <span className="pref-title">Alertas de nuevos pedidos</span>
                    <p className="pref-desc">Sonido y aviso emergente cuando ingresa un pedido web.</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" checked={preferences.orderAlerts} onChange={() => handleToggle('orderAlerts')} />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
            </div>

          </div>

          {/* BOTONES FINALES */}
          <div className="config-footer-actions">
            <button className="btn-action btn-logout" onClick={() => alert("Sesión finalizada.")}>
              🚪 Cerrar Sesión
            </button>
            <button className="btn-action btn-delete" onClick={() => setShowDeleteModal(true)}>
              ⚠️ Eliminar Cuenta Permanentemente
            </button>
          </div>

        </div>
      </div>

      {/* --- MODAL: CAMBIAR FOTO DE PERFIL --- */}
      {showAvatarModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3 className="modal-title">Actualizar Foto de Perfil</h3>
            <form onSubmit={handleSaveAvatar}>
              <div className="form-group" style={{ textAlign: "center", marginBottom: "1rem" }}>
                <div className="modal-avatar-preview">
                  {tempAvatarUrl ? (
                    <img src={tempAvatarUrl} alt="Vista previa" className="config-avatar-img" />
                  ) : (
                    <div className="config-avatar-circle" style={{ margin: "0 auto" }}>
                      <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor" style={{ color: "#fff" }}>
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Sube una imagen desde tu dispositivo:</label>
                <input type="file" accept="image/*" onChange={handleFileChange} className="form-input" style={{ padding: "0.4rem" }} />
              </div>

              <div className="form-group" style={{ marginTop: "1rem" }}>
                <label className="form-label">O pega el enlace de una imagen (URL):</label>
                <input 
                  type="url" 
                  placeholder="https://ejemplo.com/mi-foto.jpg" 
                  value={tempAvatarUrl.startsWith("blob:") ? "" : tempAvatarUrl} 
                  onChange={(e) => setTempAvatarUrl(e.target.value)} 
                  className="form-input" 
                />
              </div>

              <div className="modal-actions" style={{ marginTop: "1.5rem" }}>
                <button type="button" className="btn-modal btn-cancel" onClick={() => setShowAvatarModal(false)}>Cancelar</button>
                <button type="submit" className="btn-modal btn-confirm-primary">Guardar Foto</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: EDITAR PERFIL --- */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3 className="modal-title">Editar Información Personal</h3>
            <form onSubmit={handleSaveEdit}>
              <div className="form-group">
                <label className="form-label">Nombre completo:</label>
                <input type="text" value={tempName} onChange={(e) => setTempName(e.target.value)} className="form-input" required />
              </div>
              <div className="form-group" style={{ marginTop: "1rem" }}>
                <label className="form-label">Correo electrónico:</label>
                <input type="email" value={tempEmail} onChange={(e) => setTempEmail(e.target.value)} className="form-input" required />
              </div>
              <div className="form-group" style={{ marginTop: "1rem" }}>
                <label className="form-label">Teléfono de contacto:</label>
                <input type="text" value={tempPhone} onChange={(e) => setTempPhone(e.target.value)} className="form-input" required />
              </div>
              <div className="modal-actions" style={{ marginTop: "1.5rem" }}>
                <button type="button" className="btn-modal btn-cancel" onClick={() => setShowEditModal(false)}>Cancelar</button>
                <button type="submit" className="btn-modal btn-confirm-primary">Guardar Cambios</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: CAMBIAR CONTRASEÑA --- */}
      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3 className="modal-title">Cambiar Contraseña</h3>
            <form onSubmit={handlePasswordChange}>
              <div className="form-group">
                <label className="form-label">Contraseña Actual:</label>
                <input type="password" value={passwords.current} onChange={(e) => setPasswords({...passwords, current: e.target.value})} className="form-input" required />
              </div>
              <div className="form-group" style={{ marginTop: "0.85rem" }}>
                <label className="form-label">Nueva Contraseña:</label>
                <input type="password" value={passwords.newPass} onChange={(e) => setPasswords({...passwords, newPass: e.target.value})} className="form-input" required />
              </div>
              <div className="form-group" style={{ marginTop: "0.85rem" }}>
                <label className="form-label">Confirmar Nueva Contraseña:</label>
                <input type="password" value={passwords.confirmPass} onChange={(e) => setPasswords({...passwords, confirmPass: e.target.value})} className="form-input" required />
              </div>
              <div className="modal-actions" style={{ marginTop: "1.5rem" }}>
                <button type="button" className="btn-modal btn-cancel" onClick={() => setShowPasswordModal(false)}>Cancelar</button>
                <button type="submit" className="btn-modal btn-confirm-primary">Actualizar Clave</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: ELIMINAR CUENTA --- */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3 className="modal-title">¿Estás completamente seguro?</h3>
            <p className="modal-desc">
              Esta acción es irreversible. Se borrarán todos tus permisos, registros y datos vinculados a este panel de administración.
            </p>
            <div className="modal-actions">
              <button className="btn-modal btn-cancel" onClick={() => setShowDeleteModal(false)}>No, cancelar</button>
              <button className="btn-modal btn-confirm-danger" onClick={() => { alert("Cuenta eliminada."); setShowDeleteModal(false); }}>Sí, eliminar cuenta</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}