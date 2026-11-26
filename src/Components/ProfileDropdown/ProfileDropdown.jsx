import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaRepeat, FaUserPlus } from "react-icons/fa6";
import "./ProfileDropdown.css";

function ProfileDropdown({ isOpen, onClose }) {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest(".profile-wrapper-container")
      ) {
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleGoToProfile = () => {
    onClose?.();
    navigate("/perfil");
  };

  const handleGoToLogin = () => {
    onClose?.();
    navigate("/login");
  };

  return (
    <div className="profile-dropdown" ref={dropdownRef}>
      <div className="profile-dropdown-header">
        <div className="profile-avatar-circle">
          <span>A</span>
        </div>
        <div className="profile-user-info">
          <p className="profile-user-name">Alejandro Martínez</p>
          <p className="profile-user-email">alejandro.martinez@correo-ejemp...</p>
          <span className="profile-role-badge">CLIENTE</span>
        </div>
      </div>

      <div className="profile-dropdown-actions">
        <button
          type="button"
          className="profile-action-item"
          onClick={handleGoToLogin}
        >
          <FaRepeat size={15} />
          <span>Cambiar cuenta</span>
        </button>

        <button
          type="button"
          className="profile-action-item"
          onClick={handleGoToLogin}
        >
          <FaUserPlus size={15} />
          <span>Agregar cuenta</span>
        </button>
      </div>

      <div className="profile-dropdown-footer">
        <button
          type="button"
          className="profile-full-link"
          onClick={handleGoToProfile}
        >
          Ver perfil completo
        </button>
      </div>
    </div>
  );
}

export default ProfileDropdown;