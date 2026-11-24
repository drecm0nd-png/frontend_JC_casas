import { FaGear, FaCheck } from "react-icons/fa6";
import { useConfigState } from "../../Hooks/useConfigState";
import VisualSettingsCard from "./components/VisualSettingsCard/VisualSettingsCard";
import AdminPanelCard from "./components/AdminPanelCard/AdminPanelCard";
import MaintenanceModal from "./components/MaintenanceModal/MaintenanceModal";
import "./Config.css";

export default function Config() {
  const {
    darkMode,
    setDarkMode,
    textSize,
    setTextSize,
    brightness,
    setBrightness,
    colorBlindMode,
    setColorBlindMode,
    hapticFeedback,
    setHapticFeedback,
    compactMode,
    setCompactMode,
    orderAlerts,
    setOrderAlerts,
    autoScrollMenu,
    setAutoScrollMenu,
    adminModeUnlocked,
    setAdminModeUnlocked,
    screenSaverMode,
    setScreenSaverMode,
    sleepTimeout,
    setSleepTimeout,
    autoBackup,
    setAutoBackup,
    maintenanceMode,
    autoPrintTickets,
    setAutoPrintTickets,
    auditLogLevel,
    setAuditLogLevel,
    maintenanceModalOpen,
    pendingMaintenanceValue,
    solicitarCambioMantenimiento,
    confirmarCambioMantenimiento,
    cancelarCambioMantenimiento,
    toastMessage,
    showToast
  } = useConfigState();

  return (
    <div className={`config-page-container font-${textSize}`}>
      {toastMessage && (
        <div className="config-toast">
          <FaCheck size={16} color="var(--accent-color)" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="config-inner-wrapper">
        <div className="config-header-section">
          <div>
            <span className="config-subtitle">Preferencias y Seguridad</span>
            <h1 className="config-title">Configuración del Sistema</h1>
            <p className="config-description">
              Personaliza tu experiencia visual y administra las funciones protegidas de gerencia.
            </p>
          </div>
          <div className="config-header-badge">
            <FaGear className="fa-spin" />
            <span>JC Casas POS</span>
          </div>
        </div>

        <div className="config-main-grid-two">
          <VisualSettingsCard
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            textSize={textSize}
            setTextSize={setTextSize}
            brightness={brightness}
            setBrightness={setBrightness}
            colorBlindMode={colorBlindMode}
            setColorBlindMode={setColorBlindMode}
            hapticFeedback={hapticFeedback}
            setHapticFeedback={setHapticFeedback}
            compactMode={compactMode}
            setCompactMode={setCompactMode}
            orderAlerts={orderAlerts}
            setOrderAlerts={setOrderAlerts}
            autoScrollMenu={autoScrollMenu}
            setAutoScrollMenu={setAutoScrollMenu}
            onSave={showToast}
          />

          <AdminPanelCard
            adminModeUnlocked={adminModeUnlocked}
            setAdminModeUnlocked={setAdminModeUnlocked}
            screenSaverMode={screenSaverMode}
            setScreenSaverMode={setScreenSaverMode}
            sleepTimeout={sleepTimeout}
            setSleepTimeout={setSleepTimeout}
            autoBackup={autoBackup}
            setAutoBackup={setAutoBackup}
            maintenanceMode={maintenanceMode}
            onToggleMaintenance={solicitarCambioMantenimiento}
            autoPrintTickets={autoPrintTickets}
            setAutoPrintTickets={setAutoPrintTickets}
            auditLogLevel={auditLogLevel}
            setAuditLogLevel={setAuditLogLevel}
            onSave={showToast}
          />
        </div>
      </div>

      <MaintenanceModal
        isOpen={maintenanceModalOpen}
        nextState={pendingMaintenanceValue}
        onConfirm={confirmarCambioMantenimiento}
        onCancel={cancelarCambioMantenimiento}
      />
    </div>
  );
}