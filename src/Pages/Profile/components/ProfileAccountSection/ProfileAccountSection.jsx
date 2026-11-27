import { ProfileIcon, ProfileRow, ProfileSectionHead } from "../ProfileIcons";
import "./ProfileAccountSection.css";

export default function ProfileAccountSection({
  onLogout,
  onCloseOtherSessions,
  onOpenDelete
}) {
  return (
    <>
      <ProfileSectionHead title="Cuenta" desc="Acciones sobre tu sesión y tu cuenta." />
      <ProfileRow title="Cerrar sesión" desc="Sales de este dispositivo. Tendrás que iniciar sesión de nuevo.">
        <button type="button" className="cfg-btn cfg-btn-soft" onClick={onLogout}>
          <ProfileIcon name="logout" size={16} /> Cerrar sesión
        </button>
      </ProfileRow>
      <ProfileRow title="Cerrar las demás sesiones" desc="Sales de todos los dispositivos menos de este.">
        <button type="button" className="cfg-btn cfg-btn-soft" onClick={onCloseOtherSessions}>
          Cerrar las demás
        </button>
      </ProfileRow>
      <div className="cfg-danger">
        <div>
          <strong>Eliminar cuenta</strong>
          <p>Borra de forma permanente tu acceso, permisos y registros. No se puede deshacer.</p>
        </div>
        <button type="button" className="cfg-btn cfg-btn-danger-outline" onClick={onOpenDelete}>
          <ProfileIcon name="trash" size={16} /> Eliminar cuenta
        </button>
      </div>
    </>
  );
}