import { useState, useEffect } from "react";

export function useConfigState() {
  // Configuración visual y general
  const [darkMode, setDarkMode] = useState(false);
  const [textSize, setTextSize] = useState("normal");
  const [brightness, setBrightness] = useState(100);
  const [colorBlindMode, setColorBlindMode] = useState(false);
  const [hapticFeedback, setHapticFeedback] = useState(true);
  const [compactMode, setCompactMode] = useState(false);
  const [orderAlerts, setOrderAlerts] = useState(true);
  const [autoScrollMenu, setAutoScrollMenu] = useState(false);

  // Configuración del panel de administrador
  const [adminModeUnlocked, setAdminModeUnlocked] = useState(false);
  const [screenSaverMode, setScreenSaverMode] = useState(true);
  const [sleepTimeout, setSleepTimeout] = useState("15");
  const [autoBackup, setAutoBackup] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [autoPrintTickets, setAutoPrintTickets] = useState(true);
  const [auditLogLevel, setAuditLogLevel] = useState("detailed");

  // Estado del modal de confirmación de modo mantenimiento
  const [maintenanceModalOpen, setMaintenanceModalOpen] = useState(false);
  const [pendingMaintenanceValue, setPendingMaintenanceValue] = useState(false);

  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const solicitarCambioMantenimiento = () => {
    setPendingMaintenanceValue(!maintenanceMode);
    setMaintenanceModalOpen(true);
  };

  const confirmarCambioMantenimiento = () => {
    setMaintenanceMode(pendingMaintenanceValue);
    setMaintenanceModalOpen(false);
    showToast(
      pendingMaintenanceValue
        ? "Modo mantenimiento activado."
        : "Modo mantenimiento desactivado."
    );
  };

  const cancelarCambioMantenimiento = () => {
    setMaintenanceModalOpen(false);
  };

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.style.setProperty("--bg-page", "#141210");
      root.style.setProperty("--bg-card", "#1e1b18");
      root.style.setProperty("--bg-subtle", "#282420");
      root.style.setProperty("--text-main", "#f5f0ea");
      root.style.setProperty("--text-muted", "#b5a99c");
      root.style.setProperty("--border-color", "#3a3229");
    } else {
      root.style.setProperty("--bg-page", "#faf7f2");
      root.style.setProperty("--bg-card", "#ffffff");
      root.style.setProperty("--bg-subtle", "#fdfaf6");
      root.style.setProperty("--text-main", "#2b2b2b");
      root.style.setProperty("--text-muted", "#666666");
      root.style.setProperty("--border-color", "#ebdcc5");
    }

    if (colorBlindMode) {
      root.style.setProperty("--accent-color", "#0284c7");
      root.style.setProperty("--accent-hover", "#0369a1");
      root.style.setProperty("--status-ok", "#0d9488");
      root.style.setProperty("--status-warn", "#d97706");
    } else {
      root.style.setProperty("--accent-color", "#bd732f");
      root.style.setProperty("--accent-hover", "#a36125");
      root.style.setProperty("--status-ok", "#15803d");
      root.style.setProperty("--status-warn", "#f59e0b");
    }

    root.style.setProperty("--app-brightness", `${brightness}%`);
    root.style.setProperty(
      "--app-filter",
      colorBlindMode ? "saturate(1.15) contrast(1.06)" : "none"
    );
  }, [darkMode, brightness, colorBlindMode]);

  return {
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
    setMaintenanceMode,
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
  };
}