import { SLIDES } from "../../data/inicioData.js";
import "./StepNav.css";

function StepNav({ activeIndex, onNavigate }) {
  return (
    <nav className="step-nav" aria-label="Progreso de la página">
      {SLIDES.map((slide, index) => {
        const isActive = index === activeIndex;

        return (
          <button
            key={slide.index}
            type="button"
            className={`step-nav__item ${isActive ? "is-active" : ""}`}
            onClick={() => onNavigate(index)}
            aria-label={`Ir a la sección ${slide.shortLabel}`}
            aria-current={isActive ? "step" : undefined}
          >
            <span className="step-nav__label">
              {slide.step} {slide.shortLabel}
            </span>
            <span className="step-nav__dot" aria-hidden="true" />
          </button>
        );
      })}
    </nav>
  );
}

export default StepNav;
