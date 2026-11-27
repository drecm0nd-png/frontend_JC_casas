import { FaRotate } from "react-icons/fa6";
import SectionCard from "../../../../Components/SectionCard/SectionCard";
import "./OrdersMonitorColumn.css";

export default function OrdersMonitorColumn({ pedidosPendientes, pedidosHistorial }) {
  return (
    <div className="car-orders-column">
      <SectionCard title="Pedidos en Curso" variant="subcard">
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
      </SectionCard>

      <SectionCard title="Historial de Almuerzos" variant="subcard">
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
                    <FaRotate size={12} /> Repetir
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="car-empty-history">No hay historial disponible.</p>
          )}
        </div>
      </SectionCard>
    </div>
  );
}