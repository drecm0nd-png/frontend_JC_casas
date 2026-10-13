import './menu.css'
import React, { useState } from 'react';

const MenuSection = () => {
  // Estado para guardar cuál categoría está abierta (ej. 'principio', 'proteina', 'acompañamiento' o null si ninguna)
  const [categoriaAbierta, setCategoriaAbierta] = useState(null);

  // Función para alternar el despliegue
  const toggleCategoria = (categoria) => {
    setCategoriaAbierta(categoriaAbierta === categoria ? null : categoria);
  };

  // Datos de ejemplo para las opciones de cada categoría
  const opcionesMenu = {
    principio: ['Frijoles', 'Lentejas', 'Arroz con verduras'],
    proteina: ['Carne asada', 'Pechuga a la plancha', 'Cerdo en salsa'],
    acompañamiento: ['Papas a la francesa', 'Patacón', 'Ensalada de la casa', 'Yuca frita']
  };

  return (
    <section className="menu-section">
      <div className="menu-card-container">
        <h3>Menu Del Dia</h3>

        {/* 1. PRINCIPIO */}
        <div className="menu-dropdown-wrapper">
          <div 
            className="menu-item-box" 
            onClick={() => toggleCategoria('principio')}
          >
            <span>Principio</span>
            <span className="arrow">{categoriaAbierta === 'principio' ? '▲' : '▼'}</span>
          </div>
          {categoriaAbierta === 'principio' && (
            <ul className="submenu-options">
              {opcionesMenu.principio.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>

        {/* 2. PROTEÍNA */}
        <div className="menu-dropdown-wrapper">
          <div 
            className="menu-item-box" 
            onClick={() => toggleCategoria('proteina')}
          >
            <span>Proteína</span>
            <span className="arrow">{categoriaAbierta === 'proteina' ? '▲' : '▼'}</span>
          </div>
          {categoriaAbierta === 'proteina' && (
            <ul className="submenu-options">
              {opcionesMenu.proteina.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>

        {/* 3. ACOMPAÑAMIENTO */}
        <div className="menu-dropdown-wrapper">
          <div 
            className="menu-item-box" 
            onClick={() => toggleCategoria('acompañamiento')}
          >
            <span>Acompañamiento</span>
            <span className="arrow">{categoriaAbierta === 'acompañamiento' ? '▲' : '▼'}</span>
          </div>
          {categoriaAbierta === 'acompañamiento' && (
            <ul className="submenu-options">
              {opcionesMenu.acompañamiento.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </section>
  );
};

export default MenuSection