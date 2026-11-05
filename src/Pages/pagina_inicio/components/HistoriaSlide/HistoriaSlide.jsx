import { Award } from "lucide-react";
import { SLIDES } from "../../data/inicioData.js";
import "./HistoriaSlide.css";

const slide = SLIDES[1];

function HistoriaSlide({ onNavigate }) {
  return (
    <div className="historia-slide">
      <p className="inicio-step">
        <span className="inicio-step__number">{slide.step} / 05</span>
        <span className="inicio-step__sep" aria-hidden="true">
          •
        </span>
        <span>{slide.label}</span>
      </p>

      <p className="inicio-eyebrow">Tradición y calidad</p>

      <h2 id={slide.titleId} className="inicio-title historia-slide__title">
        Tenemos 20 Años De Experiencia
      </h2>

      <div className="inicio-card historia-slide__card">
        <p className="historia-slide__text">
          En JC Casas celebramos el sabor auténtico de la cocina casera,
          ofreciendo desayunos y almuerzos preparados con dedicación y los
          mejores ingredientes. Cada plato está pensado para acompañar tu día
          con energía y buen gusto, ya sea en un encuentro familiar, una pausa
          laboral o un momento especial.
        </p>
        <p className="historia-slide__text">
          Nos apasiona crear experiencias gastronómicas que combinan tradición y
          calidad, convirtiendo cada visita en una ocasión para disfrutar y
          compartir.
        </p>
      </div>

      <div className="historia-slide__actions">
        <button
          type="button"
          className="inicio-button inicio-button--ghost"
          onClick={() => onNavigate(2)}
        >
          Conocer nuestro proceso
        </button>

        <span className="historia-slide__badge">
          <Award aria-hidden="true" className="historia-slide__badge-icon" />
          Sabor 100% Auténtico
        </span>
      </div>
    </div>
  );
}

export default HistoriaSlide;
