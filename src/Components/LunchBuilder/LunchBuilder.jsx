import { useState } from "react";
import "./LunchBuilder.css";

const BASE_CATEGORIES = [
  { id: "principio", label: "Principio" },
  { id: "proteina", label: "Proteína" },
  { id: "acompanamiento", label: "Acompañamiento" },
];

const DEMO_OPTIONS = [
  { id: "demo-a", label: "Opción de demostración A" },
  { id: "demo-b", label: "Opción de demostración B" },
];

const DEMO_EXTRAS = [
  { id: "extra-demo-a", label: "Adicional de demostración A" },
  { id: "extra-demo-b", label: "Adicional de demostración B" },
];

function LunchBuilder() {
  const [selections, setSelections] = useState({
    principio: [],
    proteina: [],
    acompanamiento: [],
  });
  const [extras, setExtras] = useState([]);
  const [expandedSection, setExpandedSection] = useState("principio");

  const baseComplete = BASE_CATEGORIES.every(
    ({ id }) => selections[id].length > 0,
  );

  function toggleSection(sectionId) {
    setExpandedSection((current) => current === sectionId ? null : sectionId);
  }

  function updateSelection(category, optionId, checked) {
    if (!checked && selections[category].length === 1 && expandedSection === "extras") {
      setExpandedSection(category);
    }

    setSelections((current) => ({
      ...current,
      [category]: checked
        ? [...current[category], optionId]
        : current[category].filter((selectedId) => selectedId !== optionId),
    }));
  }

  function updateExtra(optionId, checked) {
    setExtras((current) => (
      checked
        ? [...current, optionId]
        : current.filter((selectedId) => selectedId !== optionId)
    ));
  }

  const extrasExpanded = baseComplete && expandedSection === "extras";

  return (
    <div className="lunch-builder">
      <p className="lunch-demo-notice">
        Opciones genéricas de demostración: no representan productos reales ni
        están disponibles para hacer pedidos.
      </p>

      <div className="lunch-base-options">
        {BASE_CATEGORIES.map(({ id, label }) => {
          const isExpanded = expandedSection === id;
          const triggerId = `lunch-trigger-${id}`;
          const panelId = `lunch-panel-${id}`;

          return (
            <section className="lunch-category" key={id}>
              <h3 className="lunch-category-heading">
                <button
                  id={triggerId}
                  className="lunch-category-trigger"
                  type="button"
                  aria-expanded={isExpanded}
                  aria-controls={panelId}
                  onClick={() => toggleSection(id)}
                >
                  <span>{label}</span>
                  <span className="lunch-chevron" aria-hidden="true" />
                </button>
              </h3>
              <div
                id={panelId}
                className={`lunch-accordion-panel ${isExpanded ? "is-open" : ""}`}
                role="region"
                aria-labelledby={triggerId}
                aria-hidden={!isExpanded}
                inert={!isExpanded}
              >
                <div className="lunch-accordion-panel-inner">
                  <fieldset className="lunch-options" disabled={!isExpanded}>
                    <legend className="lunch-sr-only">
                      Selecciona al menos una opción de {label}
                    </legend>
                    {DEMO_OPTIONS.map(({ id: optionId, label: optionLabel }) => {
                      const isSelected = selections[id].includes(optionId);

                      return (
                        <label
                          className={`lunch-option ${isSelected ? "is-selected" : ""}`}
                          key={optionId}
                        >
                          <input
                            type="checkbox"
                            name={id}
                            value={optionId}
                            checked={isSelected}
                            onChange={(event) => updateSelection(id, optionId, event.target.checked)}
                          />
                          <span>{optionLabel}</span>
                        </label>
                      );
                    })}
                  </fieldset>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <section className={`lunch-extras ${baseComplete ? "is-available" : "is-locked"}`}>
        <h3 className="lunch-category-heading">
          <button
            id="lunch-trigger-extras"
            className="lunch-category-trigger"
            type="button"
            aria-expanded={extrasExpanded}
            aria-controls="lunch-panel-extras"
            aria-describedby="lunch-extras-help"
            disabled={!baseComplete}
            onClick={() => toggleSection("extras")}
          >
            <span>Adicionales opcionales</span>
            <span className="lunch-chevron" aria-hidden="true" />
          </button>
        </h3>
        <p className="lunch-extras-help" id="lunch-extras-help">
          {baseComplete
            ? "La estructura base está completa. Puedes elegir adicionales si lo deseas."
            : "Completa Principio, Proteína y Acompañamiento para habilitar los adicionales."}
        </p>
        <div
          id="lunch-panel-extras"
          className={`lunch-accordion-panel ${extrasExpanded ? "is-open" : ""}`}
          role="region"
          aria-labelledby="lunch-trigger-extras"
          aria-hidden={!extrasExpanded}
          inert={!extrasExpanded}
        >
          <div className="lunch-accordion-panel-inner">
            <fieldset className="lunch-options" disabled={!extrasExpanded}>
              <legend className="lunch-sr-only">Adicionales de demostración</legend>
              {DEMO_EXTRAS.map(({ id, label }) => {
                const isSelected = extras.includes(id);

                return (
                  <label
                    className={`lunch-option ${isSelected ? "is-selected" : ""}`}
                    key={id}
                  >
                    <input
                      type="checkbox"
                      name="extras"
                      value={id}
                      checked={isSelected}
                      onChange={(event) => updateExtra(id, event.target.checked)}
                    />
                    <span>{label}</span>
                  </label>
                );
              })}
            </fieldset>
          </div>
        </div>
      </section>

      <p className="lunch-selection-status" role="status" aria-live="polite">
        {baseComplete
          ? "Estructura base completa."
          : "Elige al menos una opción en cada una de las tres partes obligatorias."}
      </p>
    </div>
  );
}

export default LunchBuilder;
