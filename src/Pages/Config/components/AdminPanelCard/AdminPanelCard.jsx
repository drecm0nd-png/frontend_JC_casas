import { FaLock, FaUserShield } from "react-icons/fa6";
import SectionCard from "../../../../Components/SectionCard/SectionCard";
import "./AdminPanelCard.css";

export default function AdminPanelCard({
  adminModeUnlocked,
  setAdminModeUnlocked,
  screenSaverMode,
  setScreenSaverMode,
  sleepTimeout,
  setSleepTimeout,
  autoBackup,
  setAutoBackup,
  maintenanceMode,
  onToggleMaintenance,
  autoPrintTickets,
  setAutoPrintTickets,
  auditLogLevel,
  setAuditLogLevel,
  onSave
}) {
  return (
    <SectionCard
      title="Panel de Administrador"
      className="admin-card"
      action={<FaUserShield color="#7c3aed" size={20} />}
    >
      <div className="master-admin-switch">
        <div className="config-option-info">
          <span className="config-option-title">Desbloquear Funciones de Admin</span>
          <span className="config-option-desc">Requiere clave o credenciales gerenciales.</span>
        </div>
        <label className="custom-switch admin-switch">
          <input
            type="checkbox"
            checked={adminModeUnlocked}
            onChange={() => setAdminModeUnlocked(!adminModeUnlocked)}
          />
          <span className="custom-slider"></span>
        </label>
      </div>

      <div className={`config-dev-wrapper ${adminModeUnlocked ? "unlocked" : "locked"}`}>
        <div className={`config-lock-overlay ${adminModeUnlocked ? "is-dismissed" : ""}`}>
          <div className="config-lock-icon-wrap">
            <FaLock size={26} />
          </div>
          <span>
            Área restringida. Activa el interruptor superior para ver información del sistema y controles de gerencia.
          </span>
        </div>

        <div className="config-options-list admin-options">
          <div className="config-option-row">
            <div className="config-option-info">
              <span className="config-option-title">
                Modo Mantenimiento {maintenanceMode ? "(Activo)" : "(Inactivo)"}
              </span>
              <span className="config-option-desc">
                {maintenanceMode
                  ? "El sistema está en mantenimiento. Haz clic para desactivar."
                  : "Pausa temporalmente nuevos pedidos en caja."}
              </span>
            </div>
            <label className="custom-switch admin-switch">
              <input
                type="checkbox"
                checked={maintenanceMode}
                disabled={!adminModeUnlocked}
                onChange={onToggleMaintenance}
              />
              <span className="custom-slider"></span>
            </label>
          </div>

          <div className="config-option-row">
            <div className="config-option-info">
              <span className="config-option-title">Impresión Automática de Comandas</span>
              <span className="config-option-desc">Envía el recibo a cocina al confirmar pago.</span>
            </div>
            <label className="custom-switch admin-switch">
              <input
                type="checkbox"
                checked={autoPrintTickets}
                disabled={!adminModeUnlocked}
                onChange={() => setAutoPrintTickets(!autoPrintTickets)}
              />
              <span className="custom-slider"></span>
            </label>
          </div>

          <div className="config-option-row column-layout">
            <div className="config-option-info config-mb-sm">
              <span className="config-option-title">Nivel de Registro de Auditoría</span>
              <span className="config-option-desc">Detalle de eventos y acciones del sistema.</span>
            </div>
            <select
              className="config-select admin-select"
              value={auditLogLevel}
              disabled={!adminModeUnlocked}
              onChange={(e) => setAuditLogLevel(e.target.value)}
            >
              <option value="basic">Básico (Solo errores y pagos)</option>
              <option value="detailed">Detallado (Pedidos, inventario y sesiones)</option>
              <option value="debug">Diagnóstico Completo (Debug)</option>
            </select>
          </div>

          <div className="config-option-row">
            <div className="config-option-info">
              <span className="config-option-title">Modo en Reposo (Screen Saver)</span>
              <span className="config-option-desc">Activa salvapantallas tras inactividad.</span>
            </div>
            <label className="custom-switch admin-switch">
              <input
                type="checkbox"
                checked={screenSaverMode}
                disabled={!adminModeUnlocked}
                onChange={() => setScreenSaverMode(!screenSaverMode)}
              />
              <span className="custom-slider"></span>
            </label>
          </div>

          <div className="config-option-row column-layout">
            <div className="config-option-info config-mb-sm">
              <span className="config-option-title">Tiempo para Reposo (Minutos)</span>
              <span className="config-option-desc">Lapso sin uso para oscurecer pantalla.</span>
            </div>
            <select
              className="config-select admin-select"
              value={sleepTimeout}
              disabled={!adminModeUnlocked}
              onChange={(e) => setSleepTimeout(e.target.value)}
            >
              <option value="5">5 Minutos</option>
              <option value="15">15 Minutos (Recomendado)</option>
              <option value="30">30 Minutos</option>
            </select>
          </div>

          <div className="config-option-row">
            <div className="config-option-info">
              <span className="config-option-title">Respaldo Automático Local</span>
              <span className="config-option-desc">Copia de seguridad en almacenamiento interno.</span>
            </div>
            <label className="custom-switch admin-switch">
              <input
                type="checkbox"
                checked={autoBackup}
                disabled={!adminModeUnlocked}
                onChange={() => setAutoBackup(!autoBackup)}
              />
              <span className="custom-slider"></span>
            </label>
          </div>

          <div className="config-option-row column-layout">
            <div className="config-option-info config-mb-md">
              <span className="config-option-title">Información del Sistema</span>
              <span className="config-option-desc">Diagnóstico técnico del entorno actual.</span>
            </div>

            <div className="system-info-box">
              <div className="system-info-row">
                <span>Versión del Software:</span>
                <strong>JC-POS v2.4.1 (Stable)</strong>
              </div>
              <div className="system-info-row">
                <span>Entorno de Ejecución:</span>
                <strong>React / Vite (Client)</strong>
              </div>
              <div className="system-info-row">
                <span>Estado de Red:</span>
                <strong className="status-connected">● Conectado (Fibra 50Mbps)</strong>
              </div>
              <div className="system-info-row">
                <span>Memoria Local:</span>
                <strong>14.2 MB / 50 MB Usados</strong>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="config-btn-action admin-btn"
            disabled={!adminModeUnlocked}
            onClick={() => onSave("Parámetros de administración guardados.")}
          >
            Guardar Configuración Admin
          </button>
        </div>
      </div>
    </SectionCard>
  );
}