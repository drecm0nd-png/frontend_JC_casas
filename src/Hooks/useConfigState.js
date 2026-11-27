import { useState, useEffect } from "react";

const STORAGE_KEY = "jcasas:config_state";

function readInitialConfig() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function useConfigState() {
  const saved = readInitialConfig();

  const [darkMode, setDarkMode] = useState(Boolean(saved.darkMode ?? false));
  const [textSize, setTextSize] = useState(saved.textSize ?? "normal");
  const [brightness, setBrightness] = useState(saved.brightness ?? 100);
  const [colorBlindMode, setColorBlindMode] = useState(Boolean(saved.colorBlindMode ?? false));
  const [hapticFeedback, setHapticFeedback] = useState(Boolean(saved.hapticFeedback ?? true));
  const [compactMode, setCompactMode] = useState(Boolean(saved.compactMode ?? false));
  const [orderAlerts, setOrderAlerts] = useState(Boolean(saved.orderAlerts ?? true));
  const [autoScrollMenu, setAutoScrollMenu] = useState(Boolean(saved.autoScrollMenu ?? false));

  const [adminModeUnlocked, setAdminModeUnlocked] = useState(Boolean(saved.adminModeUnlocked ?? false));
  const [screenSaverMode, setScreenSaverMode] = useState(Boolean(saved.screenSaverMode ?? true));
  const [sleepTimeout, setSleepTimeout] = useState(saved.sleepTimeout ?? "15");
  const [autoBackup, setAutoBackup] = useState(Boolean(saved.autoBackup ?? true));
  const [maintenanceMode, setMaintenanceMode] = useState(Boolean(saved.maintenanceMode ?? false));
  const [autoPrintTickets, setAutoPrintTickets] = useState(Boolean(saved.autoPrintTickets ?? true));
  const [auditLogLevel, setAuditLogLevel] = useState(saved.auditLogLevel ?? "detailed");

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
      root.setAttribute("data-theme", "dark");
      root.classList.add("dark-mode");
      root.style.setProperty("--bg-page", "#4d311e");
      root.style.setProperty("--bg-card", "#382213");
      root.style.setProperty("--bg-subtle", "#5c3b24");
      root.style.setProperty("--text-main", "#fff9f2");
      root.style.setProperty("--text-muted", "#ebd2b5");
      root.style.setProperty("--border-color", "#9e6c43");
    } else {
      root.removeAttribute("data-theme");
      root.classList.remove("dark-mode");
      root.style.setProperty("--bg-page", "#faf7f2");
      root.style.setProperty("--bg-card", "#ffffff");
      root.style.setProperty("--bg-subtle", "#fdfaf6");
      root.style.setProperty("--text-main", "#2b2b2b");
      root.style.setProperty("--text-muted", "#666666");
      root.style.setProperty("--border-color", "#ebdcc5");
    }

    const clamped = Math.max(80, Math.min(120, Number(brightness) || 100));
    // Nivel de filtro controlado por la barra (0.20 a 1.00)
    const filterStrength = Number((0.2 + ((clamped - 80) / 40) * 0.8).toFixed(2));

    root.style.setProperty("--app-brightness", `${clamped}%`);
    root.style.setProperty("--filter-strength", String(filterStrength));

    if (colorBlindMode) {
      root.setAttribute("data-colorblind", "true");
      root.classList.add("colorblind-mode");
      root.style.setProperty("--accent-color", "#2563eb");
      root.style.setProperty("--accent-hover", "#1d4ed8");
      root.style.setProperty("--status-ok", "#0284c7");
      root.style.setProperty("--status-warn", "#3b82f6");

      const hueShift = Math.round(18 + filterStrength * 28);
      const satBoost = Number((1.05 + filterStrength * 0.35).toFixed(2));
      const contrastVal = Number((0.96 + filterStrength * 0.16).toFixed(2));
      root.style.setProperty(
        "--app-filter",
        `hue-rotate(${hueShift}deg) saturate(${satBoost}) contrast(${contrastVal})`
      );
    } else {
      root.removeAttribute("data-colorblind");
      root.classList.remove("colorblind-mode");
      root.style.setProperty("--accent-color", darkMode ? "#eadbc3" : "#bd732f");
      root.style.setProperty("--accent-hover", darkMode ? "#f7ebd7" : "#9e5d22");
      root.style.setProperty("--status-ok", darkMode ? "#eab308" : "#7c3aed");
      root.style.setProperty("--status-warn", darkMode ? "#eadbc3" : "#bd732f");
      root.style.setProperty("--app-filter", "none");
    }

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          darkMode,
          textSize,
          brightness: clamped,
          colorBlindMode,
          hapticFeedback,
          compactMode,
          orderAlerts,
          autoScrollMenu,
          adminModeUnlocked,
          screenSaverMode,
          sleepTimeout,
          autoBackup,
          maintenanceMode,
          autoPrintTickets,
          auditLogLevel
        })
      );
    } catch {
      // Ignorado si no hay acceso a localStorage
    }
  }, [
    darkMode,
    textSize,
    brightness,
    colorBlindMode,
    hapticFeedback,
    compactMode,
    orderAlerts,
    autoScrollMenu,
    adminModeUnlocked,
    screenSaverMode,
    sleepTimeout,
    autoBackup,
    maintenanceMode,
    autoPrintTickets,
    auditLogLevel
  ]);

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

export const useSettings = useConfigState;