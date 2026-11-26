import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaUserPlus, FaRightLeft } from "react-icons/fa6";
import { useProfile } from "../../Hooks/UseProfile.js";
import "./ProfileDropdown.css";

export default function ProfileDropdown({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { userData } = useProfile();

  if (!isOpen) return null;

  // Datos reales del perfil (los mismos que se editan en /perfil)
  const cuentaActual = {
    nombre: userData.nombre,
    email: userData.correo,
    rol: userData.rol,
    avatar: userData.avatar,
  };

  const handleVerPerfil = () => {
    onClose();
    navigate("/perfil");
  };

  const handleAgregarCuenta = () => {
    onClose();
    navigate("/login");
  };

  const handleChangeCuenta = () => {
    onClose();
    navigate("/login");
  };

  return (
    <div className="profile-dropdown-container">
      <div className="profile-dropdown-header">
        <div className="profile-avatar-placeholder" style={{ overflow: "hidden" }}>
          {cuentaActual.avatar ? (
            <img
              src={cuentaActual.avatar}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <FaUser size={20} />
          )}
        </div>
        <div className="profile-info-text">
          <h5>{cuentaActual.nombre}</h5>
          <p>{cuentaActual.email}</p>
          <span className="profile-role-badge">{cuentaActual.rol}</span>
        </div>
      </div>

      <div className="profile-dropdown-actions">
        <button type="button" className="profile-action-item" onClick={handleChangeCuenta}>
          <FaRightLeft size={14} />
          <span>Cambiar cuenta</span>
        </button>

        <button type="button" className="profile-action-item" onClick={handleAgregarCuenta}>
          <FaUserPlus size={14} />
          <span>Agregar cuenta</span>
        </button>
      </div>

      <div className="profile-dropdown-footer">
        <button type="button" onClick={handleVerPerfil} className="btn-view-profile">
          Ver perfil completo
        </button>
      </div>
    </div>
  );
}