import { getInitials } from "../../../../Hooks/useProfileState";
import { ProfileIcon } from "../ProfileIcons";
import "./ProfileHero.css";

export default function ProfileHero({ userData, percent, nextStep, onOpenAvatar }) {
  return (
    <section className="cfg-hero">
      <div className="cfg-banner">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
          alt=""
        />
      </div>
      <div className="cfg-hero-body">
        <button
          type="button"
          className="cfg-avatar cfg-avatar-hero"
          onClick={onOpenAvatar}
          aria-label="Cambiar foto de perfil"
        >
          {userData.avatar ? <img src={userData.avatar} alt="" /> : <span>{getInitials(userData.nombre)}</span>}
          <span className="cfg-avatar-badge">
            <ProfileIcon name="camera" size={14} />
          </span>
        </button>

        <div className="cfg-id">
          <h1>{userData.nombre}</h1>
          <p>
            {userData.rol} · {userData.restaurante}
          </p>
        </div>

        <div className="cfg-progress">
          <div className="cfg-progress-top">
            <span>Perfil completo</span>
            <strong>{percent}%</strong>
          </div>
          <div className="cfg-progress-bar" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
            <span style={{ width: `${percent}%` }} />
          </div>
          {nextStep ? (
            <button type="button" className="cfg-progress-hint" onClick={nextStep.action}>
              {nextStep.hint}
            </button>
          ) : (
            <span className="cfg-progress-done">
              <ProfileIcon name="check" size={14} /> Todo listo
            </span>
          )}
        </div>
      </div>
    </section>
  );
}