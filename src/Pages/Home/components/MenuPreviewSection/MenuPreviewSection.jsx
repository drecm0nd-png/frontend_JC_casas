import { Link } from "react-router-dom";
import { Soup, UtensilsCrossed, Salad, PlusCircle, Phone } from "lucide-react";
import "./MenuPreviewSection.css";

const CATEGORIAS = [
  {
    numero: "01",
    titulo: "Principio",
    descripcion: "La base del corrientazo, preparada desde temprano.",
    opcional: false,
    Icon: Soup,
    ejemplos: ["Frijoles", "Lentejas", "Garbanzos", "Arveja"],
  },
  {
    numero: "02",
    titulo: "Proteína",
    descripcion: "Opciones del día preparadas con sazón casera.",
    opcional: false,
    Icon: UtensilsCrossed,
    ejemplos: ["Pollo", "Carne", "Cerdo", "Pescado"],
  },
  {
    numero: "03",
    titulo: "Acompañamiento",
    descripcion: "Lo que completa el plato y lo hace sentir como en casa.",
    opcional: false,
    Icon: Salad,
    ejemplos: ["Arroz", "Maduro", "Papa", "Ensalada"],
  },
  {
    numero: "04",
    titulo: "Adicionales",
    descripcion: "Dale un extra a tu almuerzo.",
    opcional: true,
    Icon: PlusCircle,
    ejemplos: ["Huevo", "Porción extra", "Aguacate"],
  },
];

export default function MenuPreviewSection({ breakfastImage }) {
  return (
    <section id="menu" className="lp-seccion lp-seccion--superficie">
      <div className="lp-contenedor">
        <div className="lp-seccion__cabecera lp-revelar">
          <p className="lp-seccion__antetitulo">Nuestro menú</p>
          <h2 className="lp-seccion__titulo">Arma tu almuerzo a tu gusto</h2>
          <p className="lp-seccion__descripcion">
            Cada día preparamos opciones frescas para que combines tu plato sin
            complicaciones.
          </p>
        </div>

        <ul className="lp-categorias">
          {CATEGORIAS.map(({ numero, titulo, descripcion, opcional, Icon, ejemplos }) => (
            <li key={numero} className="lp-categoria lp-revelar">
              <div className="lp-categoria__cabecera">
                <span className="lp-categoria__icono" aria-hidden="true">
                  <Icon size={20} />
                </span>
                <span className="lp-categoria__numero">{numero}</span>
              </div>

              <h3 className="lp-categoria__titulo">
                {titulo}
                {opcional && <span className="lp-chip-opcional">Opcional</span>}
              </h3>

              <p className="lp-categoria__descripcion">{descripcion}</p>

              <ul className="lp-categoria__ejemplos">
                {ejemplos.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="lp-desayunos lp-revelar">
          {breakfastImage && (
            <img
              src={breakfastImage}
              alt="Desayunos caseros en Jcasas Restaurante"
              className="lp-desayunos__imagen"
            />
          )}

          <div className="lp-desayunos__texto">
            <p className="lp-seccion__antetitulo">También tenemos</p>
            <h3 className="lp-desayunos__titulo">Desayunos para empezar el día</h3>
            <p>
              Pregunta por las opciones disponibles y disfruta un desayuno
              preparado con sazón casera.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              <a href="#ubicacion" className="lp-boton lp-boton--secundario">
                <Phone size={17} aria-hidden="true" />
                Consultar por teléfono
              </a>
              <Link to="/menu" className="lp-boton lp-boton--primario">
                Ver menú completo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}