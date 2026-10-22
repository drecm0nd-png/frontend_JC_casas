import { useState } from "react";
import { Link } from "react-router-dom";
import "./MealSections.css";

const MEAL_SECTIONS = [
  {
    id: "principio",
    title: "Principio",
    photoLabel: "Fotografía de Principio pendiente de recurso aprobado",
    description: "Descripción de Principio pendiente de contenido aprobado.",
  },
  {
    id: "proteinas",
    title: "Proteínas",
    photoLabel: "Fotografía de Proteínas pendiente de recurso aprobado",
    description: "Descripción de Proteínas pendiente de contenido aprobado.",
  },
  {
    id: "acompanamiento",
    title: "Acompañamiento",
    photoLabel: "Fotografía de Acompañamiento pendiente de recurso aprobado",
    description: "Descripción de Acompañamiento pendiente de contenido aprobado.",
  },
];

function MealSections() {
  const [expandedSections, setExpandedSections] = useState(() => new Set());

  function toggleSection(sectionId) {
    setExpandedSections((current) => {
      const next = new Set(current);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  }

  return (
    <div className="meal-sections">
      <p className="meal-sections-notice">
        Fotografías y descripciones provisionales: el contenido está pendiente
        de aprobación.
      </p>
      <div className="meal-sections-list">
        {MEAL_SECTIONS.map(({ id, title, photoLabel, description }) => {
          const isExpanded = expandedSections.has(id);
          const triggerId = `meal-section-trigger-${id}`;
          const panelId = `meal-section-panel-${id}`;

          return (
            <section className="meal-section" key={id}>
              <h3 className="meal-section-heading">
                <button
                  id={triggerId}
                  className="meal-section-trigger"
                  type="button"
                  aria-expanded={isExpanded}
                  aria-controls={panelId}
                  onClick={() => toggleSection(id)}
                >
                  <span>{title}</span>
                  <span className="meal-section-chevron" aria-hidden="true" />
                </button>
              </h3>
              <div
                id={panelId}
                className={`meal-section-panel ${isExpanded ? "is-open" : ""}`}
                role="region"
                aria-labelledby={triggerId}
                aria-hidden={!isExpanded}
                inert={!isExpanded}
              >
                <div className="meal-section-panel-inner">
                  <div
                    className="meal-section-photo-placeholder"
                    role="img"
                    aria-label={photoLabel}
                  >
                    <span>{photoLabel}</span>
                  </div>
                  <p className="meal-section-description">{description}</p>
                  <Link
                    className="button meal-section-order-link"
                    to="/login"
                    aria-label={`Pedir ${title}: ir al acceso de cliente`}
                  >
                    Pedir ¡YA!
                  </Link>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default MealSections;