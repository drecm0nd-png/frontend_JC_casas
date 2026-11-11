import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLocationDot, FaPlus, FaTrash, FaTruck, FaPen, FaRotate, FaQrcode, FaMoneyBillWave, FaCreditCard, FaXmark, FaReceipt, FaNoteSticky, FaSliders, FaCheck, FaBan, FaMapLocationDot } from "react-icons/fa6";
import qrImage from "../../assets/icons/codeQR.webp";
import "./Car.css";

export default function Car() {
  const navigate = useNavigate();
  
  // Estados de Dirección y Notas
  const [direccion, setDireccion] = useState("Calle 18A # 45-20, Sur de Bogotá");
  const [editandoDireccion, setEditandoDireccion] = useState(false);
  const [partesDireccion, setPartesDireccion] = useState({ via: "", numero: "", complemento: "", zona: "" });
  const [notaDomiciliario, setNotaDomiciliario] = useState("");

  // Estado del Carrito
  const [carritoItems, setCarritoItems] = useState([
    { 
      id: 1, 
      nombre: "Almuerzo Corriente", 
      precio: 22500, 
      qty: 1,
      principio: "Fríjoles Guisados",
      proteina: "Carne Asada",
      acompanamiento: "Arroz y Tajada",
      bebida: "Jugo de Mora"
    },
    { 
      id: 2, 
      nombre: "Sopa de Ajiaco (Adicional)", 
      precio: 8000, 
      qty: 1
    }
  ]);

  const [itemAEliminarId, setItemAEliminarId] = useState(null);
  const [itemEditandoId, setItemEditandoId] = useState(null);
  const [tempCustom, setTempCustom] = useState({ principio: "", proteina: "", acompanamiento: "", bebida: "" });
  const [modoEdicionPedido, setModoEdicionPedido] = useState(false);
  
  // Estado para la mini tarjeta de confirmación de cancelación en móvil
  const [mostrarMiniCardCancelacion, setMostrarMiniCardCancelacion] = useState(false);

  // Estados del Modal de Pago
  const [modalPagoAbierto, setModalPagoAbierto] = useState(false);
  const [metodoSeleccionado, setMetodoSeleccionado] = useState("nequi");

  // Historial y pendientes
  const [pedidosPendientes, setPedidosPendientes] = useState([
    { id: "JC-8492", titulo: "Almuerzo Corriente / Ejecutivo", total: 30500, estado: "En Camino", tiempo: "10 - 15 min" },
    { id: "JC-8495", titulo: "Bandeja Paisa Especial + Jugo", total: 35000, estado: "En Preparación", tiempo: "25 min" }
  ]);
  
  const [pedidosHistorial] = useState([
    { id: "JC-8120", titulo: "Pechuga a la Plancha + Lentejas", total: 26500, estado: "Entregado" },
    { id: "JC-7988", titulo: "Almuerzo Corriente + Sancocho", total: 30000, estado: "Entregado" }
  ]);

  const subtotalCarrito = carritoItems.reduce((acc, item) => acc + (item.precio * item.qty), 0);
  const costoEnvio = carritoItems.length > 0 ? 4000 : 0;
  const totalConEnvio = subtotalCarrito + costoEnvio;

  const confirmarEliminar = (id) => {
    setCarritoItems(carritoItems.filter(item => item.id !== id));
    setItemAEliminarId(null);
  };

  const modificarCantidad = (id, delta) => {
    setCarritoItems(carritoItems.map(item => {
      if (item.id === id) {
        const nuevaQty = item.qty + delta;
        return nuevaQty > 0 ? { ...item, qty: nuevaQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const iniciarEdicionPlato = (item) => {
    setItemEditandoId(item.id);
    setTempCustom({
      principio: item.principio || "Fríjoles Guisados",
      proteina: item.proteina || "Carne Asada",
      acompanamiento: item.acompanamiento || "Arroz y Tajada",
      bebida: item.bebida || "Jugo de Mora"
    });
  };

  const guardarPersonalizacion = (id) => {
    setCarritoItems(carritoItems.map(item => {
      if (item.id === id) {
        return {
          ...item,
          principio: tempCustom.principio,
          proteina: tempCustom.proteina,
          acompanamiento: tempCustom.acompanamiento,
          bebida: tempCustom.bebida
        };
      }
      return item;
    }));
    setItemEditandoId(null);
  };

  const ejecutarCancelacionTotal = () => {
    setCarritoItems([]);
    setModoEdicionPedido(false);
    setMostrarMiniCardCancelacion(false);
    alert("Pedido cancelado. Se ha notificado al domiciliario y a cocina para detener el proceso de entrega.");
  };

  const confirmarPagoFinal = () => {
    alert(`¡Pago con ${metodoSeleccionado.toUpperCase()} procesado con éxito! Tu pedido ha sido enviado a cocina.`);
    setPedidosPendientes([
      { id: `JC-${Math.floor(1000 + Math.random() * 9000)}`, titulo: "Nuevo Pedido Reciente", total: totalConEnvio, estado: "En Preparación", tiempo: "20 - 30 min" },
      ...pedidosPendientes
    ]);
    setCarritoItems([]);
    setModalPagoAbierto(false);
  };

  const guardarDireccion = (e) => {
    e.preventDefault();
    const dirCompleta = `${partesDireccion.via} ${partesDireccion.numero}${partesDireccion.complemento ? `, ${partesDireccion.complemento}` : ""}${partesDireccion.zona ? `, ${partesDireccion.zona}` : ""}`.trim();
    if (dirCompleta) {
      setDireccion(dirCompleta);
      setEditandoDireccion(false);
      setPartesDireccion({ via: "", numero: "", complemento: "", zona: "" });
    }
  };

  return (
    <div className="car-page-container">
      <div className="car-inner-wrapper">
        
        {/* Cabecera */}
        <div className="car-header-section">
          <div>
            <span className="car-subtitle">Restaurante JCasas</span>
            <h1 className="car-title">Carrito &amp; Gestión de Pedidos</h1>
            <p className="car-description">Centro operativo en tiempo real para tus almuerzos, despachos y seguimiento.</p>
          </div>
          <div className="car-header-badge">
            <FaReceipt /> {carritoItems.length} {carritoItems.length === 1 ? 'Plato seleccionado' : 'Platos seleccionados'}
          </div>
        </div>

        {/* CONTENEDOR DE 3 COLUMNAS */}
        <div className="car-main-grid">
          
          {/* COLUMNA 1: PRODUCTOS EN CARRITO */}
          <div className="car-card-box">
            <div className="car-card-inner-header">
              <h3>Productos en Carrito</h3>
              <button
                type="button"
                onClick={() => navigate("/menu")}
                className="btn-add-more"
              >
                <FaPlus /> Añadir Almuerzo
              </button>
            </div>

            <ul className="car-items-list">
              {carritoItems.length > 0 ? (
                carritoItems.map((item) => (
                  <li key={item.id} className="car-item-row">
                    {itemAEliminarId !== item.id ? (
                      <div className="car-item-content">
                        <div className="car-item-info">
                          <span className="car-item-qty">{item.qty}x</span>
                          <div className="car-item-details-wrapper">
                            <span className="car-item-name">{item.nombre}</span>
                            {item.principio && itemEditandoId !== item.id && (
                              <span className="item-details-tags">
                                {item.principio} • {item.proteina} • {item.acompanamiento} • {item.bebida}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="car-item-actions-wrapper">
                          <span className="car-item-price">{(item.precio * item.qty).toLocaleString()} $</span>
                          
                          {modoEdicionPedido ? (
                            <div className="car-edit-controls">
                              <button type="button" onClick={() => modificarCantidad(item.id, -1)} className="btn-qty-mod">-</button>
                              <span className="car-qty-display">{item.qty}</span>
                              <button type="button" onClick={() => modificarCantidad(item.id, 1)} className="btn-qty-mod">+</button>
                            </div>
                          ) : (
                            <>
                              {item.principio && itemEditandoId !== item.id && (
                                <button
                                  type="button"
                                  onClick={() => iniciarEdicionPlato(item)}
                                  title="Personalizar componentes del almuerzo"
                                  className="btn-action-icon edit"
                                >
                                  <FaSliders size={15} />
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => setItemAEliminarId(item.id)}
                                title="Eliminar producto"
                                className="btn-action-icon delete"
                              >
                                <FaTrash size={15} />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="car-confirm-delete-box">
                        <span>¿Eliminar plato?</span>
                        <div className="car-confirm-btns">
                          <button type="button" onClick={() => confirmarEliminar(item.id)} className="btn-yes-delete">Sí</button>
                          <button type="button" onClick={() => setItemAEliminarId(null)} className="btn-cancel-delete">No</button>
                        </div>
                      </div>
                    )}

                    {itemEditandoId === item.id && (
                      <div className="car-customization-panel">
                        <h4 className="car-custom-title">Modificar componentes de tu almuerzo</h4>
                        <div className="car-custom-grid">
                          <div className="car-custom-group">
                            <label>Principio:</label>
                            <select 
                              className="car-custom-select"
                              value={tempCustom.principio}
                              onChange={(e) => setTempCustom({...tempCustom, principio: e.target.value})}
                            >
                              <option value="Fríjoles Guisados">Fríjoles Guisados</option>
                              <option value="Lentejas Caseras">Lentejas Caseras</option>
                              <option value="Pasta del Día">Pasta del Día</option>
                            </select>
                          </div>

                          <div className="car-custom-group">
                            <label>Proteína:</label>
                            <select 
                              className="car-custom-select"
                              value={tempCustom.proteina}
                              onChange={(e) => setTempCustom({...tempCustom, proteina: e.target.value})}
                            >
                              <option value="Carne Asada">Carne Asada</option>
                              <option value="Pechuga a la Plancha">Pechuga a la Plancha</option>
                              <option value="Sobrebarriga en Salsa">Sobrebarriga en Salsa</option>
                              <option value="Cerdo Frito">Cerdo Frito</option>
                            </select>
                          </div>

                          <div className="car-custom-group">
                            <label>Acompañamiento:</label>
                            <select 
                              className="car-custom-select"
                              value={tempCustom.acompanamiento}
                              onChange={(e) => setTempCustom({...tempCustom, acompanamiento: e.target.value})}
                            >
                              <option value="Arroz y Tajada">Arroz y Tajada</option>
                              <option value="Arroz y Ensalada">Arroz y Ensalada</option>
                              <option value="Solo Arroz">Solo Arroz</option>
                            </select>
                          </div>

                          <div className="car-custom-group">
                            <label>Bebida / Jugo:</label>
                            <select 
                              className="car-custom-select"
                              value={tempCustom.bebida}
                              onChange={(e) => setTempCustom({...tempCustom, bebida: e.target.value})}
                            >
                              <option value="Jugo de Mora">Jugo de Mora</option>
                              <option value="Jugo de Maracuyá">Jugo de Maracuyá</option>
                              <option value="Limonada Cerezada">Limonada Cerezada</option>
                              <option value="Gaseosa Personal">Gaseosa Personal</option>
                            </select>
                          </div>
                        </div>

                        <div className="car-custom-actions">
                          <button 
                            type="button" 
                            onClick={() => guardarPersonalizacion(item.id)} 
                            className="btn-save-custom"
                          >
                            <FaCheck size={11} /> Confirmar Cambios
                          </button>
                          <button 
                            type="button" 
                            onClick={() => setItemEditandoId(null)} 
                            className="btn-cancel-custom"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                ))
              ) : (
                <div className="car-empty-state">
                  <p>Tu carrito está vacío.</p>
                  <button type="button" onClick={() => navigate("/menu")} className="btn-go-menu">Ver Menú &amp; Añadir Almuerzo</button>
                </div>
              )}
            </ul>

            {carritoItems.length > 0 && (
              <div className="car-payment-actions">
                <div className="car-financial-summary">
                  <div className="car-summary-row">
                    <span>Subtotal platos:</span>
                    <span>{subtotalCarrito.toLocaleString()} $</span>
                  </div>
                  <div className="car-summary-row">
                    <span>Costo de domicilio:</span>
                    <span>{costoEnvio.toLocaleString()} $</span>
                  </div>
                  <div className="car-summary-row total">
                    <span>Total a Pagar:</span>
                    <span className="car-total-price">{totalConEnvio.toLocaleString()} $</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setModalPagoAbierto(true)}
                  className="btn-pay-now"
                >
                  <FaTruck size={19} /> Proceder al Pago ({totalConEnvio.toLocaleString()} $)
                </button>

                <div className="car-sub-actions-desktop">
                  <button
                    type="button"
                    onClick={() => setModoEdicionPedido(!modoEdicionPedido)}
                    className="btn-toggle-edit"
                  >
                    <FaPen size={12} /> {modoEdicionPedido ? "Finalizar edición" : "Editar cantidades"}
                  </button>

                  <button
                    type="button"
                    onClick={ejecutarCancelacionTotal}
                    className="btn-cancel-cart"
                  >
                    Vaciar carrito
                  </button>
                </div>

                <div className="car-sub-actions-mobile">
                  {!mostrarMiniCardCancelacion ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setModoEdicionPedido(!modoEdicionPedido)}
                        className="btn-action-card-edit"
                      >
                        <FaPen size={14} /> {modoEdicionPedido ? "Finalizar edición" : "Editar cantidades"}
                      </button>

                      <button
                        type="button"
                        onClick={() => setMostrarMiniCardCancelacion(true)}
                        className="btn-action-card-cancel"
                      >
                        <FaBan size={14} /> Vaciar carrito
                      </button>
                    </>
                  ) : (
                    <div className="car-cancel-mini-card">
                      <p>⚠️ ¿Deseas vaciar y cancelar el pedido?</p>
                      <small>Al cancelar, el domiciliario y cocina detendrán de inmediato el proceso.</small>
                      <div className="car-cancel-mini-btns">
                        <button 
                          type="button" 
                          onClick={ejecutarCancelacionTotal} 
                          className="btn-confirm-cancel-order"
                        >
                          Sí, cancelar
                        </button>
                        <button 
                          type="button" 
                          onClick={() => setMostrarMiniCardCancelacion(false)} 
                          className="btn-abort-cancel"
                        >
                          Volver
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* COLUMNA 2: DIRECCIÓN, MAPA (ARRIBA) Y COMENTARIO AL FONDO */}
          <div className="car-card-box address-card">
            <div>
              <div className="car-address-header">
                <div className="car-address-title-group">
                  <div className="car-address-icon">
                    <FaLocationDot size={18} />
                  </div>
                  <div>
                    <h3>Dirección de Entrega</h3>
                    <small>Ubicación exacta de destino</small>
                  </div>
                </div>

                {!editandoDireccion && (
                  <button
                    type="button"
                    onClick={() => setEditandoDireccion(true)}
                    className="btn-open-address-form"
                  >
                    <FaPen size={11} /> Modificar
                  </button>
                )}
              </div>

              {/* VISTA PREVIA DE MAPA / IMAGEN (COLOCADA SOBRE LA DIRECCIÓN) */}
              <div className="car-map-preview-box" title="Búsqueda en Google Maps (Próximamente)">
                <FaMapLocationDot size={26} />
                <span>Vista previa de Mapa (Google Maps)</span>
              </div>

              <div className="car-current-address-badge">
                <small>DESTINO ACTUAL:</small>
                <p>{direccion}</p>
              </div>

              {editandoDireccion && (
                <form onSubmit={guardarDireccion} className="car-address-form" style={{ marginTop: '1rem' }}>
                  <div className="car-form-group">
                    <label>Tipo de Vía:</label>
                    <select 
                      value={partesDireccion.via} 
                      onChange={(e) => setPartesDireccion({...partesDireccion, via: e.target.value})}
                    >
                      <option value="">Seleccionar vía...</option>
                      <option value="Calle">Calle</option>
                      <option value="Carrera">Carrera</option>
                      <option value="Diagonal">Diagonal</option>
                      <option value="Transversal">Transversal</option>
                      <option value="Avenida">Avenida</option>
                    </select>
                  </div>

                  <div className="car-form-group">
                    <label>Nomenclatura (Ej: 18A # 45-20):</label>
                    <input
                      type="text"
                      placeholder="Ej: 18A # 45-20"
                      value={partesDireccion.numero}
                      onChange={(e) => setPartesDireccion({...partesDireccion, numero: e.target.value})}
                      required
                    />
                  </div>

                  <div className="car-form-row">
                    <div className="car-form-group">
                      <label>Complemento:</label>
                      <input
                        type="text"
                        placeholder="Apto 302"
                        value={partesDireccion.complemento}
                        onChange={(e) => setPartesDireccion({...partesDireccion, complemento: e.target.value})}
                      />
                    </div>
                    <div className="car-form-group">
                      <label>Barrio / Zona:</label>
                      <input
                        type="text"
                        placeholder="Prado Vegas"
                        value={partesDireccion.zona}
                        onChange={(e) => setPartesDireccion({...partesDireccion, zona: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="car-form-buttons">
                    <button type="submit" className="btn-save-address">Guardar</button>
                    <button type="button" onClick={() => setEditandoDireccion(false)} className="btn-cancel-address">Cancelar</button>
                  </div>
                </form>
              )}
            </div>

            {/* COMENTARIO / INSTRUCCIONES UBICADO HASTA ABAJO DE LA TARJETA */}
            <div className="car-delivery-note-box-bottom">
              <label><FaNoteSticky size={12} /> Instrucciones para el domiciliario:</label>
              <textarea 
                rows="2"
                placeholder="Ej: Dejar en portería, timbre dañado..."
                value={notaDomiciliario}
                onChange={(e) => setNotaDomiciliario(e.target.value)}
              />
            </div>
          </div>

          {/* COLUMNA 3: CENTRO DE MONITOREO DE PEDIDOS */}
          <div className="car-orders-column">
            
            <div className="car-history-subcard">
              <h4>Pedidos en Curso</h4>
              <div className="car-orders-scroll-box">
                {pedidosPendientes.length > 0 ? (
                  pedidosPendientes.map((ped) => (
                    <div key={ped.id} className="car-order-pending-item">
                      <div className="car-order-item-top">
                        <span className="car-order-id">Pedido #{ped.id}</span>
                        <span className="car-badge-pending">{ped.estado}</span>
                      </div>
                      <p className="car-order-title">{ped.titulo}</p>
                      <div className="car-order-progress-bar">
                        <div className="car-order-progress-fill"></div>
                      </div>
                      <div className="car-order-footer">
                        <span>Tiempo est: <strong>{ped.tiempo}</strong></span>
                        <span className="car-order-amount">{ped.total.toLocaleString()} $</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="car-empty-history">No tienes pedidos activos.</p>
                )}
              </div>
            </div>

            <div className="car-history-subcard">
              <h4>Historial de Almuerzos</h4>
              <div className="car-orders-scroll-box">
                {pedidosHistorial.length > 0 ? (
                  pedidosHistorial.map((ped) => (
                    <div key={ped.id} className="car-order-completed-item">
                      <div className="car-order-item-top">
                        <span className="car-order-id">Pedido #{ped.id}</span>
                        <span className="car-badge-completed">✓ Entregado</span>
                      </div>
                      <p className="car-order-title">{ped.titulo}</p>
                      <div className="car-order-footer">
                        <span className="car-order-amount">{ped.total.toLocaleString()} $</span>
                        <button
                          type="button"
                          onClick={() => alert(`Añadiendo de nuevo el pedido #${ped.id} al carrito...`)}
                          className="btn-reorder"
                        >
                          <FaRotate size={11} /> Repetir
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="car-empty-history">No hay historial disponible.</p>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* MODAL DE PAGO */}
      {modalPagoAbierto && (
        <div className="car-modal-overlay">
          <div className="car-modal-content">
            <div className="car-modal-header">
              <h3>Selecciona el Método de Pago</h3>
              <button onClick={() => setModalPagoAbierto(false)} className="car-modal-close">
                <FaXmark size={18} />
              </button>
            </div>

            <div className="car-payment-methods">
              <button 
                type="button"
                className={`car-payment-option ${metodoSeleccionado === "nequi" ? "active" : ""}`}
                onClick={() => setMetodoSeleccionado("nequi")}
              >
                <FaQrcode size={22} color="#cc0066" />
                <span>Nequi (Código QR)</span>
              </button>

              <button 
                type="button"
                className={`car-payment-option ${metodoSeleccionado === "efectivo" ? "active" : ""}`}
                onClick={() => setMetodoSeleccionado("efectivo")}
              >
                <FaMoneyBillWave size={22} color="#2e7d32" />
                <span>Efectivo contra entrega</span>
              </button>

              <button 
                type="button"
                className={`car-payment-option ${metodoSeleccionado === "tarjeta" ? "active" : ""}`}
                onClick={() => setMetodoSeleccionado("tarjeta")}
              >
                <FaCreditCard size={22} color="#1976d2" />
                <span>Tarjeta Débito / Crédito</span>
              </button>
            </div>

            {metodoSeleccionado === "nequi" && (
              <div className="car-qr-container">
                <p>Escanea el código QR con Nequi para pagar <strong>{totalConEnvio.toLocaleString()} $</strong>:</p>
                <div className="car-qr-box">
                  <img src={qrImage} alt="Código QR Nequi" className="car-qr-img" />
                </div>
                <small className="car-qr-tip">Haz clic en confirmar abajo una vez pagues.</small>
              </div>
            )}

            {metodoSeleccionado === "efectivo" && (
              <div className="car-payment-info-box">
                <p>Prepara el dinero exacto para el domiciliario en: <strong>{direccion}</strong></p>
              </div>
            )}

            {metodoSeleccionado === "tarjeta" && (
              <div className="car-payment-info-box">
                <p>El domiciliario llevará un datáfono inalámbrico a tu domicilio.</p>
              </div>
            )}

            <div className="car-modal-footer">
              <button type="button" onClick={confirmarPagoFinal} className="btn-confirm-final-pay">
                Confirmar y Enviar Pedido ({totalConEnvio.toLocaleString()} $)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}