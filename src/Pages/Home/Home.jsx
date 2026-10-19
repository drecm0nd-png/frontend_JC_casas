import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="page-layout" aria-labelledby="home-title">
      <p className="page-eyebrow">Restaurante JC Casas</p>
      <h1 id="home-title">Bienvenido a JC Casas</h1>
      <p className="page-lead">
        Estamos preparando nuestro espacio digital para compartir contigo.
      </p>
      <p>Esta es la página de inicio de la primera etapa del proyecto.</p>
      <Link className="button button--primary page-action" to="/login">
        Acceso de demostración
      </Link>
    </section>
  );
}

export default Home;
