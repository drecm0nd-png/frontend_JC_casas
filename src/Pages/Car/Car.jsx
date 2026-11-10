import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLocationDot, FaPlus, FaTrash, FaTruck, FaPen, FaRotate, FaQrcode, FaMoneyBillWave, FaCreditCard, FaXmark } from "react-icons/fa6";
import qrImage from "../../assets/icons/codeQR.webp";
import "./Car.css";

export default function Car() {
  const navigate = useNavigate();
  
  // Estados de Dirección
  const [direccion, setDireccion] = useState("Calle 18A # 45-20, Sur de Bogotá");
  const [editandoDireccion, setEditandoDireccion] = useState(false);
  const [partesDireccion, setPartesDireccion] = useState({ via: "", numero: "", complemento: "", zona: "" });

  // Estado del Carrito
  const [carritoItems, setCarritoItems] = useState([
    { id: 1, nombre: "Almuerzo Corriente (Carne Asada + Fríjoles + Arroz)", precio: 22500, qty: 1 },
    { id: 2, nombre: "Sopa de Ajiaco (Adicional)", precio: 8000, qty: 1 }
  ]);
  const [itemAEliminarId, setItemAEliminarId] = useState(null);
  const [modoEdicionPedido, setModoEdicionPedido] = useState(false);

  // Estados del Modal de Pago
  const [modalPagoAbierto, setModalPagoAbierto] = useState(false);
  const [metodoSeleccionado, setMetodoSeleccionado] = useState("nequi");

  // Historial y pendientes
  const [pedidosPendientes, setPedidosPendientes] = useState([
    { id: "JC-8492", titulo: "Almuerzo Corriente / Ejecutivo", total: 30500, estado: "En Camino", tiempo: "10 - 15 min" }
  ]);
  
  const [pedidosHistorial] = useState([
    { id: "JC-8120", titulo: "Pechuga a la Plancha + Lentejas", total: 26500, estado: "Entregado" },
    { id: "JC-7988", titulo: "Almuerzo Corriente + Sancocho", total: 30000, estado: "Entregado" }
  ]);

  const totalCarrito = carritoItems.reduce((acc, item) => acc + (item.precio * item.qty), 0);

  // Funciones de Carrito
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

  const cancelarPedidoActual = () => {
    if (window.confirm("¿Estás seguro de cancelar este carrito y vaciar los productos?")) {
      setCarritoItems([]);
      setModoEdicionPedido(false);
    }
  };

  const confirmarPagoFinal = () => {
    alert(`¡Pago con ${metodoSeleccionado.toUpperCase()} procesado con éxito! Tu pedido ha sido enviado a cocina.`);
    setPedidosPendientes([
      { id: `JC-${Math.floor(1000 + Math.random() * 9000)}`, titulo: "Pedido Reciente del Carrito", total: totalCarrito, estado: "En Preparación", tiempo: "20 - 30 min" },
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
          <span className="car-subtitle">Restaurante JCasas</span>
          <h1 className="car-title">Carrito &amp; Gestión de Pedidos</h1>
          <p className="car-description">Administra tus productos, ajusta tu dirección de entrega y revisa el estado de tus platos.</p>
        </div>

        {/* CONTENEDOR PRINCIPAL EN GRID */}
        <div className="car-main-grid">
          
          {/* COLUMNA IZQUIERDA: CARRITO Y ACCIONES */}
          <div className="car-card-box">
            <div className="car-card-inner-header">
              <h3>Productos Seleccionados</h3>
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
                          <span className="car-item-name">{item.nombre}</span>
                        </div>
                        
                        <div className="car-item-actions-wrapper">
                          <span className="car-item-price">{(item.precio * item.qty).toLocaleString()} $</span>
                          
                          {modoEdicionPedido ? (
                            <div className="car-edit-controls">
                              <button type="button" onClick={() => modificarCantidad(item.id, -1)} className="btn-qty-mod">-</button>
                              <span className="car-qty-display">{item.qty}</span>
                              <button type="button" onClick={() => modificarCantidad(item.id, 1)} className="btn-qty-mod">+</button>
                              <button
                                type="button"
                                onClick={() => setItemAEliminarId(item.id)}
                                className="btn-delete-icon"
                              >
                                <FaTrash size={15} />
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setItemAEliminarId(item.id)}
                              title="Eliminar producto"
                              className="btn-delete-icon"
                            >
                              <FaTrash size={15} />
                            </button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="car-confirm-delete-box">
                        <span>¿Eliminar este producto?</span>
                        <div className="car-confirm-btns">
                          <button type="button" onClick={() => confirmarEliminar(item.id)} className="btn-yes-delete">Sí, eliminar</button>
                          <button type="button" onClick={() => setItemAEliminarId(null)} className="btn-cancel-delete">Cancelar</button>
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
              <>
                <div className="car-total-row">
                  <span>Total a Pagar:</span>
                  <span className="car-total-price">{totalCarrito.toLocaleString()} $</span>
                </div>

                <div className="car-payment-actions">
                  <button
                    type="button"
                    onClick={() => setModalPagoAbierto(true)}
                    className="btn-pay-now"
                  >
                    <FaTruck size={18} /> Proceder al Pago ({totalCarrito.toLocaleString()} $)
                  </button>

                  <div className="car-sub-actions">
                    <button
                      type="button"
                      onClick={() => setModoEdicionPedido(!modoEdicionPedido)}
                      className="btn-toggle-edit"
                    >
                      <FaPen size={13} /> {modoEdicionPedido ? "Finalizar edición" : "Editar pedido"}
                    </button>

                    <button
                      type="button"
                      onClick={cancelarPedidoActual}
                      className="btn-cancel-cart"
                    >
                      Cancelar pedido
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* COLUMNA DERECHA: DIRECCIÓN */}
          <div className="car-card-box">
            <div className="car-address-header">
              <div className="car-address-icon">
                <FaLocationDot size={20} />
              </div>
              <div>
                <h3>Dirección de Entrega</h3>
                <small>Especifica tu ubicación exacta</small>
              </div>
            </div>

            <div className="car-current-address-badge">
              <small>UBICACIÓN ACTUAL:</small>
              <p>{direccion}</p>
            </div>

            {!editandoDireccion ? (
              <button
                type="button"
                onClick={() => setEditandoDireccion(true)}
                className="btn-open-address-form"
              >
                Modificar / Especificar Dirección
              </button>
            ) : (
              <form onSubmit={guardarDireccion} className="car-address-form">
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

        </div>

        {/* SECCIÓN INFERIOR: HISTORIAL */}
        <div className="car-history-container">
          <h2>Mis Pedidos &amp; Historial</h2>

          <div className="car-history-grid">
            
            <div className="car-history-subcard">
              <h4>Pedidos Pendientes / Activos</h4>
              {pedidosPendientes.length > 0 ? (
                pedidosPendientes.map((ped) => (
                  <div key={ped.id} className="car-order-pending-item">
                    <div className="car-order-item-top">
                      <span className="car-order-id">Pedido #{ped.id}</span>
                      <span className="car-badge-pending">{ped.estado}</span>
                    </div>
                    <p className="car-order-title">{ped.titulo}</p>
                    <div className="car-order-footer">
                      <span>Tiempo: <strong>{ped.tiempo}</strong></span>
                      <span className="car-order-amount">{ped.total.toLocaleString()} $</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="car-empty-history">No tienes pedidos pendientes.</p>
              )}
            </div>

            <div className="car-history-subcard">
              <h4>Historial de Pedidos (Completados)</h4>
              {pedidosHistorial.length > 0 ? (
                pedidosHistorial.map((ped) => (
                  <div key={ped.id} className="car-order-completed-item">
                    <div className="car-order-item-top">
                      <span className="car-order-id">Pedido #{ped.id}</span>
                      <span className="car-badge-completed">✓ {ped.estado}</span>
                    </div>
                    <p className="car-order-title">{ped.titulo}</p>
                    <div className="car-order-footer">
                      <span className="car-order-amount">{ped.total.toLocaleString()} $</span>
                      <button
                        type="button"
                        onClick={() => alert(`Añadiendo de nuevo el pedido #${ped.id}...`)}
                        className="btn-reorder"
                      >
                        <FaRotate size={12} /> Volver a pedir
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="car-empty-history">No hay registros en el historial.</p>
              )}
            </div>

          </div>
        </div>

      </div>

      {/* MODAL DE PAGO CON QR DE NEQUI */}
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
                <p>Escanea el código QR con Nequi para pagar <strong>{totalCarrito.toLocaleString()} $</strong>:</p>
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
                Confirmar y Enviar Pedido ({totalCarrito.toLocaleString()} $)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}