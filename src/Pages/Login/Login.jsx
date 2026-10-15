import React,{useState} from 'react';
import './Login.css';

function Login({ onNavigate }) {
  {/* leestamos indicando que por defecto no me muestre lo que voy digitando en el campo de contraseña */}
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const verContrasena=()=>{
    setMostrarContrasena((prevState) => !prevState);
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-form-section">
          <div className="form-wrapper">
            
            <header className="login-header">
              <img 
                className="brand-logo" 
                src="/src/assets/images/Logo_Restaurante.png" 
                alt="Logo Restaurante JCasas" 
              />
              <h1 className="brand-title">JCasas</h1>
              <p className="brand-subtitle">Ingresa para pedir tus platos favoritos</p>
            </header>

            {/* Pestañas de Navegación */}
            <div className="tab-container">
              <button 
                className="tab-button active" 
                type="button"
                onClick={() => onNavigate && onNavigate('login')}
              >
                Iniciar sesión
              </button>
              <button 
                className="tab-button inactive" 
                type="button"
                onClick={() => onNavigate && onNavigate('signup')}
              >
                Registrarse
              </button>
            </div>

            {/* Formulario Interactivo */}
            <form className="form-wrapper" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label className="form-label">Correo electrónico</label>
                <div className="input-box">
                  <div className="input-content-left">
                    <img src="/src/assets/icons/Container (2).png" alt="Email" className="field-icon" />
                    <input 
                      type="email" 
                      className="input-field" 
                      placeholder="carlos@ejemplo.com" 
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Contraseña</label>
                <div className="input-box">
                  <div className="input-content-left">
                    <img src="/src/assets/icons/Container.png" alt="Candado" className="field-icon" />
                    <input 
                      type= {mostrarContrasena ? 'text' : 'password'} 
                      className="input-field password-dots" 
                      placeholder= {mostrarContrasena? 'Tu contraseña' : "••••••••"} 
                    />
                  </div>
                  
                  {/* añadimos el evento onclick al boton del ojo */} 
                  <button type="button" className="icon-button" aria-label={mostrarContrasena ? 'Ocultar contraseña':'mostrar contraseña'}
                   onClick={verContrasena} >
                    <img src="/src/assets/icons/Container (1).png"  className="field-icon" />
                  </button>
                </div>
              </div>

              <div className="forgot-password-container">
                <a href="#forgot" className="forgot-password-link">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <button type="submit" className="btn-submit">
                Ingresar
              </button>
            </form>

            <div className="divider-container">
              <div className="divider-line" />
              <span className="divider-text">O continúa con</span>
              <div className="divider-line" />
            </div>

            <button type="button" className="btn-google">
              <img className="field-icon" src="/src/assets/icons/Icon.png" alt="Google" />
              <span>Continuar con Google</span>
            </button>

          </div>
        </div>

        <div className="login-image-section">
          <img 
            className="login-bg-image" 
            src="/src/assets/images/imagen_registro.png" 
            alt="Interior del Restaurante" 
          />
        </div>
      </div>
    </div>
  );
}

export default Login;   
