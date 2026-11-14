import React from "react";
import PageHeader from "../../Components/PageHeader/PageHeader";
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaShieldHalved, 
  FaLocationDot, 
  FaIdBadge,
  FaPenToSquare 
} from "react-icons/fa6";
import "./Profile.css";

export default function Profile() {
  // Datos de perfil con información genérica y rol de Cliente
  const userData = {
    nombre: "Alejandro Martínez",
    correo: "alejandro.martinez@correo-ejemplo.com",
    telefono: "+57 300 987 6543",
    rol: "Cliente",
    direccion: "Calle 30 Sur # 12-45, Zona Residencial",
    idUsuario: "#JC-POS-9982"
  };

  return (
    <div className="profile-page-container">
      <div className="profile-main-content">
        
        {/* Cabecera unificada */}
        <PageHeader 
          subtitle="Gestión de Cuenta"
          title="Perfil de Usuario"
          description="Visualiza la información detallada de tu cuenta, datos de contacto y rol actual dentro del sistema."
          badgeText="JC Casas POS"
          badgeIcon={FaUser}
        />

        {/* Super Tarjeta de Perfil Estilo Configuración */}
        <div className="super-profile-card">
          <div className="profile-banner-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80" 
              alt="Banner" 
              className="profile-banner-img"
            />
            <div className="profile-avatar-floating">
              <div className="profile-avatar-circle">
                <FaUser size={45} style={{ color: "#fff" }} />
              </div>
            </div>
          </div>

          <div className="profile-body">
            <h2 className="profile-title">{userData.nombre}</h2>
            <p className="profile-desc">
              Consulta tus datos de registro y la información vinculada a tus pedidos y entregas en el restaurante.
            </p>

            <div className="profile-grid-sections">
              
              {/* SECCIÓN 1: INFORMACIÓN PERSONAL */}
              <div className="profile-section-box">
                <h3 className="section-subtitle">
                  <FaUser size={18} /> Información Personal
                </h3>
                <div className="profile-details">
                  <div className="profile-field">
                    <span className="profile-label"><FaUser size={14} /> Nombre:</span>
                    <span className="profile-value">{userData.nombre}</span>
                  </div>
                  <div className="profile-field">
                    <span className="profile-label"><FaEnvelope size={14} /> Correo:</span>
                    <span className="profile-value">{userData.correo}</span>
                  </div>
                  <div className="profile-field">
                    <span className="profile-label"><FaPhone size={14} /> Teléfono:</span>
                    <span className="profile-value">{userData.telefono}</span>
                  </div>
                  <div className="profile-field">
                    <span className="profile-label"><FaShieldHalved size={14} /> Rol:</span>
                    <span className="profile-badge-role">{userData.rol}</span>
                  </div>
                </div>
              </div>

              {/* SECCIÓN 2: DATOS DE ENVÍO Y SISTEMA */}
              <div className="profile-section-box">
                <h3 className="section-subtitle">
                  <FaLocationDot size={18} /> Detalles de Ubicación e ID
                </h3>
                <div className="profile-details">
                  <div className="profile-field">
                    <span className="profile-label"><FaIdBadge size={14} /> ID de Usuario:</span>
                    <span className="profile-value">{userData.idUsuario}</span>
                  </div>
                  <div className="profile-field" style={{ alignItems: "flex-start", flexDirection: "column", gap: "0.3rem" }}>
                    <span className="profile-label"><FaLocationDot size={14} /> Dirección de Entrega:</span>
                    <span className="profile-value" style={{ fontWeight: "normal" }}>{userData.direccion}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* BOTÓN DE ACCIÓN */}
            <div className="profile-footer-actions">
              <button className="btn-action btn-edit" onClick={() => alert("Función para editar perfil próximamente")}>
                <FaPenToSquare size={16} /> Editar Información Personal
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}