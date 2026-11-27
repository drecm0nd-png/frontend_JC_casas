import { useState } from "react";
import { ChevronDown } from "lucide-react";
import "./FaqSection.css";

const PREGUNTAS = [
  {
    id: "faq-1",
    pregunta: "¿Cómo se arma el almuerzo del día?",
    respuesta:
      "Puedes elegir tu principio, proteína y acompañamiento del día, además de sumar adicionales opcionales según lo que prefieras.",
  },
  {
    id: "faq-2",
    pregunta: "¿Desde qué hora hay desayunos?",
    respuesta:
      "Preparamos desayunos caseros desde temprano en el horario de apertura del restaurante.",
  },
  {
    id: "faq-3",
    pregunta: "¿Dónde están ubicados exactamente?",
    respuesta:
      "Nos encontramos en Prado Vegas, Soacha. Puedes revisar el mapa y las indicaciones en la sección de horarios y ubicación.",
  },
  {
    id: "faq-4",
    pregunta: "¿Puedo ver o pedir el menú desde la plataforma?",
    respuesta:
      "Sí, desde la sección de Menú puedes explorar las opciones disponibles del día y gestionar tu pedido de forma rápida.",
  },
];

export default function FaqSection() {
  const [openId, setOpenId] = useState(PREGUNTAS[0]?.id ?? null);

  const toggleItem = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="preguntas" className="lp-seccion">
      <div className="lp-contenedor lp-preguntas">
        <div className="lp-seccion__cabecera lp-seccion__cabecera--izquierda lp-revelar">
          <p className="lp-seccion__antetitulo">Preguntas y contacto</p>
          <h2 className="lp-seccion__titulo">Resolvemos tus dudas rápidas</h2>
          <p className="lp-seccion__descripcion">
            Aquí tienes respuestas breves sobre cómo funciona nuestro menú y la
            atención en el restaurante.
          </p>
        </div>

        <div className="lp-acordeon lp-revelar">
          {PREGUNTAS.map(({ id, pregunta, respuesta }) => {
            const isOpen = openId === id;
            return (
              <div
                key={id}
                className={`lp-acordeon__item${isOpen ? " lp-acordeon__item--abierto" : ""}`}
              >
                <h3 className="lp-acordeon__encabezado">
                  <button
                    type="button"
                    className="lp-acordeon__pregunta"
                    aria-expanded={isOpen}
                    aria-controls={`panel-${id}`}
                    onClick={() => toggleItem(id)}
                  >
                    <span>{pregunta}</span>
                    <ChevronDown
                      size={20}
                      className="lp-acordeon__icono"
                      aria-hidden="true"
                    />
                  </button>
                </h3>

                <div id={`panel-${id}`} className="lp-acordeon__panel">
                  <div className="lp-acordeon__contenido">
                    <p>{respuesta}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}