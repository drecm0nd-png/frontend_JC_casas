import { ProfileIcon, ProfileRow, ProfileSectionHead, ProfileToggle } from "../ProfileIcons";
import "./ProfileSecuritySection.css";

export default function ProfileSecuritySection({
  twoFactor,
  onToggleTwoFactor,
  sessions,
  onOpenPassword,
  onCloseSession
}) {
  return (
    <>
      <ProfileSectionHead
        title="Seguridad"
        desc="Protege tu acceso al panel y revisa dónde has iniciado sesión."
      />
      <ProfileRow title="Contraseña" desc="Última actualización hace 3 meses. Cámbiala con frecuencia.">
        <button type="button" className="cfg-btn cfg-btn-soft" onClick={onOpenPassword}>
          <ProfileIcon name="key" size={16} /> Cambiar contraseña
        </button>
      </ProfileRow>
      <ProfileRow
        title="Verificación en dos pasos"
        desc="Pide un código adicional al iniciar sesión desde un dispositivo nuevo."
      >
        <ProfileToggle
          checked={twoFactor}
          label="Verificación en dos pasos"
          onChange={onToggleTwoFactor}
        />
      </ProfileRow>

      <h3 className="cfg-subhead">Sesiones activas</h3>
      <ul className="cfg-sessions">
        {sessions.map((s) => (
          <li key={s.id}>
            <span className="cfg-session-icon">
              <ProfileIcon name={s.icon} />
            </span>
            <div className="cfg-session-text">
              <strong>{s.device}</strong>
              <span>
                {s.place} · {s.when}
              </span>
            </div>
            {s.current ? (
              <span className="cfg-chip cfg-chip-ok">Este dispositivo</span>
            ) : (
              <button
                type="button"
                className="cfg-btn cfg-btn-link"
                onClick={() => onCloseSession(s.id)}
              >
                Cerrar sesión
              </button>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}