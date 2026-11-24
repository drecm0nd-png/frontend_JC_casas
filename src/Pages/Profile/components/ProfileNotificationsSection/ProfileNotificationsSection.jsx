import { ProfileRow, ProfileSectionHead, ProfileToggle } from "../ProfileIcons";
import "./ProfileNotificationsSection.css";

export default function ProfileNotificationsSection({ notifs, onToggleNotif }) {
  return (
    <div className="cfg-notifs-section">
      <ProfileSectionHead
        title="Notificaciones"
        desc="Elige qué avisos quieres recibir. Los cambios se guardan al instante."
      />
      <h3 className="cfg-subhead">Pedidos</h3>
      <ProfileRow title="Alertas de nuevos pedidos" desc="Aviso emergente cuando ingresa un pedido web.">
        <ProfileToggle
          checked={notifs.orderAlerts}
          onChange={() => onToggleNotif("orderAlerts")}
          label="Alertas de nuevos pedidos"
        />
      </ProfileRow>
      <ProfileRow title="Sonido de pedido nuevo" desc="Reproduce un sonido para no perder ningún pedido en cocina.">
        <ProfileToggle
          checked={notifs.orderSound}
          onChange={() => onToggleNotif("orderSound")}
          label="Sonido de pedido nuevo"
        />
      </ProfileRow>
      <ProfileRow title="Pedidos cancelados" desc="Te avisamos cuando un cliente cancela un pedido en curso.">
        <ProfileToggle
          checked={notifs.orderCancelled}
          onChange={() => onToggleNotif("orderCancelled")}
          label="Pedidos cancelados"
        />
      </ProfileRow>

      <h3 className="cfg-subhead">Operación</h3>
      <ProfileRow title="Reservas" desc="Recordatorios de reservas nuevas y próximas a llegar.">
        <ProfileToggle
          checked={notifs.reservations}
          onChange={() => onToggleNotif("reservations")}
          label="Reservas"
        />
      </ProfileRow>
      <ProfileRow title="Inventario bajo" desc="Aviso cuando un producto está por agotarse.">
        <ProfileToggle
          checked={notifs.lowStock}
          onChange={() => onToggleNotif("lowStock")}
          label="Inventario bajo"
        />
      </ProfileRow>

      <h3 className="cfg-subhead">Correo</h3>
      <ProfileRow title="Reporte semanal" desc="Resumen de ventas y pedidos, cada lunes en tu correo.">
        <ProfileToggle
          checked={notifs.emailWeekly}
          onChange={() => onToggleNotif("emailWeekly")}
          label="Reporte semanal"
        />
      </ProfileRow>
    </div>
  );
}