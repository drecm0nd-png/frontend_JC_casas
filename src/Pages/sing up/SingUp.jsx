import React from 'react';
import './SingUp.css';

function SingUp({ onNavigate }) {
  return (
    <div className="signup-container">
      <div className="signup-card">
        
        {/* Columna Izquierda: Formulario */}
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
                onClick={() => onNavigate && onNavigate('login')}
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

            {/* Formulario de registro */}
            <form className="form-wrapper" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label className="form-label">Nombre</label>
                <div className="input-box">
                  <input type="text" className="input-field" placeholder="Saul" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Apellido</label>
                <div className="input-box">
                  <input type="text" className="input-field" placeholder="Goodman" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email - Correo Electrónico</label>
                <div className="input-box">
                  <img src="/src/assets/Icons/Container (2).png" alt="Email" className="field-icon" />
                  <input type="email" className="input-field" placeholder="exampleEmail@gmail.com" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Número</label>
                <div className="input-box">
                  <input type="tel" className="input-field" placeholder="322 562 3244" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Contraseña</label>
                <div className="input-box">
                  <img src="/src/assets/Icons/Container.png" alt="Candado" className="field-icon" />
                  <input type="text" className="input-field" placeholder="••••••••••••" />
                </div>
              </div>

              <div className="terms-container">
                <label className="checkbox-label">
                  <input type="checkbox" className="checkbox-input" />
                  <span className="checkbox-text">Aceptar los términos y condiciones</span>
                </label>
              </div>

              <button type="submit" className="btn-submit">
                Registrarse
              </button>
            </form>

            {/* Enlace inferior de redirección */}
            

          </div>
        </div>

        {/* Columna Derecha: Imagen Lateral */}
        <div className="signup-image-section">
          <img 
            className="signup-bg-image" 
            src="/src/assets/Images/imagen_registro.png" 
            alt="Interior del Restaurante" 
          />
        </div>

      </div>
    </div>
  );
}

export default SingUp;