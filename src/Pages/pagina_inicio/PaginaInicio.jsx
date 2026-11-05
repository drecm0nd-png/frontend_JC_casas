import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AmbienteSlide from "./components/AmbienteSlide/AmbienteSlide.jsx";
import HeroSlide from "./components/HeroSlide/HeroSlide.jsx";
import HistoriaSlide from "./components/HistoriaSlide/HistoriaSlide.jsx";
import FooterInicio from "./components/FooterInicio/FooterInicio.jsx";
import HeaderInicio from "./components/HeaderInicio/HeaderInicio.jsx";
import MenuSlide from "./components/MenuSlide/MenuSlide.jsx";
import ProcesoSlide from "./components/ProcesoSlide/ProcesoSlide.jsx";
import SlideBackground from "./components/SlideBackground/SlideBackground.jsx";
import StepNav from "./components/StepNav/StepNav.jsx";
import { SLIDES } from "./data/inicioData.js";
import "./PaginaInicio.css";

const SLIDE_COMPONENTS = [
  HeroSlide,
  HistoriaSlide,
  ProcesoSlide,
  MenuSlide,
  AmbienteSlide,
];

function PaginaInicio() {
  const [activeIndex, setActiveIndex] = useState(0);
  const slidesRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const container = slidesRef.current;
    if (!container) return undefined;

    const sections = Array.from(container.querySelectorAll(".inicio-slide"));
    if (sections.length === 0) return undefined;

    let frame = 0;

    function updateActiveSection() {
      frame = 0;
      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight * 0.5;
      let nextIndex = null;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const content = section.firstElementChild;
        const contentTop = content
          ? content.getBoundingClientRect().top
          : rect.top;

        if (contentTop < viewportHeight * 0.9) {
          section.classList.add("is-visible");
        }

        if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
          nextIndex = index;
        }
      });

      if (nextIndex !== null) {
        setActiveIndex(nextIndex);
      }
    }

    function handleScroll() {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActiveSection);
    }

    updateActiveSection();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const scrollToSlide = useCallback((index) => {
    const target = slidesRef.current?.children[index];
    if (!target) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    target.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  }, []);

  const goToLogin = useCallback(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    navigate("/login");
  }, [navigate]);

  return (
    <div className="pagina-inicio">
      <SlideBackground activeIndex={activeIndex} />
      <HeaderInicio onNavigate={scrollToSlide} onOrder={goToLogin} />
      <StepNav activeIndex={activeIndex} onNavigate={scrollToSlide} />

      <div className="inicio-slides" ref={slidesRef}>
        {SLIDES.map((slide, index) => {
          const SlideContent = SLIDE_COMPONENTS[index];

          return (
            <section
              key={slide.index}
              id={`slide-${index}`}
              className="inicio-slide"
              aria-labelledby={slide.titleId}
            >
              <SlideContent onNavigate={scrollToSlide} onOrder={goToLogin} />
            </section>
          );
        })}
      </div>

      <FooterInicio onNavigate={scrollToSlide} />
    </div>
  );
}

export default PaginaInicio;
