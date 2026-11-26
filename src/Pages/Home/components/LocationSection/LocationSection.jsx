import { Clock, MapPin, Phone } from "lucide-react";
import "./LocationSection.css";

export default function LocationSection({ mapImage, mapsUrl }) {
  return (
    <section id="ubicacion" className="lp-seccion lp-seccion--superficie">
      <div className="lp-contenedor">
        <div className="lp-seccion__cabecera lp-revelar">
          <p className="lp-seccion__antetitulo">Horarios y ubicación</p>
          <h2 className="lp-seccion__titulo">Visítanos o consúltanos</h2>
          <p className="lp-seccion__descripcion">
            Estamos en Prado Vegas, Soacha, listos para recibirte en nuestro
            horario habitual.
          </p>
        </div>

        <div className="lp-cobertura">
          <div className="lp-cobertura__tarjetas lp-revelar">
            <div className="lp-info">
              <div className="lp-info__icono" aria-hidden="true">
                <Clock size={22} />
              </div>
              <h3 className="lp-info__titulo">Horario de atención</h3>
              <p>Lunes a sábado desde temprano para desayunos y almuerzos.</p>
            </div>

            <div className="lp-info">
              <div className="lp-info__icono" aria-hidden="true">
                <MapPin size={22} />
              </div>
              <h3 className="lp-info__titulo">Dirección</h3>
              <p>Prado Vegas, Soacha, Cundinamarca.</p>
            </div>

            <div className="lp-info">
              <div className="lp-info__icono" aria-hidden="true">
                <Phone size={22} />
              </div>
              <h3 className="lp-info__titulo">Contacto</h3>
              <p>
                <a href="tel:+573000000000">Llámanos para consultar el menú del día</a>
              </p>
            </div>
          </div>

          {mapImage && (
            <div className="lp-mapa lp-revelar">
              <img
                src={mapImage}
                alt="Mapa de ubicación de Jcasas Restaurante en Prado Vegas, Soacha"
                className="lp-mapa__imagen"
              />
              <div className="lp-mapa__pie">
                <div>
                  <strong>Jcasas Restaurante</strong>
                  <span>Prado Vegas, Soacha</span>
                </div>
                {mapsUrl && (
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lp-boton lp-boton--primario lp-boton--compacto"
                  >
                    Abrir en Maps
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}