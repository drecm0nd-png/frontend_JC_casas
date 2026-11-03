import { useState } from "react";
import "./Configuracion.css";

export default function Configuracion() {
  // Estado para controlar si el aviso de confirmación está abierto o cerrado
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirmModal(true);
  };

  const handleCloseModal = () => {
    setShowConfirmModal(false);
  };

  const handleConfirmDelete = () => {
    // Aquí puedes poner la lógica para eliminar la cuenta (llamada a tu API, etc.)
    alert("Cuenta eliminada (simulación)");
    setShowConfirmModal(false);
  };

  return (
    <div className="config-container">
      {/* Tarjeta contenedora principal estilo crema/beige */}
      <div className="config-card">
        
        {/* Banner / Imagen de portada (Montañas) */}
        <div className="config-banner-wrapper">
          <img 
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80" 
            alt="Paisaje de montañas" 
            className="config-banner-img"
          />
        </div>

        {/* Sección de información del perfil y avatar */}
        <div className="config-body">
          <h2 className="config-title">Perfil de Usuario</h2>
          <p className="config-desc">
            Administra tu información personal, gestiona tus preferencias de cuenta y personaliza tu experiencia dentro de la aplicación. Desde aquí puedes actualizar tus datos de contacto, cambiar tu contraseña, configurar notificaciones y consultar tu historial de actividad de forma rápida y segura.
          </p>

          <div className="config-user-info-grid">
            {/* Avatar circular con sombra */}
            <div className="config-avatar-container">
              <div className="config-avatar-circle">
                <svg viewBox="0 0 24 24" width="64" height="64" fill="currentColor" style={{ color: "#fff" }}>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
              </div>
            </div>

            {/* Datos y Botones */}
            <div className="config-details">
              <div className="config-field">
                <span className="config-label">Nombre:</span>
                <span className="config-value">Felipe Galeano</span>
              </div>
              <div className="config-field">
                <span className="config-label">Correo:</span>
                <span className="config-value">exampleCorreo@gmail.com</span>
              </div>

              {/* Botones de acción */}
              <div className="config-actions">
                <button className="btn-action btn-edit">
                  ✏️ Editar Perfil
                </button>
                <button className="btn-action btn-logout">
                  🚪 Cerrar sesión
                </button>
                <button className="btn-action btn-delete" onClick={handleDeleteClick}>
                  Eliminar Cuenta
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Modal / Aviso de confirmación */}
      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3 className="modal-title">¿Estás seguro?</h3>
            <p className="modal-desc">
              Esta acción no se puede deshacer. Tu cuenta y todos tus datos se eliminarán permanentemente del sistema.
            </p>
            <div className="modal-actions">
              {/* Botón "No" (Más sutil, sin tanto protagonismo) */}
              <button className="btn-modal btn-cancel" onClick={handleCloseModal}>
                No, cancelar
              </button>
              {/* Botón "Sí" (Resalta bastante por ser la acción de peligro) */}
              <button className="btn-modal btn-confirm-danger" onClick={handleConfirmDelete}>
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}