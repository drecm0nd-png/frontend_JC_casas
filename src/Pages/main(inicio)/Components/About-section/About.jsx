import React from 'react';
import './about.css';

const About = () => {
  return (
<section className="about-section">
  {/* Imagen superior centrada */}
  <div className="about-image-container">
    <img
      src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
      alt="Platos de comida y copas de vino en restaurante"
      className="about-img"
    />
  </div>

  {/* Sección inferior con fondo claro, texto centrado a la izquierda y logo alineado a la derecha */}
  <div className="about-content-bottom">
    <div className="about-text-content">
      <h2>Tenemos 20 Años De Experiencia</h2>
      <p>
        En JC Casas celebramos el sabor auténtico de la cocina casera, ofreciendo desayunos y almuerzos preparados con dedicación y los mejores ingredientes. Cada plato está pensado para acompañar tu día con energía y buen gusto, ya sea en un encuentro familiar, una pausa laboral o un momento especial.
        Nos apasiona crear experiencias gastronómicas que combinan tradición y calidad, convirtiendo cada visita en una ocasión para disfrutar y compartir.
      </p>
    </div>

    <div className="about-logo-container">
      <img
        src="TU_RUTA_DEL_LOGO.png"
        alt="Restaurante Casas Logo"
        className="about-logo-img"
      />
    </div>
  </div>
</section>
  )
}

export default About