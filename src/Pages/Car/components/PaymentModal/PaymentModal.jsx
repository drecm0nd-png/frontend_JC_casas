import { FaQrcode, FaMoneyBillWave, FaCreditCard, FaXmark } from "react-icons/fa6";
import qrImage from "../../../../assets/icons/codeQR.webp";
import "./PaymentModal.css";

export default function PaymentModal({
  isOpen,
  onClose,
  metodoSeleccionado,
  setMetodoSeleccionado,
  totalConEnvio,
  direccion,
  lugarBarrio,
  onConfirmarPago
}) {
  if (!isOpen) return null;

  return (
    <div className="car-modal-overlay">
      <div className="car-modal-content">
        <div className="car-modal-header">
          <h3>Selecciona el Método de Pago</h3>
          <button type="button" onClick={onClose} className="car-modal-close">
            <FaXmark size={18} />
          </button>
        </div>

        <div className="car-payment-methods">
          <button
            type="button"
            className={`car-payment-option ${metodoSeleccionado === "nequi" ? "active" : ""}`}
            onClick={() => setMetodoSeleccionado("nequi")}
          >
            <FaQrcode size={22} color="#cc0066" />
            <span>Nequi (Código QR)</span>
          </button>

          <button
            type="button"
            className={`car-payment-option ${metodoSeleccionado === "efectivo" ? "active" : ""}`}
            onClick={() => setMetodoSeleccionado("efectivo")}
          >
            <FaMoneyBillWave size={22} color="#2e7d32" />
            <span>Efectivo contra entrega</span>
          </button>

          <button
            type="button"
            className={`car-payment-option ${metodoSeleccionado === "tarjeta" ? "active" : ""}`}
            onClick={() => setMetodoSeleccionado("tarjeta")}
          >
            <FaCreditCard size={22} color="#1976d2" />
            <span>Tarjeta Débito / Crédito</span>
          </button>
        </div>

        {metodoSeleccionado === "nequi" && (
          <div className="car-qr-container">
            <p>Escanea el código QR con Nequi para pagar <strong>{totalConEnvio.toLocaleString()} $</strong>:</p>
            <div className="car-qr-box">
              <img src={qrImage} alt="Código QR Nequi" className="car-qr-img" />
            </div>
            <small className="car-qr-tip">Haz clic en confirmar abajo una vez pagues.</small>
          </div>
        )}

        {metodoSeleccionado === "efectivo" && (
          <div className="car-payment-info-box">
            <p>
              Prepara el dinero exacto para el domiciliario en:{" "}
              <strong>
                {direccion}, Soacha, Cundinamarca{lugarBarrio ? ` (${lugarBarrio})` : ""}
              </strong>
            </p>
          </div>
        )}

        {metodoSeleccionado === "tarjeta" && (
          <div className="car-payment-info-box">
            <p>El domiciliario llevará un datáfono inalámbrico a tu domicilio.</p>
          </div>
        )}

        <div className="car-modal-footer">
          <button type="button" onClick={onConfirmarPago} className="btn-confirm-final-pay">
            Confirmar y Enviar Pedido ({totalConEnvio.toLocaleString()} $)
          </button>
        </div>
      </div>
    </div>
  );
}