import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaUserPlus, FaRightLeft } from "react-icons/fa6";
import "./ProfileDropdown.css";

export default function ProfileDropdown({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  // Datos genéricos con el rol de Cliente
  const cuentaActual = {
    nombre: "Alejandro Martínez",
    email: "alejandro.martinez@correo-ejemplo.com",
    rol: "Cliente",
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
        <div className="profile-avatar-placeholder">
          <FaUser size={20} />
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