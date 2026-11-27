import React, { useState } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  const [aceptado, setAceptado] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleAceptarTerminos = () => {
    setAceptado(true);
    setMostrarModal(false);
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-form-section">
          <div className="form-wrapper">
            <header className="signup-header">
              <img
                className="brand-logo"
                src="/src/assets/img/logo_restaurante.png"
                alt="Logo Restaurante JCasas"
              />
              <h1 className="brand-title">JCasas</h1>
              <p className="brand-subtitle">Regístrate para hacer tu pedido</p>
            </header>

            <div className="tab-container">
              <button
                className="tab-button inactive"
                type="button"
                onClick={() => navigate("/login")}
              >
                Iniciar sesión
              </button>
              <button className="tab-button active" type="button">
                Registrarse
              </button>
            </div>

            <form className="form-wrapper" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label className="form-label">Nombre</label>
                <div className="input-box">
                  <img
                    src="/src/assets/icons/person.png"
                    alt="user"
                    className="field-icon"
                  />
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Saul"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email - Correo Electrónico</label>
                <div className="input-box">
                  <img
                    src="/src/assets/icons/mail.png"
                    alt="email"
                    className="field-icon"
                  />
                  <input
                    type="email"
                    className="input-field"
                    placeholder="exampleEmail@gmail.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Número</label>
                <div className="input-box">
                  <img
                    src="/src/assets/icons/call_end (1).png"
                    alt="phone"
                    className="field-icon"
                  />
                  <input
                    type="tel"
                    className="input-field"
                    placeholder="322 562 3244"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Contraseña</label>
                <div className="input-box">
                  <img
                    src="/src/assets/icons/icons8-candado-24.png"
                    alt="lock"
                    className="field-icon"
                  />
                  <input
                    type="password"
                    className="input-field"
                    placeholder="••••••••••••"
                  />
                </div>
              </div>

              <div className="terms-container">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    checked={aceptado}
                    onChange={(e) => setAceptado(e.target.checked)}
                  />
                  <span className="checkbox-text">
                    Aceptar los{" "}
                    <button
                      type="button"
                      className="link-btn-terms"
                      onClick={() => setMostrarModal(true)}
                    >
                      términos y condiciones
                    </button>
                  </span>
                </label>
              </div>

              <button type="submit" className="btn-submit" disabled={!aceptado}>
                Registrarse
              </button>
            </form>
          </div>
        </div>

        <div className="signup-image-section">
          <img
            className="signup-bg-image"
            src="/src/assets/img/imagen_registro.png"
            alt="Interior del Restaurante"
          />
        </div>
      </div>

      {mostrarModal && (
        <div className="modal-overlay" onClick={() => setMostrarModal(false)}>
          <div
            className="modal-content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="terms-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div className="modal-header-titles">
                <span className="modal-badge">JCasas Restaurante</span>
                <h3 id="terms-modal-title">Términos y Condiciones</h3>
              </div>
              <button
                type="button"
                className="close-btn"
                aria-label="Cerrar términos y condiciones"
                onClick={() => setMostrarModal(false)}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <div className="terms-item">
                <h4>1. Horarios de Servicio y Pedidos</h4>
                <p>
                  Los pedidos solo se receptarán y procesarán dentro del horario
                  operativo del restaurante (7:00 a.m. a 4:30 p.m.).
                </p>
              </div>

              <div className="terms-item">
                <h4>2. Estructura del Pedido</h4>
                <p>
                  Todo almuerzo solicitado debe estar compuesto obligatoriamente
                  por un (1) principio, una (1) proteína y un (1) acompañamiento.
                  Los ingredientes adicionales solo podrán agregarse a un pedido
                  base.
                </p>
              </div>

              <div className="terms-item">
                <h4>3. Precios y Tarifas de Domicilio</h4>
                <p>
                  El valor del almuerzo en el local es de $13.000 COP y a
                  domicilio de $14.500 COP (incluyendo la tarifa de domicilio de
                  $1.500 COP).
                </p>
              </div>

              <div className="terms-item">
                <h4>4. Disponibilidad de Menú</h4>
                <p>
                  Los almuerzos y sus ingredientes están sujetos a la
                  disponibilidad de inventario en tiempo real dentro del
                  restaurante.
                </p>
              </div>

              <div className="terms-item">
                <h4>5. Protección de Datos</h4>
                <p>
                  Los datos personales registrados (Nombre, Teléfono, Email) serán
                  utilizados únicamente para gestionar y procesar las entregas de
                  los pedidos.
                </p>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn-modal-cancel"
                onClick={() => setMostrarModal(false)}
              >
                Cerrar
              </button>
              <button
                type="button"
                className="btn-modal-accept"
                onClick={handleAceptarTerminos}
              >
                Aceptar términos
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignUp;