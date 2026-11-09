import React, { useState } from "react";
import { 
  Settings, 
  Moon, 
  Sun, 
  Type, 
  Terminal, 
  Bug, 
  RotateCcw, 
  ShieldAlert,
  Sliders,
  Cpu
} from "lucide-react";
import "./Configuracion.css";

export default function Configuracion() {
  const [darkMode, setDarkMode] = useState(false);
  const [textSize, setTextSize] = useState("normal"); // 'small' | 'normal' | 'large'
  const [brightness, setBrightness] = useState(100);

  const [devModeEnabled, setDevModeEnabled] = useState(false);
  const [debugLogs, setDebugLogs] = useState(true);
  const [mockSlowNetwork, setMockSlowNetwork] = useState(false);
  const [apiEnvironment, setApiEnvironment] = useState("production");

  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <div className="config-main-card">
      {toastMessage && (
        <div className="dev-toast">
          <Terminal size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="config-header">
        <h2 className="config-title">Configuración del Sistema</h2>
        <p className="config-subtitle">
          Personaliza la experiencia visual y administra las funciones avanzadas de desarrollo.
        </p>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon-box amber">
            <Sliders size={24} />
          </div>
          <div>
            <p className="kpi-label">MODO VISUAL</p>
            <h3 className="kpi-value">{darkMode ? "Oscuro" : "Claro"}</h3>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-box blue">
            <Type size={24} />
          </div>
          <div>
            <p className="kpi-label">ESCALA FUENTE</p>
            <h3 className="kpi-value" style={{ textTransform: "capitalize" }}>
              {textSize}
            </h3>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-box red">
            <Cpu size={24} />
          </div>
          <div>
            <p className="kpi-label">MODO DEV</p>
            <h3 className="kpi-value">{devModeEnabled ? "Activo" : "Inactivo"}</h3>
          </div>
        </div>
      </div>

      {/* Bloque 1: Configuración General de Usuario */}
      <div className="records-card config-section-margin">
        <div className="section-title-box">
          <Settings size={20} className="section-icon-amber" />
          <div>
            <h3 className="section-heading">Preferencias de Interfaz</h3>
            <span className="section-subheading">Accesibilidad visual y lectura</span>
          </div>
        </div>

        <div className="settings-list">
          {/* Fila: Modo Oscuro */}
          <div className="setting-row">
            <div className="setting-details">
              <span className="setting-title">Modo Oscuro</span>
              <span className="setting-desc">Aplica tonos oscuros para reducir el cansancio visual.</span>
            </div>
            <button 
              className={`pill-button-toggle ${darkMode ? "active" : ""}`}
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <Moon size={16} /> : <Sun size={16} />}
              <span>{darkMode ? "Activado" : "Desactivado"}</span>
            </button>
          </div>

          {/* Fila: Tamaño de Letras (Con clase column-layout para responsive) */}
          <div className="setting-row column-layout font-size-row">
            <div className="setting-details">
              <span className="setting-title">Tamaño de Fuente</span>
              <span className="setting-desc">Ajusta la escala tipográfica general del panel.</span>
            </div>
            <div className="filter-pills font-size-pills">
              <button 
                className={`pill-button ${textSize === "small" ? "active" : ""}`}
                onClick={() => setTextSize("small")}
              >
                Pequeña
              </button>
              <button 
                className={`pill-button ${textSize === "normal" ? "active" : ""}`}
                onClick={() => setTextSize("normal")}
              >
                Normal
              </button>
              <button 
                className={`pill-button ${textSize === "large" ? "active" : ""}`}
                onClick={() => setTextSize("large")}
              >
                Grande
              </button>
            </div>
          </div>

          {/* Fila: Brillo */}
          <div className="setting-row column-layout">
            <div className="setting-details">
              <span className="setting-title">Brillo de Pantalla ({brightness}%)</span>
              <span className="setting-desc">Ajusta la opacidad global de la vista.</span>
            </div>
            <div className="brightness-slider-box">
              <Sun size={16} className="slider-icon" />
              <input 
                type="range" 
                min="80" 
                max="120" 
                value={brightness}
                onChange={(e) => setBrightness(e.target.value)}
                className="config-range-input"
              />
              <Sun size={20} className="slider-icon" />
            </div>
          </div>
        </div>
      </div>

      {/* Bloque 2: Opciones de Desarrollador */}
      <div className="records-card">
        <div className="section-title-box">
          <Terminal size={20} className="section-icon-purple" />
          <div>
            <h3 className="section-heading">Opciones de Desarrollador</h3>
            <span className="section-subheading">Herramientas avanzadas de inspección y depuración</span>
          </div>
        </div>

        <div className="master-dev-switch">
          <div className="setting-details">
            <span className="setting-title">Habilitar Modo Desarrollador</span>
            <span className="setting-desc">Desbloquea flags avanzadas de diagnóstico de red y logs.</span>
          </div>
          <label className="switch">
            <input 
              type="checkbox" 
              checked={devModeEnabled} 
              onChange={() => setDevModeEnabled(!devModeEnabled)} 
            />
            <span className="slider round"></span>
          </label>
        </div>

        <div className={`dev-tools-wrapper ${devModeEnabled ? "unlocked" : "locked"}`}>
          {!devModeEnabled && (
            <div className="lock-overlay">
              <ShieldAlert size={24} />
              <span>Activa el switch superior para usar los controles de administrador.</span>
            </div>
          )}

          <div className="settings-list margin-top-dev">
            <div className="setting-row">
              <div className="setting-details">
                <span className="setting-title">Logs en Consola</span>
                <span className="setting-desc">Muestra detalles de rendering y peticiones HTTP.</span>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={debugLogs} 
                  disabled={!devModeEnabled}
                  onChange={() => setDebugLogs(!debugLogs)} 
                />
                <span className="slider round"></span>
              </label>
            </div>

            <div className="setting-row">
              <div className="setting-details">
                <span className="setting-title">Simular Red Lenta</span>
                <span className="setting-desc">Añade 2000ms de latencia a las consultas.</span>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={mockSlowNetwork} 
                  disabled={!devModeEnabled}
                  onChange={() => setMockSlowNetwork(!mockSlowNetwork)} 
                />
                <span className="slider round"></span>
              </label>
            </div>

            <div className="setting-row">
              <div className="setting-details">
                <span className="setting-title">Entorno API</span>
                <span className="setting-desc">Cambia el servidor objetivo de respuestas.</span>
              </div>
              <select 
                className="status-select entregado"
                style={{ borderRadius: "0.5rem" }}
                value={apiEnvironment}
                disabled={!devModeEnabled}
                onChange={(e) => setApiEnvironment(e.target.value)}
              >
                <option value="production">PRODUCCIÓN</option>
                <option value="staging">STAGING (PRUEBAS)</option>
                <option value="local">LOCALHOST</option>
              </select>
            </div>

            <div className="dev-actions-grid">
              <button 
                className="btn-trigger-action"
                disabled={!devModeEnabled}
                onClick={() => triggerToast("Caché y LocalStorage purgados.")}
              >
                <RotateCcw size={14} /> Purgar Caché Local
              </button>
              <button 
                className="btn-trigger-action"
                style={{ backgroundColor: "#fee2e2", color: "#dc2626", borderColor: "#fca5a5" }}
                disabled={!devModeEnabled}
                onClick={() => triggerToast("Dump de memoria generado en consola.")}
              >
                <Bug size={14} /> Descargar Log de Errores
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}