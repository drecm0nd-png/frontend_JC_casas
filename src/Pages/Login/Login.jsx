import React from 'react';
import './Login.css';

 function Login() {
  return (
    <div className="login-container">
      <div className="login-card">
        
        {/* Sección Izquierda: Formulario de Login */}
        <div className="login-form-section">
          <div className="form-wrapper">
            
            {/* Header / Logo */}
            <header className="login-header">
              <img 
                className="brand-logo" 
                src="/src/assets/Images/Logo_Restaurante.png" 
                alt="Logo Restaurante JCasas" 
              />
              <h1 className="brand-title">JCasas</h1>
              <p className="brand-subtitle">Ingresa para pedir tus platos favoritos</p>
            </header>

            {/* Pestañas de Navegación */}
            <div className="tab-container">
              <button className="tab-button active" type="button">
                Iniciar sesión
              </button>
              <button className="tab-button inactive" type="button">
                Registrarse
              </button>
            </div>

            {/* Formulario */}
            <form className="form-wrapper" onSubmit={(e) => e.preventDefault()}>
              
              {/* Campo Correo */}
              <div className="form-group">
                <label className="form-label">Correo electrónico</label>
                <div className="input-box">
                  <div className="input-content-left">
                    <img src="/src/assets/Icons/Container (2).png" alt="Email" className="field-icon" />
                    <span className="input-text">carlos@ejemplo.com</span>
                  </div>
                </div>
              </div>

              {/* Campo Contraseña */}
              <div className="form-group">
                <label className="form-label">Contraseña</label>
                <div className="input-box">
                  <div className="input-content-left">
                    <img src="/src/assets/Icons/Container.png" alt="Candado" className="field-icon" />
                    <span className="input-text password-dots">••••••••</span>
                  </div>
                  <button type="button" className="icon-button" aria-label="Mostrar contraseña">
                    <img src="/src/assets/Icons/Container (1).png" alt="Ocultar" className="field-icon" />
                  </button>
                </div>
              </div>

              {/* Enlace Olvidaste Contraseña */}
              <div className="forgot-password-container">
                <a href="#forgot" className="forgot-password-link">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              {/* Botón Ingresar */}
              <button type="submit" className="btn-submit">
                Ingresar
              </button>
            </form>

            {/* Separador */}
            <div className="divider-container">
              <div className="divider-line" />
              <span className="divider-text">O continúa con</span>
              <div className="divider-line" />
            </div>

            {/* Botón Google */}
            <button type="button" className="btn-google">
              <img className="field-icon" src="/src/assets/icons/Icon.png" alt="Google" />
              <span>Continuar con Google</span>
            </button>

          </div>
        </div>

        {/* Sección Derecha: Imagen del Restaurante */}
        <div className="login-image-section">
          <img 
            className="login-bg-image" 
            src="/src/assets/Images/image 1.png" 
            alt="Interior del Restaurante" 
          />
        </div>

      </div>
    </div>
  );
} 
export default Login;