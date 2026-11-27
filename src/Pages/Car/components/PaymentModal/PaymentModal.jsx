import { useEffect, useState } from "react";
import { FaQrcode, FaMoneyBillWave, FaMoneyBills, FaPenToSquare, FaCheck, FaXmark } from "react-icons/fa6";
import lucas from "../../../../assets/img/Billetes/20lucas.jpg";
import lucas2 from "../../../../assets/img/Billetes/50lucas.jpg";
import lucas3 from "../../../../assets/img/Billetes/100.jpg";
import qrImage from "../../../../assets/icons/codeQR.webp";
import "./PaymentModal.css";

const DENOMINACIONES_EFECTIVO = [
  {
    value: "exacto",
    label: "Exacto",
    sublabel: "Sin cambio",
    isExact: true,
    image: null
  },
  {
    value: "20000",
    label: "$20.000",
    sublabel: "Billete",
    isExact: false,
    image: lucas
  },
  {
    value: "50000",
    label: "$50.000",
    sublabel: "Billete",
    isExact: false,
    image: lucas2
  },
  {
    value: "100000",
    label: "$100.000",
    sublabel: "Billete",
    isExact: false,
    image: lucas3
  }
];

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
  const [billeteSeleccionado, setBilleteSeleccionado] = useState("exacto");
  const [montoPersonalizado, setMontoPersonalizado] = useState("");

  useEffect(() => {
    if (metodoSeleccionado !== "efectivo") {
      setBilleteSeleccionado("exacto");
      setMontoPersonalizado("");
    }
  }, [metodoSeleccionado]);

  if (!isOpen) return null;

  const esMontoDiferente = billeteSeleccionado === "otro";
  const montoEfectivo = esMontoDiferente
    ? Number(montoPersonalizado)
    : billeteSeleccionado !== "exacto"
      ? Number(billeteSeleccionado)
      : totalConEnvio;

  const tieneMontoValido =
    billeteSeleccionado === "exacto" ||
    (!esMontoDiferente && montoEfectivo >= totalConEnvio) ||
    (esMontoDiferente && montoPersonalizado.trim() !== "" && montoEfectivo >= totalConEnvio);

  const cambioEstimado =
    billeteSeleccionado !== "exacto" &&
    !Number.isNaN(montoEfectivo) &&
    montoEfectivo >= totalConEnvio
      ? montoEfectivo - totalConEnvio
      : null;

  const handleSeleccionPredefinida = (value) => {
    setBilleteSeleccionado(value);
    if (value !== "otro") {
      setMontoPersonalizado("");
    }
  };

  const handleConfirm = () => {
    const detalleEfectivo =
      metodoSeleccionado === "efectivo"
        ? esMontoDiferente
          ? { tipo: "otro", monto: montoEfectivo }
          : { tipo: billeteSeleccionado, monto: montoEfectivo }
        : null;

    onConfirmarPago(detalleEfectivo);
  };

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
        </div>

        {metodoSeleccionado === "nequi" && (
          <div className="car-qr-container">
            <p>
              Escanea el código QR con Nequi para pagar <strong>{totalConEnvio.toLocaleString()} $</strong>:
            </p>
            <div className="car-qr-box">
              <img src={qrImage} alt="Código QR Nequi" className="car-qr-img" />
            </div>
            <small className="car-qr-tip">Haz clic en confirmar abajo una vez pagues.</small>
          </div>
        )}

        {metodoSeleccionado === "efectivo" && (
          <div className="car-payment-info-box">
            <p className="car-cash-address-text">
              Prepara tu pago para el domiciliario en:{" "}
              <strong>
                {direccion}, Soacha, Cundinamarca{lugarBarrio ? ` (${lugarBarrio})` : ""}
              </strong>
            </p>

            <div className="car-cash-bill-group">
              <span className="car-cash-bill-label">¿Con qué billete vas a pagar?</span>

              <div className="car-bill-cards-grid" role="radiogroup" aria-label="Denominación de billete">
                {DENOMINACIONES_EFECTIVO.map((item) => {
                  const isSelected = billeteSeleccionado === item.value;
                  return (
                    <button
                      key={item.value}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      className={`car-bill-card ${item.isExact ? "is-exact" : "is-bill"} ${
                        item.image ? "has-image" : ""
                      } ${isSelected ? "selected" : ""}`}
                      onClick={() => handleSeleccionPredefinida(item.value)}
                    >
                      {isSelected && (
                        <span className="car-bill-check" aria-hidden="true">
                          <FaCheck size={10} />
                        </span>
                      )}

                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.label}
                          className="car-bill-img"
                          aria-hidden="true"
                        />
                      ) : (
                        <div className="car-bill-bg-icon" aria-hidden="true">
                          {item.isExact ? (
                            <FaMoneyBillWave size={34} />
                          ) : (
                            <FaMoneyBills size={34} />
                          )}
                        </div>
                      )}

                      <div className="car-bill-overlay-text">
                        <span className="car-bill-amount">{item.label}</span>
                        <span className="car-bill-sublabel">{item.sublabel}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                className={`car-custom-amount-btn ${esMontoDiferente ? "selected" : ""}`}
                onClick={() => setBilleteSeleccionado("otro")}
              >
                <span className="car-custom-amount-left">
                  <FaPenToSquare size={15} />
                  <span>Elegir un valor de monto diferente</span>
                </span>
                {esMontoDiferente && (
                  <span className="car-bill-check car-custom-check" aria-hidden="true">
                    <FaCheck size={10} />
                  </span>
                )}
              </button>

              {esMontoDiferente && (
                <div className="car-custom-amount-field">
                  <input
                    type="text"
                    min={totalConEnvio}
                    step="500"
                 
                    className="car-custom-amount-input"
                    value={montoPersonalizado}
                    onChange={(e) => setMontoPersonalizado(e.target.value)}
                    placeholder="Digita con cuánto pagarás para calcular tu cambio"
                    aria-label="Valor de monto diferente en efectivo"
                  />
                </div>
              )}

              {cambioEstimado !== null && (
                <small className="car-cash-change-hint">
                  Cambio aproximado: <strong>{cambioEstimado.toLocaleString()} $</strong>
                </small>
              )}

              {billeteSeleccionado !== "exacto" &&
                (!esMontoDiferente || montoPersonalizado.trim() !== "") &&
                montoEfectivo < totalConEnvio && (
                  <small className="car-cash-warning-hint">
                    El monto ingresado es menor al total ({totalConEnvio.toLocaleString()} $).
                  </small>
                )}
            </div>
          </div>
        )}

        <div className="car-modal-footer">
          <button
            type="button"
            onClick={handleConfirm}
            disabled={metodoSeleccionado === "efectivo" && !tieneMontoValido}
            className="btn-confirm-final-pay"
          >
            Confirmar y Enviar Pedido ({totalConEnvio.toLocaleString()} $)
          </button>
        </div>
      </div>
    </div>
  );
}