import { SLIDES } from "../../data/inicioData.js";
import "./SlideBackground.css";

function SlideBackground({ activeIndex }) {
  return (
    <div className="slide-background" aria-hidden="true">
      {SLIDES.map((slide, index) => (
        <div
          key={slide.index}
          className={`slide-background__image ${
            index === activeIndex ? "is-active" : ""
          }`}
          style={{ backgroundImage: `url("${slide.background}")` }}
        />
      ))}
      <div className="slide-background__overlay" />
    </div>
  );
}

export default SlideBackground;
