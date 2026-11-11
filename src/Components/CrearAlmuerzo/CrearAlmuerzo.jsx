import { useState } from "react";
import { Plus, X } from "lucide-react";
import "./CrearAlmuerzo.css";

// Datos de ejemplo para las tarjetas basadas en tu imagen
const PRODUCTOS_EJEMPLO = [
  {
    id: 1,
    categoria: "Adicionales: Sopas & Ensaladas",
    nombre: "Sopa de Ajiaco Santafereño",
    descripcion: "Con pollo, mazorca, alcaparras y crema de leche.",
    precio: 8000,
    imagenNombre: "Sopa de Ajiaco"
  },
  {
    id: 2,
    categoria: "Adicionales: Sopas & Ensaladas",
    nombre: "Sopa de Sancocho",
    descripcion: "Sopa especial con plátano, yuca y verdura fresca.",
    precio: 7500,
    imagenNombre: "Sancocho"
  },
  {
    id: 3,
    categoria: "Adicionales: Sopas & Ensaladas",
    nombre: "Ensalada Especial",
    descripcion: "Aguacate, maíz dulce, queso y lechugas.",
    precio: 6500,
    imagenNombre: "Ensalada"
  },
  {
    id: 4,
    categoria: "Bebidas",
    nombre: "Jugos Naturales",
    descripcion: "Maracuyá, Mora, Mango o Lulo en agua o leche.",
    precio: 4000,
    imagenNombre: "Jugos"
  },
  {
    id: 5,
    categoria: "Bebidas",
    nombre: "Limonada Cerezada",
    descripcion: "Refrescante limonada recién preparada con hielo.",
    precio: 5500,
    imagenNombre: "Limonada"
  },
  {
    id: 6,
    categoria: "Bebidas",
    nombre: "Gaseosas y Refrescos",
    descripcion: "Coca-Cola, Sprite, Colombiana o Postobón personal.",
    precio: 3500,
    imagenNombre: "Gaseosas"
  }
];

export default function CrearAlmuerzo() {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [itemSeleccionado, setItemSeleccionado] = useState(null);

  // Estados del formulario dentro de la ventana emergente
  const [principio, setPrincipio] = useState("");
  const [proteina, setProteina] = useState("");
  const [acompanamiento, setAcompanamiento] = useState("");
  const [observaciones, setObservaciones] = useState("");

  const handleAbrirModal = (item) => {
    setItemSeleccionado(item);
    setModalAbierto(true);
  };

  const handleCerrarModal = () => {
    setModalAbierto(false);
    setItemSeleccionado(null);
    setPrincipio("");
    setProteina("");
    setAcompanamiento("");
    setObservaciones("");
  };

  const handleGuardarAlmuerzo = (e) => {
    e.preventDefault();
    const nuevoPedido = {
      base: itemSeleccionado,
      principio,
      proteina,
      acompanamiento,
      observaciones
    };
    console.log("Almuerzo creado:", nuevoPedido);
    alert(`¡${itemSeleccionado.nombre} agregado al pedido con éxito!`);
    handleCerrarModal();
  };

  return (
    <div className="almuerzo-container">
      {/* Sección: Adicionales Sopas & Ensaladas */}
      <h2 className="categoria-title">Adicionales: Sopas &amp; Ensaladas</h2>
      <div className="cards-grid">
        {PRODUCTOS_EJEMPLO.filter(p => p.categoria.includes("Sopas")).map((item) => (
          <div key={item.id} className="menu-card">
            <div className="card-image-placeholder">
              <span>{item.imagenNombre}</span>
            </div>
            <div className="card-content">
              <h3 className="card-title">{item.nombre}</h3>
              <p className="card-description">{item.descripcion}</p>
              <div className="card-footer">
                <span className="card-price">${item.precio.toLocaleString("es-CO")}</span>
                <button
                  type="button"
                  className="btn-add-plus"
                  onClick={() => handleAbrirModal(item)}
                  title="Agregar almuerzo"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sección: Bebidas */}
      <h2 className="categoria-title">Bebidas</h2>
      <div className="cards-grid">
        {PRODUCTOS_EJEMPLO.filter(p => p.categoria === "Bebidas").map((item) => (
          <div key={item.id} className="menu-card">
            <div className="card-image-placeholder">
              <span>{item.imagenNombre}</span>
            </div>
            <div className="card-content">
              <h3 className="card-title">{item.nombre}</h3>
              <p className="card-description">{item.descripcion}</p>
              <div className="card-footer">
                <span className="card-price">${item.precio.toLocaleString("es-CO")}</span>
                <button
                  type="button"
                  className="btn-add-plus"
                  onClick={() => handleAbrirModal(item)}
                  title="Agregar producto"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mini Ventana Emergente (Modal) */}
      {modalAbierto && (
        <div className="modal-overlay" onClick={handleCerrarModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            
            {/* Header del Modal */}
            <div className="modal-header">
              <div>
                <h3>Personalizar Almuerzo</h3>
                <p className="modal-subtitle">{itemSeleccionado?.nombre}</p>
              </div>
              <button type="button" className="btn-close-modal" onClick={handleCerrarModal}>
                <X size={20} />
              </button>
            </div>

            {/* Formulario del Modal */}
            <form onSubmit={handleGuardarAlmuerzo} className="modal-body">
              
              <div className="form-group">
                <label>1. Principio / Grano</label>
                <select 
                  value={principio} 
                  onChange={(e) => setPrincipio(e.target.value)}
                  required
                >
                  <option value="">-- Selecciona un principio --</option>
                  <option value="Frijoles Guisados">Frijoles Guisados</option>
                  <option value="Lentejas Caseras">Lentejas Caseras</option>
                  <option value="Sopa del día">Sopa del día</option>
                </select>
              </div>

              <div className="form-group">
                <label>2. Proteína / Carne</label>
                <select 
                  value={proteina} 
                  onChange={(e) => setProteina(e.target.value)}
                  required
                >
                  <option value="">-- Selecciona una proteína --</option>
                  <option value="Carne Asada">Carne Asada</option>
                  <option value="Pechuga a la Plancha">Pechuga a la Plancha</option>
                  <option value="Carne Molida">Carne Molida</option>
                  <option value="Chicharrón">Chicharrón</option>
                </select>
              </div>

              <div className="form-group">
                <label>3. Acompañamiento</label>
                <select 
                  value={acompanamiento} 
                  onChange={(e) => setAcompanamiento(e.target.value)}
                  required
                >
                  <option value="">-- Selecciona acompañamiento --</option>
                  <option value="Arroz Blanco y Tajada">Arroz Blanco y Tajada</option>
                  <option value="Ensalada Dulce">Ensalada Dulce</option>
                  <option value="Papa Cocida">Papa Cocida</option>
                </select>
              </div>

              <div className="form-group">
                <label>Observaciones o Notas</label>
                <textarea
                  placeholder="Ej: Sin cebolla en la ensalada, poco arroz..."
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                  rows={2}
                />
              </div>

              {/* Botones de Acción */}
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={handleCerrarModal}>
                  Cancelar
                </button>
                <button type="submit" className="btn-save">
                  Agregar (${itemSeleccionado?.precio.toLocaleString("es-CO")})
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}