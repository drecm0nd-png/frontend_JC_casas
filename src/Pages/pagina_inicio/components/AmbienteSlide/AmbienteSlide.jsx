import { SLIDES } from "../../data/inicioData.js";
import "./AmbienteSlide.css";

const slide = SLIDES[4];

function AmbienteSlide() {
  return (
    <div className="ambiente-slide">
      <p className="inicio-step">
        <span className="inicio-step__number">{slide.step} / 05</span>
        <span className="inicio-step__sep" aria-hidden="true">
          •
        </span>
        <span>{slide.label}</span>
      </p>

      <p className="inicio-eyebrow">Un espacio único</p>

      <h2 id={slide.titleId} className="inicio-title ambiente-slide__title">
        Un Ambiente Cálido Te Espera
      </h2>

      <p className="inicio-copy ambiente-slide__copy">
        Diseñado para brindar comodidad y tranquilidad en pleno corazón de Prado
        Vegas. Ven a disfrutar de un espacio acogedor con atención personal.
      </p>
    </div>
  );
}

export default AmbienteSlide;
