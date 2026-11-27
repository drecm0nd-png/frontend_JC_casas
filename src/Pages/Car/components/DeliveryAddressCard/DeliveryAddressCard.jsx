import { FaLocationDot, FaPen, FaNoteSticky, FaMapLocationDot } from "react-icons/fa6";
import SectionCard from "../../../../Components/SectionCard/SectionCard";
import mapImg from "../../../../assets/img/map.avif";
import "./DeliveryAddressCard.css";

export default function DeliveryAddressCard({
  direccion,
  lugarBarrio,
  editandoDireccion,
  setEditandoDireccion,
  partesDireccion,
  setPartesDireccion,
  notaDomiciliario,
  setNotaDomiciliario,
  onGuardarDireccion,
  onAbrirGoogleMaps
}) {
  return (
    <SectionCard className="address-card">
      <div>
        <div className="car-address-header">
          <div className="car-address-title-group">
            <div className="car-address-icon">
              <FaLocationDot size={18} />
            </div>
            <div>
              <h3>Dirección de Entrega</h3>
              <small>Soacha, Cundinamarca</small>
            </div>
          </div>

          {!editandoDireccion && (
            <button
              type="button"
              onClick={() => setEditandoDireccion(true)}
              className="btn-open-address-form"
            >
              <FaPen size={11} /> Modificar
            </button>
          )}
        </div>

        <div className="car-address-preview-wrapper">
          <div
            className="car-map-preview-box"
            style={{ "--map-img": `url(${mapImg})` }}
            onClick={onAbrirGoogleMaps}
            title="Haz clic para abrir la dirección en Google Maps"
          >
            <FaMapLocationDot size={26} />
            <span>Ver en Google Maps (Soacha)</span>
          </div>

          <div className="car-current-address-badge">
            <small>SOACHA, CUNDINAMARCA</small>
            <p>{direccion}</p>
            {lugarBarrio && <p className="car-address-place-sub">{lugarBarrio}</p>}
          </div>
        </div>

        {editandoDireccion && (
          <form onSubmit={onGuardarDireccion} className="car-address-form">
            <div className="car-form-group">
              <label>Tipo de Vía:</label>
              <select
                value={partesDireccion.via}
                onChange={(e) => setPartesDireccion({ ...partesDireccion, via: e.target.value })}
                required
              >
                <option value="">Seleccionar vía...</option>
                <option value="Calle">Calle</option>
                <option value="Carrera">Carrera</option>
                <option value="Diagonal">Diagonal</option>
                <option value="Transversal">Transversal</option>
                <option value="Avenida">Avenida</option>
              </select>
            </div>

            <div className="car-form-group">
              <label>Nomenclatura (Ej: 30 Sur # 12-45):</label>
              <input
                type="text"
                placeholder="Ej: 30 Sur # 12-45"
                value={partesDireccion.numero}
                onChange={(e) => setPartesDireccion({ ...partesDireccion, numero: e.target.value })}
                required
              />
            </div>

            <div className="car-form-group">
              <label>Barrio, lugar (opcional):</label>
              <input
                type="text"
                placeholder="Ej: Soacha, Prado Vegas"
                value={partesDireccion.lugar}
                onChange={(e) => setPartesDireccion({ ...partesDireccion, lugar: e.target.value })}
              />
            </div>

            <div className="car-form-buttons">
              <button type="submit" className="btn-save-address">Guardar</button>
              <button
                type="button"
                onClick={() => setEditandoDireccion(false)}
                className="btn-cancel-address"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="car-delivery-note-box-bottom">
        <label><FaNoteSticky size={12} /> Instrucciones para el domiciliario:</label>
        <textarea
          rows="2"
          placeholder="Ej: Dejar en portería, timbre dañado..."
          value={notaDomiciliario}
          onChange={(e) => setNotaDomiciliario(e.target.value)}
        />
      </div>
    </SectionCard>
  );
}