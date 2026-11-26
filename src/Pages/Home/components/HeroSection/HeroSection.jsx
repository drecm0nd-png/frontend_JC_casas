import { Link } from "react-router-dom";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import "./HeroSection.css";

export default function HeroSection({ heroImage }) {
  return (
    <section id="inicio" className="lp-portada">
      <div className="lp-contenedor lp-portada__grid">
        <div>
          <p className="lp-etiqueta">
            <span className="lp-etiqueta__punto" aria-hidden="true" />
            Comida casera en Prado Vegas, Soacha
          </p>

          <h1 className="lp-portada__titulo">
            El almuerzo de casa, <em>hecho para ti.</em>
          </h1>

          <p className="lp-portada__descripcion">
            Disfruta desayunos y almuerzos preparados con dedicación. Conoce
            nuestras opciones y arma tu plato con el sabor de casa.
          </p>

          <div className="lp-portada__acciones">
            <Link to="/menu" className="lp-boton lp-boton--primario lp-boton--grande">
              Conoce el menú
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a href="#ubicacion" className="lp-boton lp-boton--secundario lp-boton--grande">
              Cómo llegar ↓
            </a>
          </div>

          <ul className="lp-portada__confianza">
            <li>
              <Clock size={16} aria-hidden="true" />
              Atención en horario del restaurante
            </li>
            <li>
              <MapPin size={16} aria-hidden="true" />
              Prado Vegas, Soacha
            </li>
          </ul>
        </div>

        <div className="lp-portada__visual">
          <img
            src={heroImage}
            alt="Almuerzo casero preparado en Jcasas Restaurante"
            className="lp-portada__imagen"
          />

          <div className="lp-flotante lp-flotante--estado">
            <div className="lp-estado">
              <span className="lp-estado__punto" aria-hidden="true" />
              <div>
                <strong>Menú casero</strong>
                <span>Preparado cada día</span>
              </div>
            </div>
          </div>

          <div className="lp-flotante lp-flotante--precio">
            <span>Desde</span>
            <strong>$12.000</strong>
          </div>
        </div>
      </div>
    </section>
  );
}