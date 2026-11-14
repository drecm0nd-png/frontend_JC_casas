import { useState } from "react";
import { 
  FaGear, 
  FaSliders, 
  FaCheck, 
  FaLock,
  FaUserShield,
  FaServer,
  FaDisplay
} from "react-icons/fa6";
import "./Config.css";

export default function Config() {
  // Estados de Configuración Visual (Uso General)
  const [darkMode, setDarkMode] = useState(false);
  const [textSize, setTextSize] = useState("normal");
  const [brightness, setBrightness] = useState(100);
  const [colorBlindMode, setColorBlindMode] = useState(false);
  const [hapticFeedback, setHapticFeedback] = useState(true);

  // Estados de Modo Administrador (Ocultos con candado)
  const [adminModeUnlocked, setAdminModeUnlocked] = useState(false);
  const [screenSaverMode, setScreenSaverMode] = useState(true);
  const [sleepTimeout, setSleepTimeout] = useState("15");
  const [autoBackup, setAutoBackup] = useState(true);

  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <div className="config-page-container">
      {toastMessage && (
        <div className="config-toast">
          <FaCheck size={16} color="#bd732f" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="config-inner-wrapper">
        
        {/* Cabecera Principal */}
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

        {/* Grid principal de 2 Tarjetas */}
        <div className="config-main-grid-two">
          
          {/* ==========================================================
              TARJETA 1: CONFIGURACIÓN VISUAL Y GENERAL (LIBRE)
             ========================================================== */}
          <div className="config-card-box">
            <div className="config-card-inner-header">
              <h3>Configuración Visual & Accesibilidad</h3>
              <FaSliders color="#bd732f" size={20} />
            </div>

            <div className="config-options-list">
              {/* Modo Nocturno */}
              <div className="config-option-row">
                <div className="config-option-info">
                  <span className="config-option-title">Modo Nocturno</span>
                  <span className="config-option-desc">Atenúa los tonos brillantes de la interfaz.</span>
                </div>
                <label className="custom-switch">
                  <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                  <span className="custom-slider"></span>
                </label>
              </div>

              {/* Tamaño de Letra */}
              <div className="config-option-row column-layout">
                <div className="config-option-info" style={{ marginBottom: "0.4rem" }}>
                  <span className="config-option-title">Tamaño de Fuente</span>
                  <span className="config-option-desc">Escala tipográfica general del panel.</span>
                </div>
                <select 
                  className="config-select" 
                  value={textSize} 
                  onChange={(e) => setTextSize(e.target.value)}
                >
                  <option value="small">Pequeña</option>
                  <option value="normal">Normal (Estándar)</option>
                  <option value="large">Grande (Accesible)</option>
                </select>
              </div>

              {/* Brillo de Pantalla */}
              <div className="config-option-row column-layout">
                <div className="config-option-info" style={{ marginBottom: "0.2rem" }}>
                  <span className="config-option-title">Brillo de Interfaz ({brightness}%)</span>
                  <span className="config-option-desc">Intensidad lumínica de los contenedores.</span>
                </div>
                <input 
                  type="range" 
                  min="80" 
                  max="120" 
                  value={brightness} 
                  onChange={(e) => setBrightness(e.target.value)} 
                  className="config-range-input" 
                />
              </div>

              {/* Modo Daltónico */}
              <div className="config-option-row">
                <div className="config-option-info">
                  <span className="config-option-title">Filtro para Daltónicos</span>
                  <span className="config-option-desc">Ajusta el contraste de estados de pedidos.</span>
                </div>
                <label className="custom-switch">
                  <input type="checkbox" checked={colorBlindMode} onChange={() => setColorBlindMode(!colorBlindMode)} />
                  <span className="custom-slider"></span>
                </label>
              </div>

              {/* Feedback y Notificaciones */}
              <div className="config-option-row">
                <div className="config-option-info">
                  <span className="config-option-title">Feedback Háptico / Sonoro</span>
                  <span className="config-option-desc">Avisos táctiles y confirmaciones en botones.</span>
                </div>
                <label className="custom-switch">
                  <input type="checkbox" checked={hapticFeedback} onChange={() => setHapticFeedback(!hapticFeedback)} />
                  <span className="custom-slider"></span>
                </label>
              </div>

              <button className="config-btn-action" onClick={() => showToast("Preferencias visuales guardadas con éxito.")}>
                Guardar Cambios Visuales
              </button>
            </div>
          </div>


          {/* ==========================================================
              TARJETA 2: MODO ADMINISTRADOR (OCULTA CON CANDADO)
             ========================================================== */}
          <div className="config-card-box admin-card">
            <div className="config-card-inner-header">
              <h3>Panel de Administrador</h3>
              <FaUserShield color="#7c3aed" size={20} />
            </div>

            {/* Interruptor de Desbloqueo */}
            <div className="master-admin-switch">
              <div className="config-option-info">
                <span className="config-option-title">Desbloquear Funciones de Admin</span>
                <span className="config-option-desc">Requiere clave o credenciales gerenciales.</span>
              </div>
              <label className="custom-switch">
                <input 
                  type="checkbox" 
                  checked={adminModeUnlocked} 
                  onChange={() => setAdminModeUnlocked(!adminModeUnlocked)} 
                />
                <span className="custom-slider"></span>
              </label>
            </div>

            {/* Contenedor con efecto de oculto / candado si no está activo */}
            <div className={`config-dev-wrapper ${adminModeUnlocked ? "unlocked" : "locked"}`}>
              {!adminModeUnlocked && (
                <div className="config-lock-overlay">
                  <FaLock size={28} />
                  <span>Área restringida. Activa el interruptor superior para ver información del sistema y modo reposo.</span>
                </div>
              )}

              <div className="config-options-list">
                {/* Modo Reposo / Screen Saver */}
                <div className="config-option-row">
                  <div className="config-option-info">
                    <span className="config-option-title">Modo en Reposo (Screen Saver)</span>
                    <span className="config-option-desc">Activa salvapantallas tras inactividad.</span>
                  </div>
                  <label className="custom-switch">
                    <input 
                      type="checkbox" 
                      checked={screenSaverMode} 
                      disabled={!adminModeUnlocked}
                      onChange={() => setScreenSaverMode(!screenSaverMode)} 
                    />
                    <span className="custom-slider"></span>
                  </label>
                </div>

                {/* Tiempo de Inactividad */}
                <div className="config-option-row column-layout">
                  <div className="config-option-info" style={{ marginBottom: "0.4rem" }}>
                    <span className="config-option-title">Tiempo para Reposo (Minutos)</span>
                    <span className="config-option-desc">Lapso sin uso para oscurecer pantalla.</span>
                  </div>
                  <select 
                    className="config-select" 
                    value={sleepTimeout} 
                    disabled={!adminModeUnlocked}
                    onChange={(e) => setSleepTimeout(e.target.value)}
                  >
                    <option value="5">5 Minutos</option>
                    <option value="15">15 Minutos (Recomendado)</option>
                    <option value="30">30 Minutos</option>
                  </select>
                </div>

                {/* Sincronización / Respaldo Cloud */}
                <div className="config-option-row">
                  <div className="config-option-info">
                    <span className="config-option-title">Respaldo Automático Local</span>
                    <span className="config-option-desc">Copia de seguridad en almacenamiento interno.</span>
                  </div>
                  <label className="custom-switch">
                    <input 
                      type="checkbox" 
                      checked={autoBackup} 
                      disabled={!adminModeUnlocked}
                      onChange={() => setAutoBackup(!autoBackup)} 
                    />
                    <span className="custom-slider"></span>
                  </label>
                </div>

                {/* Información del Sistema */}
                <div className="config-option-row column-layout">
                  <div className="config-option-info" style={{ marginBottom: "0.6rem" }}>
                    <span className="config-option-title">Información del Sistema</span>
                    <span className="config-option-desc">Diagnóstico técnico del entorno actual.</span>
                  </div>
                  
                  <div className="system-info-box" style={{ width: "100%" }}>
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
                      <strong style={{ color: "#15803d" }}>● Conectado (Fibra 50Mbps)</strong>
                    </div>
                    <div className="system-info-row">
                      <span>Memoria Local:</span>
                      <strong>14.2 MB / 50 MB Usados</strong>
                    </div>
                  </div>
                </div>

                <button 
                  className="config-btn-action" 
                  disabled={!adminModeUnlocked}
                  onClick={() => showToast("Parámetros de administración guardados.")}
                >
                  Guardar Configuración Admin
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}