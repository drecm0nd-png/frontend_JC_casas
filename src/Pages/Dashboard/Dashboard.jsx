import Button from "../../Components/Button/Button.jsx";
import { useAuth } from "../../Hooks/UseAuth.js";

function Dashboard() {
  const { user } = useAuth();

  return (
    <section className="page-layout" aria-labelledby="dashboard-title">
      <p className="page-eyebrow">Área protegida de demostración</p>
      <h1 id="dashboard-title">Panel</h1>
      <p>Sesión local activa{user?.name ? ` para ${user.name}` : ""}.</p>
      <p>Este panel es una estructura inicial; todavía no contiene funciones de negocio.</p>
      <LogoutButton />
    </section>
  );
}

function LogoutButton() {
  const { logout } = useAuth();
  return <Button onClick={logout}>Cerrar sesión de demostración</Button>;
}

export default Dashboard;
