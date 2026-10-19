import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Hooks/UseAuth.js';
import Button from '../../Components/Button/Button.jsx';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, login } = useAuth();
  const destination = location.state?.from?.pathname ?? "/dashboard";

  // Estados del formulario y visibilidad
  const [email, setEmail] = useState("");
  const [mostrarContrasena, setMostrarContrasena] = useState(false);

  // Redirección si ya está autenticado
  if (isAuthenticated) {
    return <Navigate to={destination} replace />;
  }

  const verContrasena = () => {
    setMostrarContrasena((prevState) => !prevState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Utiliza el email o un usuario por defecto para iniciar sesión en useAuth
    const userName = email.split('@')[0];
    login({ name: userName.trim() || "Usuario de demostración" });
    navigate(destination, { replace: true });
  };

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
              >
                Iniciar sesión
              </button>
              <button 
                className="tab-button inactive" 
                type="button"
                onClick={() => navigate('/signup')}
              >
                Registrarse
              </button>
            </div>

            {/* Formulario Interactivo con lógica de login */}
            <form className="form-wrapper" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="email-input">Correo electrónico</label>
                <div className="input-box">
                  <div className="input-content-left">
                    <img src="/src/assets/icons/mail.png" alt="Email" className="field-icon" />
                    <input 
                      id="email-input"
                      type="email" 
                      className="input-field" 
                      placeholder="carlos@ejemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="password-input">Contraseña</label>
                <div className="input-box">
                  <div className="input-content-left">
                    <img src="/src/assets/icons/icons8-candado-24.png" alt="Candado" className="field-icon" />
                    <input 
                      id="password-input"
                      type={mostrarContrasena ? 'text' : 'password'} 
                      className="input-field password-dots" 
                      placeholder={mostrarContrasena ? 'Tu contraseña' : "••••••••"} 
                    />
                  </div>
                  
                  <button 
                    type="button" 
                    className="icon-button" 
                    aria-label={mostrarContrasena ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    onClick={verContrasena}
                  >
                    <img 
                      src={
                        mostrarContrasena 
                          ? "/src/assets/icons/visibility_24dp_000000_FILL0_wght400_GRAD0_opsz24.png" 
                          : "/src/assets/icons/visibility_off_24dp_000000_FILL0_wght400_GRAD0_opsz24 (1).png"
                      } 
                      alt="Icono visibilidad"
                      className="field-icon" 
                    />
                  </button>
                </div>
              </div>

              <div className="forgot-password-container">
                <a href="#forgot" className="forgot-password-link">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <Button type="submit" className="btn-submit">
                Ingresar
              </Button>
            </form>

            <div className="divider-container">
              <div className="divider-line" />
              <span className="divider-text">O continúa con</span>
              <div className="divider-line" />
            </div>

            <button 
              type="button" 
              className="btn-google"
              onClick={handleSubmit}
            >
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