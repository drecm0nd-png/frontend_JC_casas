import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  X,
  ArrowLeft,
  Check,
  Plus,
  Trash2,
  Copy,
  Sparkles,
  Pencil,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import "./LunchBuilder.css";

const DatosPrincipio = [
  { id: 1, titulo: "Frijoles Guisados", descripcion: "Guisados estilo Tradicional." },
  { id: 2, titulo: "Lentejas Caseras", descripcion: "Con ahogado de la casa." },
];

const DatosProteina = [
  { id: 1, titulo: "Carne Asada", descripcion: "Corte magro a la plancha." },
  { id: 2, titulo: "Pechuga a la plancha", descripcion: "Fileteada con sazon casera." },
];

const DatosAcompanamiento = [
  { id: 1, titulo: "Arroz Blanco", descripcion: "Porcion tradicional de la casa." },
  { id: 2, titulo: "Tajada o Ensalada", descripcion: "Maduro frito o ensalda fresca." },
];

const DatosAdicionalesModal = [
  { id: 0, titulo: "Sin adicional", descripcion: "Continuar sin adicional.", precio: 0, precioTexto: "$0" },
  { id: 1, titulo: "Sopa de Ajiaco Santafereño", descripcion: "Con pollo, mazorca y crema.", precio: 8000, precioTexto: "+8.000$" },
  { id: 2, titulo: "Sopa de Sancocho", descripcion: "Sopa especial con plátano y yuca.", precio: 7500, precioTexto: "+7.500$" },
  { id: 3, titulo: "Ensalada Especial", descripcion: "Aguacate, maíz dulce y queso.", precio: 6500, precioTexto: "+6.500$" },
];

const DatosBebidas = [
  { id: 1, titulo: "Jugos Naturales", descripcion: "Maracuyá, Mora, Mango o Lulo.", precioTexto: "Incluida" },
  { id: 2, titulo: "Limonada Cerezada", descripcion: "Refrescante limonada con hielo.", precioTexto: "Incluida" },
  { id: 3, titulo: "Gaseosas y Refrescos", descripcion: "Coca-Cola, Sprite, Colombiana.", precioTexto: "Incluida" },
];

export default function LunchBuilder({ isOpen, onClose, itemSeleccionado }) {
  const navigate = useNavigate();

  const [pasoActual, setPasoActual] = useState(1);
  const [principio, setPrincipio] = useState("");
  const [proteina, setProteina] = useState("");
  const [acompanamiento, setAcompanamiento] = useState("");
  const [adicional, setAdicional] = useState("Sin adicional");
  const [bebida, setBebida] = useState("Jugos Naturales");
  const [observaciones, setObservaciones] = useState("");

  const [almuerzosAcumulados, setAlmuerzosAcumulados] = useState([]);
  const [editandoIndex, setEditandoIndex] = useState(null);
  const [mostrarOpcionesAnadir, setMostrarOpcionesAnadir] = useState(false);
  const [indicesExpandidos, setIndicesExpandidos] = useState({});
  const [descripcionesVisibles, setDescripcionesVisibles] = useState({});
  const [errorValidacion, setErrorValidacion] = useState("");
  const [isShaking, setIsShaking] = useState(false);

  if (!isOpen) return null;

  const triggerShakeError = (mensaje) => {
    setErrorValidacion(mensaje);
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const guardarAlmuerzoActualEnHistorial = () => {
    const extraObj = DatosAdicionalesModal.find((a) => a.titulo === adicional);
    const precioExtra = extraObj ? extraObj.precio : 0;
    const precioBase = itemSeleccionado?.precio || 22500;

    const nuevoAlmuerzo = {
      principio: principio || "No seleccionado",
      proteina: proteina || "No seleccionado",
      acompanamiento: acompanamiento || "No seleccionado",
      adicional,
      bebida,
      observaciones,
      precio: precioBase + precioExtra,
    };

    let nuevaLista = [...almuerzosAcumulados];
    if (editandoIndex !== null) {
      nuevaLista[editandoIndex] = nuevoAlmuerzo;
      setEditandoIndex(null);
    } else {
      nuevaLista.push(nuevoAlmuerzo);
    }
    setAlmuerzosAcumulados(nuevaLista);
    setIndicesExpandidos((prev) => ({ ...prev, [nuevaLista.length - 1]: true }));
  };

  const handleSiguientePaso = () => {
    if (pasoActual === 1 && !principio) {
      triggerShakeError("¡Debes seleccionar un principio para continuar!");
      return;
    }
    if (pasoActual === 2 && !proteina) {
      triggerShakeError("¡Debes seleccionar una proteína para continuar!");
      return;
    }
    if (pasoActual === 3 && !acompanamiento) {
      triggerShakeError("¡Debes seleccionar un acompañamiento para continuar!");
      return;
    }

    setErrorValidacion("");
    if (pasoActual === 5) {
      guardarAlmuerzoActualEnHistorial();
      setPasoActual(6);
    } else if (pasoActual < 6) {
      setPasoActual((prev) => prev + 1);
    }
  };

  const handleAgregarMismoAlmuerzo = () => {
    if (almuerzosAcumulados.length === 0) return;
    const ultimo = almuerzosAcumulados[almuerzosAcumulados.length - 1];
    const nuevaLista = [...almuerzosAcumulados, { ...ultimo }];
    setAlmuerzosAcumulados(nuevaLista);
    setIndicesExpandidos((prev) => ({ ...prev, [nuevaLista.length - 1]: true }));
    setMostrarOpcionesAnadir(false);
  };

  const handleAgregarAlmuerzoDiferente = () => {
    setPrincipio("");
    setProteina("");
    setAcompanamiento("");
    setAdicional("Sin adicional");
    setBebida("Jugos Naturales");
    setObservaciones("");
    setEditandoIndex(null);
    setMostrarOpcionesAnadir(false);
    setErrorValidacion("");
    setPasoActual(1);
  };

  const handleEditarAlmuerzo = (index) => {
    const target = almuerzosAcumulados[index];
    if (!target) return;
    setPrincipio(target.principio);
    setProteina(target.proteina);
    setAcompanamiento(target.acompanamiento);
    setAdicional(target.adicional || "Sin adicional");
    setBebida(target.bebida || "Jugos Naturales");
    setObservaciones(target.observaciones || "");
    setEditandoIndex(index);
    setMostrarOpcionesAnadir(false);
    setPasoActual(1);
  };

  const handleEliminarAlmuerzo = (index) => {
    const filtrados = almuerzosAcumulados.filter((_, i) => i !== index);
    setAlmuerzosAcumulados(filtrados);
    if (filtrados.length === 0) {
      handleAgregarAlmuerzoDiferente();
    }
  };

  const toggleExpandir = (index) => {
    setIndicesExpandidos((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleDescripcion = (e, id) => {
    e.stopPropagation();
    setDescripcionesVisibles((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const totalPedido = almuerzosAcumulados.reduce((acc, item) => acc + (item.precio || 0), 0);

  const handleConfirmarPedido = () => {
    onClose();
    navigate("/car");
  };

  const obtenerTituloPaso = () => {
    const numeroAlmuerzoActual =
      editandoIndex !== null ? editandoIndex + 1 : almuerzosAcumulados.length + 1;
    const prefijoAlmuerzo = `Almuerzo ${numeroAlmuerzoActual}`;

    switch (pasoActual) {
      case 1:
        return `${prefijoAlmuerzo} - Paso 1 de 6: Selecciona tu Principio`;
      case 2:
        return `${prefijoAlmuerzo} - Paso 2 de 6: Selecciona tu Proteína`;
      case 3:
        return `${prefijoAlmuerzo} - Paso 3 de 6: Selecciona tu Acompañamiento`;
      case 4:
        return `${prefijoAlmuerzo} - Paso 4 de 6: Escoge tu Adicional (Opcional)`;
      case 5:
        return `${prefijoAlmuerzo} - Paso 5 de 6: Elige tu Bebida Incluida`;
      case 6:
        return `Resumen y Confirmación de Tus Almuerzos`;
      default:
        return "";
    }
  };

  return (
    <div className="lunch-modal-overlay" onClick={onClose}>
      <div
        className={`lunch-modal-content ${isShaking ? "shake-animation" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="lunch-modal-header">
          <div>
            <span className="modal-current-step-indicator">{obtenerTituloPaso()}</span>
            <h3 className="modal-main-title">
              {itemSeleccionado?.nombre || "Almuerzo Corriente / Ejecutivo"}
            </h3>
          </div>
          <button
            type="button"
            className="lunch-modal-close"
            onClick={onClose}
            title="Cerrar"
          >
            <X size={18} />
          </button>
        </div>

        {/* STEPPER */}
        <div className="stepper-wrapper">
          {[1, 2, 3, 4, 5, 6].map((num, idx) => (
            <React.Fragment key={num}>
              {idx > 0 && (
                <div className={`step-line ${pasoActual >= num ? "active" : ""}`} />
              )}
              <div
                className={`step-item ${
                  pasoActual === num
                    ? "active current"
                    : pasoActual > num
                    ? "active completed"
                    : ""
                }`}
              >
                {num}
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* ERROR */}
        {errorValidacion && (
          <div className="validation-error-alert">
            <span>⚠️ {errorValidacion}</span>
          </div>
        )}

        {/* CONTENIDO DE LOS PASOS */}
        <div className="step-content">
          {/* PASO 1 - PRINCIPIO */}
          {pasoActual === 1 && (
            <div className="step-content">
              <label className="step-label">Opciones de Principio</label>
              <div className="modal-cards-grid-kfc">
                {DatosPrincipio.map((item) => {
                  const isSelected = principio === item.titulo;
                  const showDesc = descripcionesVisibles[item.id];
                  return (
                    <div
                      key={item.id}
                      className={`modal-ingredient-card-kfc ${isSelected ? "selected" : ""}`}
                      onClick={() => {
                        setPrincipio(item.titulo);
                        setErrorValidacion("");
                      }}
                    >
                      <div className="kfc-card-header-actions">
                        <button
                          type="button"
                          className="btn-toggle-desc-kfc"
                          onClick={(e) => toggleDescripcion(e, item.id)}
                          title="Ver descripción"
                        >
                          {showDesc ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isSelected && (
                          <span className="card-check-badge-kfc">
                            <Check size={14} />
                          </span>
                        )}
                      </div>
                      <div className="card-image-placeholder-kfc">
                        <span>[ IMG ]</span>
                      </div>
                      <h4 className="card-title-kfc">{item.titulo}</h4>
                      {showDesc && (
                        <p className="card-desc-kfc">{item.descripcion}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* PASO 2 - PROTEÍNA */}
          {pasoActual === 2 && (
            <div className="step-content">
              <label className="step-label">Opciones de Proteína</label>
              <div className="modal-cards-grid-kfc">
                {DatosProteina.map((item) => {
                  const isSelected = proteina === item.titulo;
                  const showDesc = descripcionesVisibles[item.id];
                  return (
                    <div
                      key={item.id}
                      className={`modal-ingredient-card-kfc ${isSelected ? "selected" : ""}`}
                      onClick={() => {
                        setProteina(item.titulo);
                        setErrorValidacion("");
                      }}
                    >
                      <div className="kfc-card-header-actions">
                        <button
                          type="button"
                          className="btn-toggle-desc-kfc"
                          onClick={(e) => toggleDescripcion(e, item.id)}
                          title="Ver descripción"
                        >
                          {showDesc ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isSelected && (
                          <span className="card-check-badge-kfc">
                            <Check size={14} />
                          </span>
                        )}
                      </div>
                      <div className="card-image-placeholder-kfc">
                        <span>[ IMG ]</span>
                      </div>
                      <h4 className="card-title-kfc">{item.titulo}</h4>
                      {showDesc && (
                        <p className="card-desc-kfc">{item.descripcion}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* PASO 3 - ACOMPAÑAMIENTO */}
          {pasoActual === 3 && (
            <div className="step-content">
              <label className="step-label">Opciones de Acompañamiento</label>
              <div className="modal-cards-grid-kfc">
                {DatosAcompanamiento.map((item) => {
                  const isSelected = acompanamiento === item.titulo;
                  const showDesc = descripcionesVisibles[item.id];
                  return (
                    <div
                      key={item.id}
                      className={`modal-ingredient-card-kfc ${isSelected ? "selected" : ""}`}
                      onClick={() => {
                        setAcompanamiento(item.titulo);
                        setErrorValidacion("");
                      }}
                    >
                      <div className="kfc-card-header-actions">
                        <button
                          type="button"
                          className="btn-toggle-desc-kfc"
                          onClick={(e) => toggleDescripcion(e, item.id)}
                          title="Ver descripción"
                        >
                          {showDesc ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isSelected && (
                          <span className="card-check-badge-kfc">
                            <Check size={14} />
                          </span>
                        )}
                      </div>
                      <div className="card-image-placeholder-kfc">
                        <span>[ IMG ]</span>
                      </div>
                      <h4 className="card-title-kfc">{item.titulo}</h4>
                      {showDesc && (
                        <p className="card-desc-kfc">{item.descripcion}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* PASO 4 - ADICIONALES */}
          {pasoActual === 4 && (
            <div className="step-content">
              <label className="step-label">Adicionales (Sopas & Ensaladas)</label>
              <div className="modal-cards-grid-kfc">
                {DatosAdicionalesModal.map((item) => {
                  const isSelected = adicional === item.titulo;
                  const showDesc = descripcionesVisibles[item.id];
                  return (
                    <div
                      key={item.id}
                      className={`modal-ingredient-card-kfc ${isSelected ? "selected" : ""}`}
                      onClick={() => setAdicional(item.titulo)}
                    >
                      <div className="kfc-card-header-actions">
                        <button
                          type="button"
                          className="btn-toggle-desc-kfc"
                          onClick={(e) => toggleDescripcion(e, item.id)}
                          title="Ver descripción"
                        >
                          {showDesc ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isSelected && (
                          <span className="card-check-badge-kfc">
                            <Check size={14} />
                          </span>
                        )}
                      </div>
                      <div className="card-image-placeholder-kfc">
                        <span>[ IMG ]</span>
                      </div>
                      <h4 className="card-title-kfc">{item.titulo}</h4>
                      <span className="card-price-kfc">{item.precioTexto}</span>
                      {showDesc && (
                        <p className="card-desc-kfc">{item.descripcion}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* PASO 5 - BEBIDAS */}
          {pasoActual === 5 && (
            <div className="step-content">
              <label className="step-label">Bebida Incluida</label>
              <div className="modal-cards-grid-kfc">
                {DatosBebidas.map((item) => {
                  const isSelected = bebida === item.titulo;
                  const showDesc = descripcionesVisibles[item.id];
                  return (
                    <div
                      key={item.id}
                      className={`modal-ingredient-card-kfc ${isSelected ? "selected" : ""}`}
                      onClick={() => setBebida(item.titulo)}
                    >
                      <div className="kfc-card-header-actions">
                        <button
                          type="button"
                          className="btn-toggle-desc-kfc"
                          onClick={(e) => toggleDescripcion(e, item.id)}
                          title="Ver descripción"
                        >
                          {showDesc ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isSelected && (
                          <span className="card-check-badge-kfc">
                            <Check size={14} />
                          </span>
                        )}
                      </div>
                      <div className="card-image-placeholder-kfc">
                        <span>[ IMG ]</span>
                      </div>
                      <h4 className="card-title-kfc">{item.titulo}</h4>
                      <span className="card-price-kfc">{item.precioTexto}</span>
                      {showDesc && (
                        <p className="card-desc-kfc">{item.descripcion}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* PASO 6 - RESUMEN */}
          {pasoActual === 6 && (
            <div className="step-content">
              <h2 className="recommendation-title-bold">
                Recomendación especial para el almuerzo
              </h2>
              <p className="step-desc">
                Revisa el historial de tus almuerzos armados y añade notas si lo deseas.
              </p>

              <div className="accumulated-lunches-wrapper">
                {almuerzosAcumulados.map((alm, idx) => {
                  const isOpenAccordion = indicesExpandidos[idx];
                  return (
                    <div 
                      key={idx} 
                      className={`lunch-summary-accordion-card ${isOpenAccordion ? "open" : ""}`}
                    >
                      <div
                        className="lunch-accordion-header"
                        onClick={() => toggleExpandir(idx)}
                      >
                        <span className="lunch-number-badge">
                          Almuerzo {idx + 1} - ${(alm.precio || 22500).toLocaleString("es-CO")}
                        </span>
                        <div
                          className="lunch-accordion-right"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="lunch-icon-actions">
                            <button
                              type="button"
                              className="btn-icon-only edit"
                              onClick={() => handleEditarAlmuerzo(idx)}
                              title="Editar"
                            >
                              <Pencil size={18} />
                            </button>
                            {almuerzosAcumulados.length > 1 && (
                              <button
                                type="button"
                                className="btn-icon-only delete"
                                onClick={() => handleEliminarAlmuerzo(idx)}
                                title="Eliminar"
                              >
                                <Trash2 size={18} />
                              </button>
                            )}
                          </div>
                          <span
                            onClick={() => toggleExpandir(idx)}
                            style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
                          >
                            {isOpenAccordion ? (
                              <ChevronUp size={20} />
                            ) : (
                              <ChevronDown size={20} />
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Siempre renderizado, manejado por la clase .open en CSS */}
                      <div className="lunch-summary-details">
                        <span>
                          <strong>Principio:</strong> {alm.principio}
                        </span>
                        <span>
                          <strong>Proteína:</strong> {alm.proteina}
                        </span>
                        <span>
                          <strong>Acompañamiento:</strong> {alm.acompanamiento}
                        </span>
                        <span>
                          <strong>Adicional:</strong> {alm.adicional}
                        </span>
                        <span>
                          <strong>Bebida:</strong> {alm.bebida}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {mostrarOpcionesAnadir && (
                <div className="add-lunch-choice-card">
                  <p className="choice-card-title">
                    ¿Qué tipo de almuerzo deseas agregar?
                  </p>
                  <div className="choice-card-buttons">
                    <button
                      type="button"
                      className="btn-choice-same"
                      onClick={handleAgregarMismoAlmuerzo}
                    >
                      <Copy size={16} /> Agregar otro almuerzo igual
                    </button>
                    <button
                      type="button"
                      className="btn-choice-new"
                      onClick={handleAgregarAlmuerzoDiferente}
                    >
                      <Sparkles size={16} /> Agregar almuerzo diferente
                    </button>
                  </div>
                </div>
              )}

              <div className="comments-box">
                <label className="step-label" style={{ fontSize: "0.95rem" }}>
                  Observaciones para la cocina
                </label>
                <textarea
                  placeholder="Ej: Sin hielo, carne bien asada..."
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                  rows={2}
                  className="step-textarea"
                />
              </div>
            </div>
          )}

          {/* BOTONES */}
          <div className="step-actions-stacked">
            <div className="top-row-buttons">
              {pasoActual > 1 ? (
                <button
                  type="button"
                  className="btn-action-large btn-cancel-large"
                  onClick={() => {
                    setPasoActual(pasoActual - 1);
                    setErrorValidacion("");
                  }}
                >
                  <ArrowLeft size={18} /> Atrás
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-action-large btn-cancel-large"
                  onClick={onClose}
                >
                  Cancelar
                </button>
              )}

              {pasoActual === 6 ? (
                <button
                  type="button"
                  className="btn-action-large btn-add-more-large"
                  onClick={() => setMostrarOpcionesAnadir(!mostrarOpcionesAnadir)}
                >
                  <Plus size={18} /> Añadir almuerzo
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-action-large btn-save-large"
                  onClick={handleSiguientePaso}
                >
                  Siguiente
                </button>
              )}
            </div>

            {pasoActual === 6 && (
              <button
                type="button"
                className="btn-action-full btn-finish-large"
                onClick={handleConfirmarPedido}
              >
                Confirmar y ver en Carrito (${totalPedido.toLocaleString("es-CO")})
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}