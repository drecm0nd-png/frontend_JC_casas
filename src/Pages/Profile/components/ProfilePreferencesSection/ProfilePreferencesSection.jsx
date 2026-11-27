import { ProfileRow, ProfileSectionHead } from "../ProfileIcons";
import "./ProfilePreferencesSection.css";

export default function ProfilePreferencesSection({ prefs, onSetPref }) {
  return (
    <div className="cfg-prefs-section">
      <ProfileSectionHead
        title="Preferencias del sistema"
        desc="Ajusta cómo se muestra la información en el panel."
      />
      <ProfileRow title="Idioma" desc="Idioma de menús y mensajes.">
        <select className="cfg-select" value={prefs.idioma} onChange={onSetPref("idioma")}>
          <option value="es">Español</option>
          <option value="en">English</option>
        </select>
      </ProfileRow>
      <ProfileRow title="Moneda" desc="Se usa en precios, ventas y reportes.">
        <select className="cfg-select" value={prefs.moneda} onChange={onSetPref("moneda")}>
          <option value="COP">Peso colombiano (COP)</option>
          <option value="USD">Dólar (USD)</option>
        </select>
      </ProfileRow>
      <ProfileRow title="Formato de hora" desc="Cómo se muestran las horas de pedidos y reservas.">
        <select className="cfg-select" value={prefs.hora} onChange={onSetPref("hora")}>
          <option value="12">12 horas (3:30 p. m.)</option>
          <option value="24">24 horas (15:30)</option>
        </select>
      </ProfileRow>
      <ProfileRow title="Pantalla de inicio" desc="Lo primero que ves al entrar al panel.">
        <select className="cfg-select" value={prefs.inicio} onChange={onSetPref("inicio")}>
          <option value="dashboard">Resumen</option>
          <option value="pedidos">Pedidos</option>
          <option value="cocina">Cocina</option>
        </select>
      </ProfileRow>
    </div>
  );
}