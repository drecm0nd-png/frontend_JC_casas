
<<<<<<< HEAD
import './SignUp.css';
=======
import "./SingUp.css";
>>>>>>> 2e36d63 (paneles)
import { useNavigate } from 'react-router-dom';
function SingUp() {
    const navigate = useNavigate();
  return (
    <div className="signup-container">
      <div className="signup-card">
        
        {/* Columna Izquierda: Formulario */}
        <div className="signup-form-section">
          <div className="form-wrapper">
            
            <header className="signup-header">
              <img 
                className="brand-logo" 
                src="/src/assets/img/Logo_Restaurante (2).png" 
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
               onClick={() => navigate('/login')}
              >
                Iniciar sesión
              </button>
              <button 
                className="tab-button active" 
                type="button"
              >
                Registrarse
              </button>
            </div>

          {/* Formulario de registro */}
<form className="form-wrapper" onSubmit={(e) => e.preventDefault()}>
  
  {/* Campo: Nombre */}
  <div className="form-group">
    <label className="form-label">Nombre</label>
    <div className="input-box">
      <img src="/src/assets/icons/person.png"/>
      <input type="text" className="input-field" placeholder="Saul" />
    </div>
  </div>

  {/* Campo: Apellido */}
  <div className="form-group">
    <label className="form-label">Apellido</label>
    <div className="input-box">
       <img src="/src/assets/icons/person.png"/>
      <input type="text" className="input-field" placeholder="Goodman" />
    </div>
  </div>

  {/* Campo: Email */}
  <div className="form-group">
    <label className="form-label">Email - Correo Electrónico</label>
    <div className="input-box">
      {/* Si tienes el icono de email, agrégalo aquí */}
      <img src="/src/assets/icons/mail.png" alt="email" className="field-icon" /> 
      <input type="email" className="input-field" placeholder="exampleEmail@gmail.com" />
    </div>
  </div>

  {/* Campo: Número */}
  <div className="form-group">
    <label className="form-label">Número</label>
    <div className="input-box">
      <img src="/src/assets/icons/call_end (1).png"/>
      <input type="tel" className="input-field" placeholder="322 562 3244" />
    </div>
  </div>

  {/* Campo: Contraseña */}
  <div className="form-group">
    <label className="form-label">Contraseña</label>
    <div className="input-box">
      <img src="/src/assets/icons/icons8-candado-24.png" alt="lock" className="field-icon" />
      <input type="text" className="input-field" placeholder="••••••••••••" />
    </div>
  </div>

  {/* Checkbox Términos */}
  <div className="terms-container">
    <label className="checkbox-label">
      <input type="checkbox" className="checkbox-input" />
      <span className="checkbox-text">Aceptar los términos y condiciones</span>
    </label>
  </div>

  {/* Botón de Enviar */}
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
            src="/src/assets/img/imagen_registro.png" 
            alt="Interior del Restaurante" 
          />
        </div>

      </div>
    </div>
  );
}

export default SingUp;