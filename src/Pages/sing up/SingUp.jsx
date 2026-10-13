import React from 'react';
import './SingUp.css';

function SingUp({ onNavigate }) {
  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-form-section">
          <div className="form-wrapper">
            
            <header className="signup-header">
              <img 
                className="brand-logo" 
                src="/src/assets/Images/Logo_Restaurante.png" 
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
                onClick={() => onNavigate && onNavigate('login')} // <- Vuelve al login
              >
                Iniciar sesión
              </button>
              <button 
                className="tab-button active" 
                type="button"
                onClick={() => onNavigate && onNavigate('signup')}
              >
                Registrarse
              </button>
            </div>

            {/* Resto del formulario de registro... */}
            <form className="form-wrapper" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label className="form-label">Nombre</label>
                <div className="input-box">
                  <span className="input-text">Saul</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Apellido</label>
                <div className="input-box">
                  <span className="input-text">Goodman</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email - Correo Electrónico</label>
                <div className="input-box">
                  <img src="/src/assets/Icons/Container (2).png" alt="Email" className="field-icon" />
                  <span className="input-text">exampleEmail@gmail.com</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Número</label>
                <div className="input-box">
                  <span className="input-text">322 562 3244</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Contraseña</label>
                <div className="input-box">
                  <img src="/src/assets/Icons/Container.png" alt="Candado" className="field-icon" />
                  <span className="input-text password-dots">••••••••••••</span>
                </div>
              </div>

              <div className="terms-container">
                <label className="checkbox-label">
                  <input type="checkbox" className="checkbox-input" defaultChecked />
                  <span className="checkbox-text">Aceptar los términos y condiciones</span>
                </label>
              </div>

              <button type="submit" className="btn-submit">
                Registrarse
              </button>
            </form>

            {/* Enlace inferior de redirección */}
            <div className="login-redirect-container" style={{ textAlign: 'center', marginTop: '0.5rem' }}>
              <button 
                type="button" 
                className="forgot-password-link"
                style={{ background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                onClick={() => onNavigate && onNavigate('login')}
              >
                ¿Ya tienes una cuenta?, Inicia sesión.
              </button>
            </div>

          </div>
        </div>

        <div className="signup-image-section">
          <img 
            className="signup-bg-image" 
            src="/src/assets/Images/image 1.png" 
            alt="Interior del Restaurante" 
          />
        </div>
      </div>
    </div>
  );
}

export default SingUp;