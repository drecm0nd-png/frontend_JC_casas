import { useState } from "react";

const INITIAL_ITEMS = [
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
];

const INITIAL_PENDING = [
  { id: "JC-8492", titulo: "Almuerzo Corriente / Ejecutivo", total: 30500, estado: "En Camino", tiempo: "10 - 15 min" },
  { id: "JC-8495", titulo: "Bandeja Paisa Especial + Jugo", total: 35000, estado: "En Preparación", tiempo: "25 min" }
];

const INITIAL_HISTORY = [
  { id: "JC-8120", titulo: "Pechuga a la Plancha + Lentejas", total: 26500, estado: "Entregado" },
  { id: "JC-7988", titulo: "Almuerzo Corriente + Sancocho", total: 30000, estado: "Entregado" }
];

export function useCarState() {
  const [direccion, setDireccion] = useState("Calle 30 Sur # 12-45");
  const [lugarBarrio, setLugarBarrio] = useState("Soacha, Prado Vegas");
  const [editandoDireccion, setEditandoDireccion] = useState(false);
  const [partesDireccion, setPartesDireccion] = useState({ via: "", numero: "", lugar: "" });
  const [notaDomiciliario, setNotaDomiciliario] = useState("");

  const [carritoItems, setCarritoItems] = useState(INITIAL_ITEMS);
  const [itemAEliminarId, setItemAEliminarId] = useState(null);
  const [itemEditandoId, setItemEditandoId] = useState(null);
  const [tempCustom, setTempCustom] = useState({ principio: "", proteina: "", acompanamiento: "", bebida: "" });
  const [modoEdicionPedido, setModoEdicionPedido] = useState(false);
  const [mostrarMiniCardCancelacion, setMostrarMiniCardCancelacion] = useState(false);

  const [modalPagoAbierto, setModalPagoAbierto] = useState(false);
  const [metodoSeleccionado, setMetodoSeleccionado] = useState("nequi");

  const [pedidosPendientes, setPedidosPendientes] = useState(INITIAL_PENDING);
  const [pedidosHistorial] = useState(INITIAL_HISTORY);

  const subtotalCarrito = carritoItems.reduce((acc, item) => acc + item.precio * item.qty, 0);
  const costoEnvio = carritoItems.length > 0 ? 4000 : 0;
  const totalConEnvio = subtotalCarrito + costoEnvio;

  const confirmarEliminar = (id) => {
    setCarritoItems((prev) => prev.filter((item) => item.id !== id));
    setItemAEliminarId(null);
  };

  const modificarCantidad = (id, delta) => {
    setCarritoItems((prev) =>
      prev
        .map((item) => {
          if (item.id !== id) return item;
          const nuevaQty = item.qty + delta;
          return nuevaQty > 0 ? { ...item, qty: nuevaQty } : null;
        })
        .filter(Boolean)
    );
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
    setCarritoItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...tempCustom } : item))
    );
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
    setPedidosPendientes((prev) => [
      {
        id: `JC-${Math.floor(1000 + Math.random() * 9000)}`,
        titulo: "Nuevo Pedido Reciente",
        total: totalConEnvio,
        estado: "En Preparación",
        tiempo: "20 - 30 min"
      },
      ...prev
    ]);
    setCarritoItems([]);
    setModalPagoAbierto(false);
  };

  const guardarDireccion = (e) => {
    e.preventDefault();
    const dirPrincipal = `${partesDireccion.via} ${partesDireccion.numero}`.trim();
    const lugarSecundario = partesDireccion.lugar.trim();

    if (dirPrincipal) {
      setDireccion(dirPrincipal);
      setLugarBarrio(lugarSecundario);
      setEditandoDireccion(false);
      setPartesDireccion({ via: "", numero: "", lugar: "" });
    }
  };

  const abrirGoogleMaps = () => {
    const query = encodeURIComponent(`${direccion}, Soacha, Cundinamarca`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, "_blank");
  };

  return {
    direccion,
    lugarBarrio,
    editandoDireccion,
    setEditandoDireccion,
    partesDireccion,
    setPartesDireccion,
    notaDomiciliario,
    setNotaDomiciliario,
    carritoItems,
    itemAEliminarId,
    setItemAEliminarId,
    itemEditandoId,
    setItemEditandoId,
    tempCustom,
    setTempCustom,
    modoEdicionPedido,
    setModoEdicionPedido,
    mostrarMiniCardCancelacion,
    setMostrarMiniCardCancelacion,
    modalPagoAbierto,
    setModalPagoAbierto,
    metodoSeleccionado,
    setMetodoSeleccionado,
    pedidosPendientes,
    pedidosHistorial,
    subtotalCarrito,
    costoEnvio,
    totalConEnvio,
    confirmarEliminar,
    modificarCantidad,
    iniciarEdicionPlato,
    guardarPersonalizacion,
    ejecutarCancelacionTotal,
    confirmarPagoFinal,
    guardarDireccion,
    abrirGoogleMaps
  };
}