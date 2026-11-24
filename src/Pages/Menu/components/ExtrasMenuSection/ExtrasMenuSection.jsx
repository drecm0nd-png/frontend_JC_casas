import { Plus } from "lucide-react";
import "./ExtrasMenuSection.css";

export default function ExtrasMenuSection({ onOpenModal }) {
  return (
    <section className="extra-section">
      <h2 className="section-title">Adicionales: Sopas &amp; Ensaladas</h2>
      <div className="cards-grid-3">
        <div className="extra-card">
          <div className="extra-img">Sopa de Ajiaco</div>
          <div className="extra-body">
            <h4>Sopa de Ajiaco Santafereño</h4>
            <p>Con pollo, mazorca, alcaparras y crema de leche.</p>
            <div className="extra-footer">
              <span className="price">8.000$</span>
              <button
                type="button"
                className="btn-add"
                onClick={() => onOpenModal({ nombre: "Sopa de Ajiaco Santafereño", precio: 8000 })}
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
        </div>
        <div className="extra-card">
          <div className="extra-img">Sancocho</div>
          <div className="extra-body">
            <h4>Sopa de Sancocho</h4>
            <p>Sopa especial con plátano, yuca y verdura fresca.</p>
            <div className="extra-footer">
              <span className="price">7.500$</span>
              <button
                type="button"
                className="btn-add"
                onClick={() => onOpenModal({ nombre: "Sopa de Sancocho", precio: 7500 })}
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
        </div>
        <div className="extra-card">
          <div className="extra-img">Ensalada</div>
          <div className="extra-body">
            <h4>Ensalada Especial</h4>
            <p>Aguacate, maíz dulce, queso y lechugas.</p>
            <div className="extra-footer">
              <span className="price">6.500$</span>
              <button
                type="button"
                className="btn-add"
                onClick={() => onOpenModal({ nombre: "Ensalada Especial", precio: 6500 })}
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}