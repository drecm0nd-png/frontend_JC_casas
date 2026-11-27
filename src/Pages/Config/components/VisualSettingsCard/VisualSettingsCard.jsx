import { FaSliders } from "react-icons/fa6";
import SectionCard from "../../../../Components/SectionCard/SectionCard";
import "./VisualSettingsCard.css";

export default function VisualSettingsCard({
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
  onSave
}) {
  return (
    <SectionCard
      title="Configuración Visual & General"
      action={<FaSliders color="var(--accent-color)" size={20} />}
    >
      <div className="config-options-list">
        <div className={`config-option-row ${compactMode ? "compact" : ""}`}>
          <div className="config-option-info">
            <span className="config-option-title">Modo Nocturno</span>
            <span className="config-option-desc">Atenúa los tonos brillantes de la interfaz.</span>
          </div>
          <label className="custom-switch">
            <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
            <span className="custom-slider"></span>
          </label>
        </div>

        <div className={`config-option-row column-layout ${compactMode ? "compact" : ""}`}>
          <div className="config-option-info config-mb-sm">
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

        <div className={`config-option-row column-layout ${compactMode ? "compact" : ""}`}>
          <div className="config-option-info config-mb-xs">
            <span className="config-option-title">Brillo de Interfaz ({brightness}%)</span>
            <span className="config-option-desc">Intensidad lumínica de los contenedores.</span>
          </div>
          <input
            type="range"
            min="80"
            max="120"
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
            className="config-range-input"
          />
        </div>

        <div className={`config-option-row ${compactMode ? "compact" : ""}`}>
          <div className="config-option-info">
            <span className="config-option-title">Filtro para Daltónicos</span>
            <span className="config-option-desc">Ajusta el contraste y color de acentos.</span>
          </div>
          <label className="custom-switch">
            <input
              type="checkbox"
              checked={colorBlindMode}
              onChange={() => setColorBlindMode(!colorBlindMode)}
            />
            <span className="custom-slider"></span>
          </label>
        </div>

        <div className={`config-option-row ${compactMode ? "compact" : ""}`}>
          <div className="config-option-info">
            <span className="config-option-title">Vista Compacta de Opciones</span>
            <span className="config-option-desc">Reduce márgenes internos para ver más controles.</span>
          </div>
          <label className="custom-switch">
            <input
              type="checkbox"
              checked={compactMode}
              onChange={() => setCompactMode(!compactMode)}
            />
            <span className="custom-slider"></span>
          </label>
        </div>

        <div className={`config-option-row ${compactMode ? "compact" : ""}`}>
          <div className="config-option-info">
            <span className="config-option-title">Alertas de Pedidos Activos</span>
            <span className="config-option-desc">Muestra avisos cuando cambie el estado del pedido.</span>
          </div>
          <label className="custom-switch">
            <input
              type="checkbox"
              checked={orderAlerts}
              onChange={() => setOrderAlerts(!orderAlerts)}
            />
            <span className="custom-slider"></span>
          </label>
        </div>

        <div className={`config-option-row ${compactMode ? "compact" : ""}`}>
          <div className="config-option-info">
            <span className="config-option-title">Desplazamiento Suave</span>
            <span className="config-option-desc">Transiciones fluidas al navegar entre secciones.</span>
          </div>
          <label className="custom-switch">
            <input
              type="checkbox"
              checked={autoScrollMenu}
              onChange={() => setAutoScrollMenu(!autoScrollMenu)}
            />
            <span className="custom-slider"></span>
          </label>
        </div>

        <div className={`config-option-row ${compactMode ? "compact" : ""}`}>
          <div className="config-option-info">
            <span className="config-option-title">Feedback Háptico / Sonoro</span>
            <span className="config-option-desc">Avisos táctiles y confirmaciones en botones.</span>
          </div>
          <label className="custom-switch">
            <input
              type="checkbox"
              checked={hapticFeedback}
              onChange={() => setHapticFeedback(!hapticFeedback)}
            />
            <span className="custom-slider"></span>
          </label>
        </div>

        <button
          type="button"
          className="config-btn-action"
          onClick={() => onSave("Preferencias visuales y generales guardadas.")}
        >
          Guardar Preferencias
        </button>
      </div>
    </SectionCard>
  );
}