import { Link, useLocation } from "react-router-dom";

const PAGE_NAMES = {
  login: "Acceso de demostración",
  dashboard: "Panel",
};

function Breadcrumbs() {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  return (
    <nav aria-label="Ruta de navegación" className="breadcrumbs">
      <Link to="/">Inicio</Link>
      {segments.map((segment, index) => {
        const path = `/${segments.slice(0, index + 1).join("/")}`;
        const isCurrent = index === segments.length - 1;
        const name = PAGE_NAMES[segment] ?? segment;

        return (
          <span key={path} className="breadcrumb-item">
            <span className="breadcrumb-separator" aria-hidden="true">&gt;</span>
            {isCurrent ? (
              <span aria-current="page">{name}</span>
            ) : (
              <Link to={path}>{name}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export default Breadcrumbs;
