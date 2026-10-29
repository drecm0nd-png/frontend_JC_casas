import { useState } from "react";
import Footer from "../../Components/Footer/Footer.jsx";
import "./Pedidos.css";

export default function Pedidos() {
  const [direccion, setDireccion] = useState(
    "Calle 18A # 45-20, Sur de Bogotá",
  );
  const [partesDireccion, setPartesDireccion] = useState({
    via: "",
    numero: "",
    complemento: "",
    zona: "",
  });
  const [campoSugerencias, setCampoSugerencias] = useState(null);
  const [editando, setEditando] = useState(false);

  const [expandidoActivo, setExpandidoActivo] = useState(false);
  const [expandidoHistorial1, setExpandidoHistorial1] = useState(false);
  const [expandidoHistorial2, setExpandidoHistorial2] = useState(false);

  // Sugerencias locales de nomenclatura colombiana; se permite conservar texto libre.
  const sugerenciasDireccion = {
    via: [
      "Calle",
      "Carrera",
      "Transversal",
      "Diagonal",
      "Avenida",
      "Circular",
      "Autopista",
    ],
    complemento: [
      "Apto",
      "Apartamento",
      "Casa",
      "Interior",
      "Torre",
      "Bloque",
      "Local",
    ],
    zona: ["Prado Vegas", "Ciudad Verde", "Hogares Soacha"],
  };
  const opcionesPara = (campo) => {
    const texto = partesDireccion[campo].trim().toLocaleLowerCase("es");
    return texto
      ? sugerenciasDireccion[campo].filter(
          (opcion) =>
            opcion.toLocaleLowerCase("es").startsWith(texto) &&
            opcion.toLocaleLowerCase("es") !== texto,
        )
      : [];
  };
  const renderCampoDireccion = ({
    campo,
    etiqueta,
    placeholder,
    sugerencias = true,
  }) => {
    const opciones = sugerencias ? opcionesPara(campo) : [];
    const id = `address-${campo}`;
    return (
      <div className="address-field" key={campo}>
        <label htmlFor={id}>{etiqueta}</label>
        <input
          id={id}
          type="text"
          placeholder={placeholder}
          value={partesDireccion[campo]}
          onChange={(e) => {
            setPartesDireccion((actuales) => ({
              ...actuales,
              [campo]: e.target.value,
            }));
            setCampoSugerencias(campo);
          }}
          onFocus={() => setCampoSugerencias(campo)}
          onBlur={() => setCampoSugerencias(null)}
          className="modern-input"
          autoComplete="off"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={campoSugerencias === campo && opciones.length > 0}
          aria-controls={`${id}-suggestions`}
        />
        {campoSugerencias === campo && opciones.length > 0 && (
          <ul
            id={`${id}-suggestions`}
            className="address-suggestions"
            role="listbox"
          >
            {opciones.map((opcion) => (
              <li key={opcion} role="option" aria-selected="false">
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    setPartesDireccion((actuales) => ({
                      ...actuales,
                      [campo]: opcion,
                    }));
                    setCampoSugerencias(null);
                  }}
                >
                  {opcion}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  const handleGuardarDireccion = (e) => {
    e.preventDefault();
    const direccionCompleta =
      `${partesDireccion.via} ${partesDireccion.numero}${partesDireccion.complemento ? `, ${partesDireccion.complemento}` : ""}${partesDireccion.zona ? `, ${partesDireccion.zona}` : ""}`.trim();
    if (direccionCompleta) {
      setDireccion(direccionCompleta);
      setPartesDireccion({ via: "", numero: "", complemento: "", zona: "" });
      setEditando(false);
    }
  };

  return (
    <div className="pedidos-page-container">
      <section className="pedidos-hero-banner-full">
        <div className="pedidos-hero-inner">
          <span className="hero-subcaption">Restaurante JCasas</span>
          <h1 className="pedidos-hero-title">Mis Pedidos &amp; Entregas</h1>
          <p className="pedidos-hero-subtitle">
            Sigue en tiempo real el estado de tu almuerzo o revisa tu historial
            de compras.
          </p>

          <div className="client-profile-chip">
            <span className="chip-avatar"></span>
            <div className="chip-info">
              <strong> UserTest </strong>
              <small> 333 333 3333</small>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENIDO CENTRADO CON ANCHO MÁXIMO */}
      <main className="pedidos-main-content">
        <div className="pedidos-grid-layout">
          {/* Columna Izquierda: Pedidos */}
          <section className="pedidos-section">
            <h2 className="section-heading">Seguimiento y Historial</h2>

            {/* 1. PEDIDO ACTIVO */}
            <div
              className={`order-card-modern ${expandidoActivo ? "expanded" : ""}`}
            >
              <div
                className="order-card-header"
                onClick={() => setExpandidoActivo(!expandidoActivo)}
                role="button"
                tabIndex={0}
              >
                <div className="order-header-left">
                  <span className="order-id-tag">Pedido #JC-8492</span>
                  <h3 className="order-main-title">
                    Almuerzo Corriente / Ejecutivo
                  </h3>
                  <span className="order-summary-price">30.500$</span>
                </div>
                <div className="order-header-right">
                  <span className="status-badge-pill">
                    <span className="pulsing-dot"></span> En Camino
                  </span>
                  <div
                    className={`arrow-icon-wrapper ${expandidoActivo ? "rotate" : ""}`}
                  >
                    ▼
                  </div>
                </div>
              </div>

              <div className="order-body-collapse">
                <div className="order-body-inner">
                  <div className="timeline-container">
                    <div className="timeline-step done">
                      <div className="step-indicator">✓</div>
                      <div className="step-content">
                        <strong>Pedido Confirmado</strong>
                        <span>Recibido en cocina</span>
                      </div>
                    </div>
                    <div className="timeline-step done">
                      <div className="step-indicator">✓</div>
                      <div className="step-content">
                        <strong>En Preparación</strong>
                        <span>Armando tu almuerzo fresco</span>
                      </div>
                    </div>
                    <div className="timeline-step current">
                      <div className="step-indicator pulse">🚚</div>
                      <div className="step-content">
                        <strong>Repartidor en Camino</strong>
                        <span>Estimado: 10 - 15 min</span>
                      </div>
                    </div>
                  </div>

                  <div className="products-summary-box">
                    <h4>Detalle de Productos</h4>
                    <ul className="products-list">
                      <li>
                        <div className="item-desc">
                          <span className="item-qty">1x</span>
                          <span>
                            Almuerzo Corriente (Carne Asada + Fríjoles + Arroz +
                            Patacón + Jugo)
                          </span>
                        </div>
                        <span className="item-price">22.500$</span>
                      </li>
                      <li className="item-with-action">
                        <div className="item-desc">
                          <span className="item-qty">1x</span>
                          <span>Sopa de Ajiaco (Adicional)</span>
                        </div>
                        <div className="item-price-action">
                          <span className="item-price">8.000$</span>
                          <button
                            type="button"
                            className="btn-action-delete"
                            onClick={(e) => {
                              e.stopPropagation();
                              alert("Adicional eliminado correctamente.");
                            }}
                          >
                            Eliminar
                          </button>
                        </div>
                      </li>
                    </ul>

                    <div className="total-calculation-row">
                      <span>Total Pagado</span>
                      <span className="final-price-tag">30.500$</span>
                    </div>

                    <div className="card-bottom-actions">
                      <button
                        type="button"
                        className="btn-secondary-action"
                        onClick={() =>
                          alert("Abriendo módulo para modificar el pedido...")
                        }
                      >
                        ✏️ Editar el Pedido
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. PEDIDO HISTÓRICO FANTASMA 1 */}
            <div
              className={`order-card-modern ${expandidoHistorial1 ? "expanded" : ""}`}
            >
              <div
                className="order-card-header"
                onClick={() => setExpandidoHistorial1(!expandidoHistorial1)}
                role="button"
                tabIndex={0}
              >
                <div className="order-header-left">
                  <span className="order-id-tag">Pedido #JC-8120</span>
                  <h3 className="order-main-title">
                    Pechuga a la Plancha + Lentejas
                  </h3>
                  <span className="order-summary-price">26.500$</span>
                </div>
                <div className="order-header-right">
                  <span className="status-badge-pill delivered">
                    ✓ Entregado
                  </span>
                  <div
                    className={`arrow-icon-wrapper ${expandidoHistorial1 ? "rotate" : ""}`}
                  >
                    ▼
                  </div>
                </div>
              </div>

              <div className="order-body-collapse">
                <div className="order-body-inner">
                  <div className="products-summary-box">
                    <h4>Resumen del Pedido Entregado</h4>
                    <ul className="products-list">
                      <li>
                        <div className="item-desc">
                          <span className="item-qty">1x</span>
                          <span>
                            Almuerzo Ejecutivo (Pechuga + Lentejas + Tajada +
                            Limonada Cerezada)
                          </span>
                        </div>
                        <span className="item-price">22.500$</span>
                      </li>
                      <li>
                        <div className="item-desc">
                          <span className="item-qty">1x</span>
                          <span>Jugo Natural de Mango en Leche</span>
                        </div>
                        <span className="item-price">4.000$</span>
                      </li>
                    </ul>

                    <div className="total-calculation-row">
                      <span>Total Pagado</span>
                      <span className="final-price-tag">26.500$</span>
                    </div>

                    <div className="card-bottom-actions">
                      <button
                        type="button"
                        className="btn-secondary-action"
                        onClick={() =>
                          alert(
                            "Añadiendo de nuevo los mismos productos al carrito...",
                          )
                        }
                      >
                        🔄 Volver a Pedir
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. PEDIDO HISTÓRICO FANTASMA 2 */}
            <div
              className={`order-card-modern ${expandidoHistorial2 ? "expanded" : ""}`}
            >
              <div
                className="order-card-header"
                onClick={() => setExpandidoHistorial2(!expandidoHistorial2)}
                role="button"
                tabIndex={0}
              >
                <div className="order-header-left">
                  <span className="order-id-tag">Pedido #JC-7988</span>
                  <h3 className="order-main-title">
                    Almuerzo Corriente + Sancocho
                  </h3>
                  <span className="order-summary-price">30.000$</span>
                </div>
                <div className="order-header-right">
                  <span className="status-badge-pill delivered">
                    ✓ Entregado
                  </span>
                  <div
                    className={`arrow-icon-wrapper ${expandidoHistorial2 ? "rotate" : ""}`}
                  >
                    ▼
                  </div>
                </div>
              </div>

              <div className="order-body-collapse">
                <div className="order-body-inner">
                  <div className="products-summary-box">
                    <h4>Resumen del Pedido Entregado</h4>
                    <ul className="products-list">
                      <li>
                        <div className="item-desc">
                          <span className="item-qty">1x</span>
                          <span>
                            Almuerzo Corriente (Carne Asada + Arroz Blanco +
                            Ensalada)
                          </span>
                        </div>
                        <span className="item-price">22.500$</span>
                      </li>
                      <li>
                        <div className="item-desc">
                          <span className="item-qty">1x</span>
                          <span>Sopa de Sancocho Especial</span>
                        </div>
                        <span className="item-price">7.500$</span>
                      </li>
                    </ul>

                    <div className="total-calculation-row">
                      <span>Total Pagado</span>
                      <span className="final-price-tag">30.000$</span>
                    </div>

                    <div className="card-bottom-actions">
                      <button
                        type="button"
                        className="btn-secondary-action"
                        onClick={() =>
                          alert(
                            "Añadiendo de nuevo los mismos productos al carrito...",
                          )
                        }
                      >
                        🔄 Volver a Pedir
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Columna Derecha: Dirección */}
          <section className="pedidos-section">
            <h2 className="section-heading">Dirección de Entrega</h2>

            <div className="address-card-modern">
              <div className="address-display-box">
                <div className="pin-icon">📍</div>
                <div className="address-details">
                  <small>Ubicación Actual</small>
                  <p>{direccion}</p>
                </div>
              </div>

              {!editando ? (
                <button
                  type="button"
                  className="btn-primary-action-full"
                  onClick={() => setEditando(true)}
                >
                  Cambiar / Ajustar Dirección
                </button>
              ) : (
                <form
                  onSubmit={handleGuardarDireccion}
                  className="modern-address-form"
                >
                  <p className="address-form-intro">
                    Completa tu dirección. Elige una sugerencia o escribe tu
                    propia opción.
                  </p>
                  {renderCampoDireccion({
                    campo: "via",
                    etiqueta: "Tipo y nombre de vía",
                    placeholder: "Ej: Calle 18A",
                  })}
                  {renderCampoDireccion({
                    campo: "numero",
                    etiqueta: "Número / nomenclatura",
                    placeholder: "Ej: # 45-20",
                    sugerencias: false,
                  })}
                  <div className="address-fields-row">
                    {renderCampoDireccion({
                      campo: "complemento",
                      etiqueta: "Apartamento, casa o local",
                      placeholder: "Ej: Apto 302",
                    })}
                    {renderCampoDireccion({
                      campo: "zona",
                      etiqueta: "Barrio o zona",
                      placeholder: "Ej: Prado Vegas",
                    })}
                  </div>
                  <div className="form-buttons-group">
                    <button type="submit" className="btn-confirm-save">
                      Guardar
                    </button>
                    <button
                      type="button"
                      className="btn-dismiss-cancel"
                      onClick={() => setEditando(false)}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
