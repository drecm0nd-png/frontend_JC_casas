import "./HeroDishBanner.css";

export default function HeroDishBanner({ onOpenModal }) {
  return (
    <section className="hero-dish-card">
      <div className="hero-overlay">
        <div className="hero-info">
          <span className="hero-badge">Plato Principal</span>
          <h2>Almuerzo Corriente / Ejecutivo</h2>
          <p>Incluye: 1 Principio + 1 Proteína + Acompañamiento + Bebida</p>
          <span className="hero-price">22.500$</span>
        </div>
        <button
          type="button"
          className="btn-primary-action"
          onClick={() => onOpenModal({ nombre: "Almuerzo Corriente / Ejecutivo", precio: 22500 })}
        >
          Armar mi Almuerzo
        </button>
      </div>
    </section>
  );
}