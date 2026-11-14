import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaClock, FaBoxOpen } from "react-icons/fa";
import "./NotificationsDropdown.css";

export default function NotificationsDropdown({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const notificaciones = [
    {
      id: 1,
      titulo: "¡Pedido comprado exitosamente!",
      descripcion: "Tu orden de almuerzo ejecutivo ha sido procesada.",
      tiempo: "Hace 2 min",
      icono: <FaCheckCircle className="notif-icon success" />,
    },
    {
      id: 2,
      titulo: "Tiempo de entrega estimado",
      descripcion: "Tu pedido va en camino. Llegará en 10 a 15 min.",
      tiempo: "Hace 5 min",
      icono: <FaClock className="notif-icon warning" />,
    },
    {
      id: 3,
      titulo: "Preparando en cocina",
      descripcion: "El chef está armando los componentes de tu plato.",
      tiempo: "Hace 10 min",
      icono: <FaBoxOpen className="notif-icon info" />,
    },
  ];

  const handleVerHistorial = () => {
    onClose();
    navigate("/car"); // <-- Redirige exactamente a tu ruta configurada en AppRoutes
  };

  return (
    <div className="notifications-dropdown-container">
      <div className="notifications-header">
        <h4>Notificaciones</h4>
        <span className="notif-count">3 nuevas</span>
      </div>

      <div className="notifications-list">
        {notificaciones.map((item) => (
          <div key={item.id} className="notification-item" onClick={handleVerHistorial}>
            <div className="notif-icon-wrapper">{item.icono}</div>
            <div className="notif-content">
              <h5>{item.titulo}</h5>
              <p>{item.descripcion}</p>
              <span className="notif-time">{item.tiempo}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="notifications-footer">
        <button type="button" onClick={handleVerHistorial} className="btn-view-all">
          Ver historial completo
        </button>
      </div>
    </div>
  );
}