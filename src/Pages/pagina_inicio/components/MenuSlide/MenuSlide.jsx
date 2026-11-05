import { useState } from "react";
import {
  ChevronDown,
  Drumstick,
  Leaf,
  Salad,
  Soup,
  Sprout,
  Utensils,
  UtensilsCrossed,
} from "lucide-react";
import { MENU_SECTIONS, SLIDES } from "../../data/inicioData.js";
import "./MenuSlide.css";

const slide = SLIDES[3];

const ICONS = {
  utensilsCrossed: UtensilsCrossed,
  drumstick: Drumstick,
  salad: Salad,
  soup: Soup,
  leaf: Leaf,
  utensils: Utensils,
  sprout: Sprout,
};

function MenuSlide() {
  const [openId, setOpenId] = useState(MENU_SECTIONS[0].id);

  function toggleSection(id) {
    setOpenId((current) => (current === id ? null : id));
  }

  return (
    <div className="menu-slide">
      <p className="inicio-step">
        <span className="inicio-step__number">{slide.step} / 05</span>
        <span className="inicio-step__sep" aria-hidden="true">
          
        </span>
        <span>{slide.label}</span>
      </p>

      <p className="inicio-eyebrow">Opciones del día</p>

      <h2 id={slide.titleId} className="inicio-title menu-slide__title">
        Partes Del Almuerzo
      </h2>

      <div className="menu-accordion">
        {MENU_SECTIONS.map((section) => {
          const SectionIcon = ICONS[section.icon] ?? UtensilsCrossed;
          const isOpen = openId === section.id;

          return (
            <div
              key={section.id}
              className={`menu-accordion__item ${isOpen ? "is-open" : ""}`}
            >
              <h3 className="menu-accordion__heading">
                <button
                  type="button"
                  className="menu-accordion__trigger"
                  onClick={() => toggleSection(section.id)}
                  aria-expanded={isOpen}
                  aria-controls={`menu-panel-${section.id}`}
                >
                  <span className="menu-accordion__trigger-label">
                    <SectionIcon
                      className="menu-accordion__section-icon"
                      aria-hidden="true"
                    />
                    <span>{section.title}</span>
                  </span>
                  <ChevronDown
                    className="menu-accordion__chevron"
                    aria-hidden="true"
                  />
                </button>
              </h3>

              <div
                id={`menu-panel-${section.id}`}
                className="menu-accordion__panel"
                aria-hidden={!isOpen}
              >
                <div className="menu-accordion__panel-inner">
                  <ul className="menu-accordion__list">
                    {section.items.map((item) => {
                      const ItemIcon = item.icon ? ICONS[item.icon] : null;

                      return (
                        <li key={item.title} className="menu-accordion__dish">
                          {ItemIcon ? (
                            <ItemIcon
                              className="menu-accordion__dish-icon"
                              aria-hidden="true"
                            />
                          ) : null}
                          <div>
                            <p className="menu-accordion__dish-title">
                              {item.title}
                            </p>
                            <p className="menu-accordion__dish-text">
                              {item.description}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MenuSlide;
