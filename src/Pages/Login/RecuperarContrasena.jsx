import { useState } from "react";
import { FaKey } from "react-icons/fa";
import Button from "../../Components/Button/Button.jsx";
import "./RecuperarContrasena.css";

function RecuperarContrasena({ isOpen, onClose }) {
  const [emailRecovery, setEmailRecovery] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Solicitud enviada para:", emailRecovery);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <div className="modal-heading"><h2 className="modal-title">Recuperar contraseña</h2>
          <p className="modal-subtitle">
            Introduzca su correo electrónico para recuperar su contraseña
          </p></div>
        </header>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label" htmlFor="recovery-email">
              Correo electrónico
            </label>
            <input
              id="recovery-email"
              type="email"
              className="input-field modal-input"
              value={emailRecovery}
              onChange={(e) => setEmailRecovery(e.target.value)}
              required
            />
          </div>

          <div className="modal-actions">
            <Button type="submit" className="btn-submit">
              Recuperar contraseña
            </Button>
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RecuperarContrasena;
