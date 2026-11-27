import { FaPlus, FaTrash, FaTruck, FaPen, FaSliders, FaCheck, FaBan } from "react-icons/fa6";
import SectionCard from "../../../../Components/SectionCard/SectionCard";
import "./CartItemsCard.css";

export default function CartItemsCard({
  carritoItems,
  subtotalCarrito,
  costoEnvio,
  totalConEnvio,
  modoEdicionPedido,
  setModoEdicionPedido,
  itemAEliminarId,
  setItemAEliminarId,
  itemEditandoId,
  setItemEditandoId,
  tempCustom,
  setTempCustom,
  mostrarMiniCardCancelacion,
  setMostrarMiniCardCancelacion,
  onNavigateMenu,
  onModificarCantidad,
  onConfirmarEliminar,
  onIniciarEdicionPlato,
  onGuardarPersonalizacion,
  onEjecutarCancelacionTotal,
  onAbrirPago
}) {
  const addButton = (
    <button type="button" onClick={onNavigateMenu} className="btn-add-more">
      <FaPlus /> Añadir Almuerzo
    </button>
  );

  return (
    <SectionCard title="Productos en Carrito" action={addButton}>
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
                        <button type="button" onClick={() => onModificarCantidad(item.id, -1)} className="btn-qty-mod">-</button>
                        <span className="car-qty-display">{item.qty}</span>
                        <button type="button" onClick={() => onModificarCantidad(item.id, 1)} className="btn-qty-mod">+</button>
                      </div>
                    ) : (
                      <>
                        {item.principio && itemEditandoId !== item.id && (
                          <button
                            type="button"
                            onClick={() => onIniciarEdicionPlato(item)}
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
                    <button type="button" onClick={() => onConfirmarEliminar(item.id)} className="btn-yes-delete">Sí</button>
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
                        onChange={(e) => setTempCustom({ ...tempCustom, principio: e.target.value })}
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
                        onChange={(e) => setTempCustom({ ...tempCustom, proteina: e.target.value })}
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
                        onChange={(e) => setTempCustom({ ...tempCustom, acompanamiento: e.target.value })}
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
                        onChange={(e) => setTempCustom({ ...tempCustom, bebida: e.target.value })}
                      >
                        <option value="Jugo de Mora">Jugo de Mora</option>
                        <option value="Jugo de Maracuyá">Jugo de Maracuyá</option>
                        <option value="Limonada Cerezada">Limonada Cerezada</option>
                        <option value="Gaseosa Personal">Gaseosa Personal</option>
                      </select>
                    </div>
                  </div>

                  <div className="car-custom-actions">
                    <button type="button" onClick={() => onGuardarPersonalizacion(item.id)} className="btn-save-custom">
                      <FaCheck size={11} /> Confirmar Cambios
                    </button>
                    <button type="button" onClick={() => setItemEditandoId(null)} className="btn-cancel-custom">
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
            <button type="button" onClick={onNavigateMenu} className="btn-go-menu">
              Ver Menú &amp; Añadir Almuerzo
            </button>
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

          <button type="button" onClick={onAbrirPago} className="btn-pay-now">
            <FaTruck size={19} /> Proceder al Pago ({totalConEnvio.toLocaleString()} $)
          </button>

          <div className="car-sub-actions-desktop">
            <button type="button" onClick={() => setModoEdicionPedido(!modoEdicionPedido)} className="btn-toggle-edit">
              <FaPen size={12} /> {modoEdicionPedido ? "Finalizar edición" : "Editar cantidades"}
            </button>
            <button type="button" onClick={onEjecutarCancelacionTotal} className="btn-cancel-cart">
              Vaciar carrito
            </button>
          </div>

          <div className="car-sub-actions-mobile">
            {!mostrarMiniCardCancelacion ? (
              <>
                <button type="button" onClick={() => setModoEdicionPedido(!modoEdicionPedido)} className="btn-action-card-edit">
                  <FaPen size={14} /> {modoEdicionPedido ? "Finalizar edición" : "Editar cantidades"}
                </button>
                <button type="button" onClick={() => setMostrarMiniCardCancelacion(true)} className="btn-action-card-cancel">
                  <FaBan size={14} /> Vaciar carrito
                </button>
              </>
            ) : (
              <div className="car-cancel-mini-card">
                <p>⚠️ ¿Deseas vaciar y cancelar el pedido?</p>
                <small>Al cancelar, el domiciliario y cocina detendrán de inmediato el proceso.</small>
                <div className="car-cancel-mini-btns">
                  <button type="button" onClick={onEjecutarCancelacionTotal} className="btn-confirm-cancel-order">
                    Sí, cancelar
                  </button>
                  <button type="button" onClick={() => setMostrarMiniCardCancelacion(false)} className="btn-abort-cancel">
                    Volver
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </SectionCard>
  );
}