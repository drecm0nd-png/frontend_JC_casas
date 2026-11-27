import TarjetasMenu from "../../../../Components/Tarjetas/TarjetasMenu";
import "./LunchComponentsGroup.css";

export default function LunchComponentsGroup({
  datosPrincipio,
  datosProteina,
  datosAcompanamiento,
  openPrincipio,
  setOpenPrincipio,
  openProteina,
  setOpenProteina,
  openAcompanamiento,
  setOpenAcompanamiento
}) {
  return (
    <section className="horizontal-section-group-3">
      <div className="lunch-section-title-wrapper">
        <h3>Componentes de tu almuerzo</h3>
      </div>

      <div className="third-column">
        <div className="category-header">
          <span className="step-number">1</span>
          <h3>Opciones de Principio</h3>
        </div>
        <button
          type="button"
          className={`category-toggle-btn ${openPrincipio ? "is-open" : ""}`}
          onClick={() => setOpenPrincipio(!openPrincipio)}
        >
          <span>Opciones de Principio</span>
          <span className="toggle-arrow">▼</span>
        </button>
        <div className={`cards-grid-vertical ${openPrincipio ? "is-expanded" : ""}`}>
          {datosPrincipio.map((item) => (
            <TarjetasMenu
              key={item.id}
              imagen={item.imagen}
              titulo={item.titulo}
              descripcion={item.descripcion}
            />
          ))}
        </div>
      </div>

      <div className="third-column">
        <div className="category-header">
          <span className="step-number">2</span>
          <h3>Opciones de Proteína</h3>
        </div>
        <button
          type="button"
          className={`category-toggle-btn ${openProteina ? "is-open" : ""}`}
          onClick={() => setOpenProteina(!openProteina)}
        >
          <span>Opciones de Proteína</span>
          <span className="toggle-arrow">▼</span>
        </button>
        <div className={`cards-grid-vertical ${openProteina ? "is-expanded" : ""}`}>
          {datosProteina.map((item) => (
            <TarjetasMenu
              key={item.id}
              imagen={item.imagen}
              titulo={item.titulo}
              descripcion={item.descripcion}
            />
          ))}
        </div>
      </div>

      <div className="third-column">
        <div className="category-header">
          <span className="step-number">3</span>
          <h3>Acompañamientos</h3>
        </div>
        <button
          type="button"
          className={`category-toggle-btn ${openAcompanamiento ? "is-open" : ""}`}
          onClick={() => setOpenAcompanamiento(!openAcompanamiento)}
        >
          <span>Acompañamientos</span>
          <span className="toggle-arrow">▼</span>
        </button>
        <div className={`cards-grid-vertical ${openAcompanamiento ? "is-expanded" : ""}`}>
          {datosAcompanamiento.map((item) => (
            <TarjetasMenu
              key={item.id}
              imagen={item.imagen}
              titulo={item.titulo}
              descripcion={item.descripcion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}