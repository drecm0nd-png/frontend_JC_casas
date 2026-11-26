import { Heart, Sparkles, Users } from "lucide-react";
import "./AboutSection.css";

const VALORES = [
  {
    titulo: "Sazón de hogar",
    descripcion: "Recetas pensadas para sentirse como en casa cada día.",
    Icon: Heart,
  },
  {
    titulo: "Ingredientes del día",
    descripcion: "Preparaciones frescas con buen ritmo y atención cercana.",
    Icon: Sparkles,
  },
  {
    titulo: "Trato cercano",
    descripcion: "Un espacio familiar en el corazón de Prado Vegas.",
    Icon: Users,
  },
];

export default function AboutSection({ aboutImage, children }) {
  return (
    <section id="nosotros" className="lp-seccion">
      <div className="lp-contenedor lp-nosotros">
        <div className="lp-nosotros__visual lp-revelar">
          {aboutImage && (
            <img
              src={aboutImage}
              alt="Ambiente y cocina de Jcasas Restaurante"
              className="lp-nosotros__imagen"
            />
          )}
          <div className="lp-nosotros__sello">
            <strong>20+</strong>
            <span>años sirviendo con cariño</span>
          </div>
          {children}
        </div>

        <div className="lp-nosotros__texto lp-revelar">
          <div className="lp-seccion__cabecera lp-seccion__cabecera--izquierda">
            <p className="lp-seccion__antetitulo">Nosotros</p>
            <h2 className="lp-seccion__titulo">
              Cocina familiar que acompaña tu rutina
            </h2>
          </div>

          <p>
            En Jcasas Restaurante creemos que una buena comida diaria marca la
            diferencia. Cuidamos cada detalle para ofrecer platos abundantes,
            honestos y con sabor casero.
          </p>

          <ul className="lp-valores">
            {VALORES.map(({ titulo, descripcion, Icon }) => (
              <li key={titulo} className="lp-valor">
                <span className="lp-valor__icono" aria-hidden="true">
                  <Icon size={18} />
                </span>
                <div>
                  <h3 className="lp-valor__titulo">{titulo}</h3>
                  <p>{descripcion}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}