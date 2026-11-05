import { HERO_TAGS, SLIDES } from "../../data/inicioData.js";
import "./HeroSlide.css";

const slide = SLIDES[0];

function HeroSlide({ onOrder, onNavigate }) {
  return (
    <div className="hero-slide">
      <p className="inicio-step">
        <span className="inicio-step__number">{slide.step} / 05</span>
        <span className="inicio-step__sep" aria-hidden="true">
          •
        </span>
        <span>{slide.label}</span>
      </p>

      <p className="inicio-eyebrow">Restaurante JC Casas</p>

      <h1 id={slide.titleId} className="hero-slide__title">
        Restaurante
        <span className="hero-slide__title-accent">JC Casas</span>
      </h1>

      <p className="inicio-copy hero-slide__copy">
        Prepárate para probar nuestros ricos e increíbles desayunos y almuerzos,
        deléitate y satisface tu apetito.
      </p>

      <div className="hero-slide__actions">
        <button
          type="button"
          className="inicio-button inicio-button--primary"
          onClick={onOrder}
        >
          Pedir ¡YA!
        </button>
        <button
          type="button"
          className="inicio-button inicio-button--ghost"
          onClick={() => onNavigate(3)}
        >
          Ver Menú
        </button>
      </div>

      <ul className="hero-slide__tags" aria-label="Especialidades">
        {HERO_TAGS.map((tag) => (
          <li key={tag} className="hero-slide__tag">
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HeroSlide;
