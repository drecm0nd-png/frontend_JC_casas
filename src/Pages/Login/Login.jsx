import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Hooks/UseAuth.js";
import Button from "../../Components/Button/Button.jsx";
import RecuperarContrasena from "./RecuperarContrasena.jsx";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, login } = useAuth();
  const destination = location.state?.from?.pathname ?? "/";

  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mostrarContrasena, setMostrarContrasena] = useState(false);

  // Estado para la modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isAuthenticated) {
    return <Navigate to={destination} replace />;
  }

  const verContrasena = () => {
    setMostrarContrasena((prevState) => !prevState);
  };

  // Validación temporal para desarrollo frontend (acepta cualquier credencial no vacía)
  const handleSubmit = (event) => {
    event.preventDefault();

    if (email.trim() !== "" && contrasena.trim() !== "") {
      const userName = email.split("@")[0];
      const name = userName.trim() || "Usuario de demostración";

      login({ name, email: email.trim() });
      navigate(destination, { replace: true });
    } else {
      alert("Por favor, ingresa un correo y una contraseña.");
    }
  };

  // Acceso directo simulado para el botón de Google
  const handleGoogleLogin = () => {
    login({ name: "Usuario Google", email: "usuario.google@ejemplo.com" });
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
                src="/src/assets/img/logo.png"
                alt="Logo Restaurante JCasas"
              />
              <h1 className="brand-title">JCasas</h1>
              <p className="brand-subtitle">
                Ingresa para pedir tus platos favoritos
              </p>
            </header>

            <div className="tab-container">
              <button className="tab-button active" type="button">
                Iniciar sesión
              </button>
              <button
                className="tab-button inactive"
                type="button"
                onClick={() => navigate("/registro")}
              >
                Registrarse
              </button>
            </div>

            <form className="form-wrapper" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="email-input">
                  Correo electrónico
                </label>
                <div className="input-box">
                  <div className="input-content-left">
                    <img
                      src="/src/assets/icons/mail.png"
                      alt="Email"
                      className="field-icon"
                    />
                    <input
                      id="email-input"
                      type="email"
                      className="input-field"
                      placeholder="carlos@ejemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="password-input">
                  Contraseña
                </label>
                <div className="input-box">
                  <div className="input-content-left">
                    <img
                      src="/src/assets/icons/icons8-candado-24.png"
                      alt="Candado"
                      className="field-icon"
                    />
                    <input
                      id="password-input"
                      type={mostrarContrasena ? "text" : "password"}
                      className="input-field password-dots"
                      placeholder={
                        mostrarContrasena ? "Tu contraseña" : "••••••••"
                      }
                      value={contrasena}
                      onChange={(e) => setContrasena(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="button"
                    className="icon-button"
                    aria-label={
                      mostrarContrasena
                        ? "Ocultar contraseña"
                        : "Mostrar contraseña"
                    }
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

              {/* Enlace que activa la modal */}
              <div className="forgot-password-container">
                <button
                  type="button"
                  className="forgot-password-link"
                  onClick={() => setIsModalOpen(true)}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                  }}
                >
                  ¿Olvidaste tu contraseña?
                </button>
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
              onClick={handleGoogleLogin}
            >
              <img
                className="field-icon"
                src="/src/assets/icons/Icon (1).png"
                alt="Google"
              />
              <span>Continuar con Google</span>
            </button>
          </div>
        </div>

        <div className="login-image-section">
          <img
            className="login-bg-image"
            src="/src/assets/img/imagen_registro.png"
            alt="Interior del Restaurante"
          />
        </div>
      </div>

      {/* Renderizado de la modal */}
      <RecuperarContrasena
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default Login;