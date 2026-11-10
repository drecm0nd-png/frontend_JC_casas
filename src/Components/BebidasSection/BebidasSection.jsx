import React from "react";
import { Plus } from "lucide-react";

// Lista de bebidas por defecto si no se reciben props
const BEBIDAS_DEFAULT = [
  {
    id: "bebida-1",
    nombre: "Jugos Naturales",
    descripcion: "Maracuyá, Mora, Mango o Lulo en agua o leche.",
    precio: 4000,
    etiquetaImg: "Jugos"
  },
  {
    id: "bebida-2",
    nombre: "Limonada Cerezada",
    descripcion: "Refrescante limonada recién preparada con hielo.",
    precio: 5500,
    etiquetaImg: "Limonada"
  },
  {
    id: "bebida-3",
    nombre: "Gaseosas y Refrescos",
    descripcion: "Coca-Cola, Sprite, Colombiana o Postobón personal.",
    precio: 3500,
    etiquetaImg: "Gaseosas"
  }
];

export default function BebidasSection({ bebidas = BEBIDAS_DEFAULT, onSelectBebida }) {
  return (
    <section className="extra-section">
      <h2 className="section-title">Bebidas</h2>
      
      <div className="cards-grid-3">
        {bebidas.map((item) => (
          <div key={item.id || item.nombre} className="extra-card">
            <div className="extra-img">{item.etiquetaImg || item.nombre}</div>
            
            <div className="extra-body">
              <h4>{item.nombre}</h4>
              <p>{item.descripcion || item.desc}</p>
              
              <div className="extra-footer">
                <span className="price">
                  ${item.precio?.toLocaleString("es-CO")}
                </span>
                
                <button
                  type="button"
                  className="btn-add"
                  title={`Agregar ${item.nombre}`}
                  onClick={() => onSelectBebida && onSelectBebida(item)}
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}