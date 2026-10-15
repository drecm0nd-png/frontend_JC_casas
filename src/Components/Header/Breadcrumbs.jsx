// src/components/Header/Breadcrumbs.jsx
import { Link, useLocation } from "react-router-dom";

const NOMBRES = {
  nosotros: "Nosotros",
  menu: "Menú",
  contacto: "Contacto",
  login: "Iniciar sesión",
  registro: "Regístrate",
  perfil: "Perfil",
};

function Breadcrumbs() {
  const { pathname } = useLocation();
  const segmentos = pathname.split("/").filter(Boolean);

  // En la página de inicio no se muestran breadcrumbs
  if (segmentos.length === 0) return null;

  return (
    <nav aria-label="Ruta de navegación" className="breadcrumbs">
      <Link to="/">Inicio</Link>
      {segmentos.map((segmento, index) => {
        const ruta = "/" + segmentos.slice(0, index + 1).join("/");
        const esUltimo = index === segmentos.length - 1;
        const nombre = NOMBRES[segmento] ?? segmento;

        return (
          <span key={ruta} className="breadcrumb-item">
            <span className="breadcrumb-separator" aria-hidden="true">
              &gt;
            </span>
            {esUltimo ? (
              <span aria-current="page">{nombre}</span>
            ) : (
              <Link to={ruta}>{nombre}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export default Breadcrumbs;
