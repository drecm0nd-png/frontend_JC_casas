import { useNavigate } from "react-router-dom";
import { FaReceipt } from "react-icons/fa6";
import { useCarState } from "../../Hooks/useCarState";
import CartItemsCard from "./components/CartItemsCard/CartItemsCard";
import DeliveryAddressCard from "./components/DeliveryAddressCard/DeliveryAddressCard";
import OrdersMonitorColumn from "./components/OrdersMonitorColumn/OrdersMonitorColumn";
import PaymentModal from "./components/PaymentModal/PaymentModal";
import "./Car.css";

export default function Car() {
  const navigate = useNavigate();
  const {
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
    modificarCantidad,
    confirmarEliminar,
    iniciarEdicionPlato,
    guardarPersonalizacion,
    ejecutarCancelacionTotal,
    direccion,
    lugarBarrio,
    editandoDireccion,
    setEditandoDireccion,
    partesDireccion,
    setPartesDireccion,
    notaDomiciliario,
    setNotaDomiciliario,
    guardarDireccion,
    abrirGoogleMaps,
    pedidosPendientes,
    pedidosHistorial,
    modalPagoAbierto,
    setModalPagoAbierto,
    metodoSeleccionado,
    setMetodoSeleccionado,
    confirmarPagoFinal
  } = useCarState();

  return (
    <div className="car-page-container">
      <div className="car-inner-wrapper">
        <div className="car-header-section">
          <div>
            <span className="car-subtitle">Restaurante JCasas</span>
            <h1 className="car-title">Carrito &amp; Gestión de Pedidos</h1>
            <p className="car-description">
              Centro operativo en tiempo real para tus almuerzos, despachos y seguimiento.
            </p>
          </div>
          <div className="car-header-badge">
            <FaReceipt /> {carritoItems.length}{" "}
            {carritoItems.length === 1 ? "Plato seleccionado" : "Platos seleccionados"}
          </div>
        </div>

        <div className="car-main-grid">
          <CartItemsCard
            carritoItems={carritoItems}
            subtotalCarrito={subtotalCarrito}
            costoEnvio={costoEnvio}
            totalConEnvio={totalConEnvio}
            modoEdicionPedido={modoEdicionPedido}
            setModoEdicionPedido={setModoEdicionPedido}
            itemAEliminarId={itemAEliminarId}
            setItemAEliminarId={setItemAEliminarId}
            itemEditandoId={itemEditandoId}
            setItemEditandoId={setItemEditandoId}
            tempCustom={tempCustom}
            setTempCustom={setTempCustom}
            mostrarMiniCardCancelacion={mostrarMiniCardCancelacion}
            setMostrarMiniCardCancelacion={setMostrarMiniCardCancelacion}
            onNavigateMenu={() => navigate("/menu")}
            onModificarCantidad={modificarCantidad}
            onConfirmarEliminar={confirmarEliminar}
            onIniciarEdicionPlato={iniciarEdicionPlato}
            onGuardarPersonalizacion={guardarPersonalizacion}
            onEjecutarCancelacionTotal={ejecutarCancelacionTotal}
            onAbrirPago={() => setModalPagoAbierto(true)}
          />

          <DeliveryAddressCard
            direccion={direccion}
            lugarBarrio={lugarBarrio}
            editandoDireccion={editandoDireccion}
            setEditandoDireccion={setEditandoDireccion}
            partesDireccion={partesDireccion}
            setPartesDireccion={setPartesDireccion}
            notaDomiciliario={notaDomiciliario}
            setNotaDomiciliario={setNotaDomiciliario}
            onGuardarDireccion={guardarDireccion}
            onAbrirGoogleMaps={abrirGoogleMaps}
          />

          <OrdersMonitorColumn
            pedidosPendientes={pedidosPendientes}
            pedidosHistorial={pedidosHistorial}
          />
        </div>
      </div>

      <PaymentModal
        isOpen={modalPagoAbierto}
        onClose={() => setModalPagoAbierto(false)}
        metodoSeleccionado={metodoSeleccionado}
        setMetodoSeleccionado={setMetodoSeleccionado}
        totalConEnvio={totalConEnvio}
        direccion={direccion}
        lugarBarrio={lugarBarrio}
        onConfirmarPago={confirmarPagoFinal}
      />
    </div>
  );
}