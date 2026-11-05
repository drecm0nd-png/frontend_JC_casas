import React, { useState } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";

function SingUp() {
  const navigate = useNavigate();

  // Estados para la casilla de verificación y la ventana emergente (Modal)
  const [aceptado, setAceptado] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);

  return (
    <div className="signup-container">
      <div className="signup-card">
        {/* Columna Izquierda: Formulario */}
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

            {/* Pestañas de Navegación */}
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

            {/* Formulario de registro */}
            <form className="form-wrapper" onSubmit={(e) => e.preventDefault()}>
              {/* Campo: Nombre */}
              <div className="form-group">
                <label className="form-label">Nombre</label>
                <div className="input-box">
                  <img src="/src/assets/icons/person.png" alt="user" />
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Saul"
                  />
                </div>
              </div>

              {/* Campo: Email */}
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

              {/* Campo: Número */}
              <div className="form-group">
                <label className="form-label">Número</label>
                <div className="input-box">
                  <img src="/src/assets/icons/call_end (1).png" alt="phone" />
                  <input
                    type="tel"
                    className="input-field"
                    placeholder="322 562 3244"
                  />
                </div>
              </div>

              {/* Campo: Contraseña */}
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

              {/* Checkbox Términos con Enlace a Modal */}
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

              {/* Botón de Enviar */}
              <button type="submit" className="btn-submit" disabled={!aceptado}>
                Registrarse
              </button>
            </form>
          </div>
        </div>

        {/* Columna Derecha: Imagen Lateral */}
        <div className="signup-image-section">
          <img
            className="signup-bg-image"
            src="/src/assets/img/imagen_registro.png"
            alt="Interior del Restaurante"
          />
        </div>
      </div>

      {/* Modal Emergente con los Términos del Sistema */}
      {mostrarModal && (
        <div className="modal-overlay" onClick={() => setMostrarModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Términos y Condiciones - JCasas</h3>
              <button
                type="button"
                className="close-btn"
                onClick={() => setMostrarModal(false)}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <h4>1. Horarios de Servicio y Pedidos</h4>
              <p>
                Los pedidos solo se receptarán y procesarán dentro del horario
                operativo del restaurante (7:00 a.m. a 4:30 p.m.)[cite: 2].
              </p>

              <h4>2. Estructura del Pedido</h4>
              <p>
                Todo almuerzo solicitado debe estar compuesto obligatoriamente por un
                (1) principio, una (1) proteína y un (1) acompañamiento[cite: 2]. Los
                ingredientes adicionales solo podrán agregarse a un pedido base[cite: 2].
              </p>

              <h4>3. Precios y Tarifas de Domicilio</h4>
              <p>
                El valor del almuerzo en el local es de $13.000 COP y a domicilio
                de $14.500 COP (incluyendo la tarifa de domicilio de $1.500 COP)[cite: 2, 3].
              </p>

              <h4>4. Disponibilidad de Menú</h4>
              <p>
                Los almuerzos y sus ingredientes están sujetos a la disponibilidad
                de inventario en tiempo real dentro del restaurante[cite: 2].
              </p>

              <h4>5. Protección de Datos</h4>
              <p>
                Los datos personales registrados (Nombre, Teléfono, Email) serán
                utilizados únicamente para gestionar y procesar las entregas de los
                pedidos[cite: 2].
              </p>
            </div>

            <div className="modal-footer">
             
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SingUp;