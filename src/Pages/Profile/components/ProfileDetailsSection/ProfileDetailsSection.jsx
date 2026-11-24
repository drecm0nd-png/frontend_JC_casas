import { ProfileIcon, ProfileSectionHead } from "../ProfileIcons";
import "./ProfileDetailsSection.css";

export default function ProfileDetailsSection({ userData, onEdit, onAvatar }) {
  return (
    <>
      <ProfileSectionHead
        title="Información personal"
        desc="Estos datos aparecen en reportes, pedidos y comunicaciones del restaurante."
      />
      <dl className="cfg-data">
        <div>
          <dt>Nombre</dt>
          <dd>{userData.nombre}</dd>
        </div>
        <div>
          <dt>Correo</dt>
          <dd>{userData.correo}</dd>
        </div>
        <div>
          <dt>Teléfono</dt>
          <dd>{userData.telefono}</dd>
        </div>
        <div>
          <dt>Rol</dt>
          <dd>
            <span className="cfg-chip">{userData.rol}</span>
          </dd>
        </div>
        <div>
          <dt>Restaurante</dt>
          <dd>{userData.restaurante}</dd>
        </div>
        <div>
          <dt>Sucursal</dt>
          <dd>{userData.sucursal || "—"}</dd>
        </div>
        <div>
          <dt>Miembro desde</dt>
          <dd>{userData.miembroDesde}</dd>
        </div>
      </dl>
      <div className="cfg-actions">
        <button type="button" className="cfg-btn cfg-btn-dark" onClick={onEdit}>
          <ProfileIcon name="edit" size={16} /> Editar datos
        </button>
        <button type="button" className="cfg-btn cfg-btn-soft" onClick={onAvatar}>
          <ProfileIcon name="camera" size={16} /> Cambiar foto
        </button>
      </div>
    </>
  );
}