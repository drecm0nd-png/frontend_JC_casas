import Button from "../../Components/Button/Button.jsx";
import MealSections from "../../Components/MealSections/MealSections.jsx";
import Logo from "../../assets/img/logo.png";
import "./Home.css";

function Home() {
  function scrollToLunch() {
    const lunchSection = document.getElementById("menu");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    lunchSection?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  }

  return (
    <div className="home-page">
      <section className="home-hero" aria-labelledby="home-title">
        <p className="home-eyebrow">Restaurante</p>
        <h1 id="home-title">JC Casas</h1>
        <p className="home-hero-copy">
          Conoce la propuesta gastronómica de JC Casas.
        </p>
        <Button className="home-hero-button" onClick={scrollToLunch}>
          Ver el almuerzo
        </Button>
      </section>

      <section className="home-food-section" aria-label="Fotografía del restaurante">
        <div className="home-food-placeholder" role="img" aria-label="Fotografía de plato pendiente de un recurso aprobado">
          <span>Fotografía de plato pendiente de recurso aprobado</span>
        </div>
      </section>

      <section className="home-about" id="nosotros" aria-labelledby="home-about-title">
        <div className="home-about-copy">
          <p className="home-eyebrow">Restaurante JC Casas</p>
          <h2 id="home-about-title">Conoce nuestra propuesta</h2>
          <p>
            Este espacio está dedicado a presentar la historia y la propuesta
            del restaurante.
          </p>
        </div>
        <img className="home-about-logo" src={Logo} alt="Logo de JC Casas" />
      </section>

      <section className="home-lunch" id="menu" aria-labelledby="lunch-title">
        <div className="home-lunch-heading">
          <p className="home-eyebrow">Arma tu almuerzo</p>
          <h2 id="lunch-title">Partes del almuerzo</h2>
        </div>
        <MealSections />
      </section>
    </div>
  );
}

export default Home;
