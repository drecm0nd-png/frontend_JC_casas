import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button.jsx";
import { useAuth } from "../../Hooks/UseAuth.js";

function Login() {
  const [name, setName] = useState("");
  const { isAuthenticated, login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const destination = location.state?.from?.pathname ?? "/dashboard";

  if (isAuthenticated) {
    return <Navigate to={destination} replace />;
  }

  function handleSubmit(event) {
    event.preventDefault();
    login({ name: name.trim() || "Usuario de demostración" });
    navigate(destination, { replace: true });
  }

  return (
    <section className="page-layout" aria-labelledby="login-title">
      <h1 id="login-title">Acceso de demostración</h1>
      <p className="page-lead">
        Este acceso solo guarda una sesión temporal en el navegador. No valida
        credenciales ni se conecta a un servidor.
      </p>
      <form className="demo-form" onSubmit={handleSubmit}>
        <label htmlFor="demo-name">Nombre para esta sesión (opcional)</label>
        <input
          id="demo-name"
          name="name"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <Button type="submit">Continuar en modo demostración</Button>
      </form>
    </section>
  );
}

export default Login;
