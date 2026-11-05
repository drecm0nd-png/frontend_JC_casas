import { Carrot, Clock, Flame, Heart } from "lucide-react";
import { PROCESO_PASOS, SLIDES } from "../../data/inicioData.js";
import "./ProcesoSlide.css";

const slide = SLIDES[2];

const ICONS = {
  carrot: Carrot,
  flame: Flame,
  clock: Clock,
  heart: Heart,
};

function ProcesoSlide() {
  return (
    <div className="proceso-slide">
      <p className="inicio-step">
        <span className="inicio-step__number">{slide.step} / 05</span>
        <span className="inicio-step__sep" aria-hidden="true">
          •
        </span>
        <span>{slide.label}</span>
      </p>

      <p className="inicio-eyebrow">Metodología culinaria</p>

      <h2 id={slide.titleId} className="inicio-title proceso-slide__title">
        El Proceso del Buen Sabor
      </h2>

      <p className="inicio-copy proceso-slide__intro">
        Cuatro pasos fundamentales con los que aseguramos la máxima calidad en
        cada plato.
      </p>

      <ul className="proceso-slide__grid">
        {PROCESO_PASOS.map((paso) => {
          const StepIcon = ICONS[paso.icon] ?? Carrot;

          return (
            <li key={paso.id} className="proceso-slide__card">
              <div className="proceso-slide__card-head">
                <span className="proceso-slide__icon" aria-hidden="true">
                  <StepIcon />
                </span>
                <span className="proceso-slide__step">{paso.step}</span>
              </div>
              <h3 className="proceso-slide__card-title">{paso.title}</h3>
              <p className="proceso-slide__card-text">{paso.description}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ProcesoSlide;
