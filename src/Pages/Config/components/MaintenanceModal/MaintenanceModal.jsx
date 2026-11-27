import { FaTriangleExclamation, FaXmark } from "react-icons/fa6";
import "./MaintenanceModal.css";

export default function MaintenanceModal({
  isOpen,
  nextState, // true = va a iniciar, false = va a desactivar
  onConfirm,
  onCancel
}) {
  if (!isOpen) return null;

  const isStarting = nextState === true;

  return (
    <div className="maint-modal-overlay" role="dialog" aria-modal="true">
      <div className="maint-modal-card">
        <div className="maint-modal-header">
          <div className="maint-modal-icon-badge">
            <FaTriangleExclamation size={20} />
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="maint-modal-close"
            aria-label="Cerrar modal"
          >
            <FaXmark size={18} />
          </button>
        </div>

        <div className="maint-modal-body">
          <h3>
            {isStarting
              ? "¿Estás seguro de iniciar el modo mantenimiento?"
              : "¿Estás seguro de desactivar el modo mantenimiento?"}
          </h3>
          <p>
            {isStarting
              ? "Al iniciarlo, se pausará temporalmente la toma de nuevos pedidos y operaciones en caja hasta que decidas reactivarlo."
              : "Al desactivarlo, el sistema volverá a operar con normalidad y se habilitarán nuevamente los pedidos."}
          </p>
        </div>

        <div className="maint-modal-footer">
          <button
            type="button"
            onClick={onCancel}
            className="maint-btn-cancel"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`maint-btn-confirm ${isStarting ? "start" : "stop"}`}
          >
            {isStarting ? "Iniciar" : "Desactivar"}
          </button>
        </div>
      </div>
    </div>
  );
}