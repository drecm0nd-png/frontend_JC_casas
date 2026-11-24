import { useState, useEffect, useMemo, useRef } from "react";
import "./Profile.css";

/* ───────────── Iconos (SVG inline, sin dependencias) ───────────── */
const ICONS = {
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" /></>,
  shield: <><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M9 12l2 2 4-4" /></>,
  bell: <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8" /><path d="M10 20a2 2 0 0 0 4 0" /></>,
  sliders: <><path d="M4 6h8M18 6h2M4 12h2M12 12h8M4 18h10M20 18h0" /><circle cx="15" cy="6" r="2" /><circle cx="9" cy="12" r="2" /><circle cx="17" cy="18" r="2" /></>,
  alert: <><path d="M12 3l10 18H2z" /><path d="M12 10v5M12 18h.01" /></>,
  camera: <><path d="M4 8h3l2-3h6l2 3h3v12H4z" /><circle cx="12" cy="13" r="3.5" /></>,
  edit: <path d="M4 20h4L19 9l-4-4L4 16z" />,
  eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>,
  eyeOff: <><path d="M3 3l18 18" /><path d="M10 6a9 9 0 0 1 2-.2c6 0 10 7 10 7a17 17 0 0 1-3 3.6M6.5 7A17 17 0 0 0 2 12s4 7 10 7c1.6 0 3-.4 4.2-1" /></>,
  logout: <><path d="M9 4H5v16h4" /><path d="M16 8l4 4-4 4M20 12H9" /></>,
  check: <path d="M5 12l5 5 9-10" />,
  x: <path d="M6 6l12 12M18 6L6 18" />,
  laptop: <><rect x="4" y="5" width="16" height="11" rx="1" /><path d="M2 19h20" /></>,
  phone: <><rect x="7" y="3" width="10" height="18" rx="2" /><path d="M11 18h2" /></>,
  trash: <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" />,
  upload: <path d="M12 16V4M7 9l5-5 5 5M4 20h16" />,
  key: <><circle cx="8" cy="15" r="4" /><path d="M11 12l9-9M16 7l3 3" /></>,
};

function Icon({ name, size = 18 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}

/* ───────────── Persistencia en el navegador (localStorage) ───────────── */
function usePersistentState(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved === null) return initial;
      const parsed = JSON.parse(saved);
      // Si es objeto, mezclamos con los valores por defecto (por si agregas campos nuevos)
      return initial && typeof initial === "object" && !Array.isArray(initial)
        ? { ...initial, ...parsed }
        : parsed;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* almacenamiento lleno o bloqueado: ignoramos */
    }
  }, [key, value]);

  return [value, setValue];
}

// Convierte la imagen a base64 y la reduce (así cabe en localStorage y sobrevive al recargar)
const fileToDataUrl = (file, max = 256) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });

/* ───────────── Utilidades ───────────── */
const getInitials = (name) =>
  name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");

const getStrength = (p) => {
  let s = 0;
  if (p.length >= 8) s++;
  if (/[a-z]/.test(p) && /[A-Z]/.test(p)) s++;
  if (/\d/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  return s;
};
const STRENGTH_LABELS = ["Muy débil", "Débil", "Aceptable", "Buena", "Fuerte"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_IMG_MB = 2;

/* ───────────── Componentes pequeños reutilizables ───────────── */
function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={`cfg-switch ${checked ? "is-on" : ""}`}
      onClick={onChange}
    >
      <span className="cfg-switch-knob" />
    </button>
  );
}

function Row({ title, desc, children, danger }) {
  return (
    <div className={`cfg-row ${danger ? "is-danger" : ""}`}>
      <div className="cfg-row-text">
        <span className="cfg-row-title">{title}</span>
        {desc && <p className="cfg-row-desc">{desc}</p>}
      </div>
      <div className="cfg-row-control">{children}</div>
    </div>
  );
}

function SectionHead({ title, desc }) {
  return (
    <header className="cfg-section-head">
      <h2>{title}</h2>
      {desc && <p>{desc}</p>}
    </header>
  );
}

function Modal({ title, onClose, children }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="cfg-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="cfg-modal" role="dialog" aria-modal="true" aria-label={title}>
        <div className="cfg-modal-head">
          <h3>{title}</h3>
          <button className="cfg-icon-btn" onClick={onClose} aria-label="Cerrar">
            <Icon name="x" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function TextField({ label, error, ...props }) {
  return (
    <label className="cfg-field">
      <span className="cfg-field-label">{label}</span>
      <input className={`cfg-input ${error ? "has-error" : ""}`} {...props} />
      {error && <span className="cfg-field-error">{error}</span>}
    </label>
  );
}

function PasswordField({ label, error, value, onChange, autoFocus }) {
  const [show, setShow] = useState(false);
  return (
    <label className="cfg-field">
      <span className="cfg-field-label">{label}</span>
      <span className="cfg-input-wrap">
        <input
          className={`cfg-input ${error ? "has-error" : ""}`}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          autoFocus={autoFocus}
          autoComplete="off"
        />
        <button
          type="button"
          className="cfg-input-eye"
          onClick={() => setShow(!show)}
          aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
        >
          <Icon name={show ? "eyeOff" : "eye"} />
        </button>
      </span>
      {error && <span className="cfg-field-error">{error}</span>}
    </label>
  );
}

/* ───────────── Modales ───────────── */
function EditProfileModal({ data, onSave, onClose }) {
  const [form, setForm] = useState({
    nombre: data.nombre,
    correo: data.correo,
    telefono: data.telefono,
    restaurante: data.restaurante,
    sucursal: data.sucursal,
  });
  const [errors, setErrors] = useState({});
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (form.nombre.trim().length < 3) err.nombre = "Escribe tu nombre completo.";
    if (!EMAIL_RE.test(form.correo)) err.correo = "Ingresa un correo válido, por ejemplo nombre@dominio.com.";
    if (form.telefono.replace(/\D/g, "").length < 10) err.telefono = "El teléfono debe tener al menos 10 dígitos.";
    if (!form.restaurante.trim()) err.restaurante = "Indica el nombre del restaurante.";
    setErrors(err);
    if (Object.keys(err).length === 0) onSave(form);
  };

  return (
    <Modal title="Editar datos personales" onClose={onClose}>
      <form onSubmit={submit} noValidate className="cfg-form">
        <TextField label="Nombre completo" value={form.nombre} onChange={set("nombre")} error={errors.nombre} autoFocus />
        <TextField label="Correo electrónico" type="email" value={form.correo} onChange={set("correo")} error={errors.correo} />
        <TextField label="Teléfono de contacto" type="tel" value={form.telefono} onChange={set("telefono")} error={errors.telefono} />
        <div className="cfg-form-split">
          <TextField label="Restaurante" value={form.restaurante} onChange={set("restaurante")} error={errors.restaurante} />
          <TextField label="Sucursal" value={form.sucursal} onChange={set("sucursal")} />
        </div>
        <div className="cfg-modal-actions">
          <button type="button" className="cfg-btn cfg-btn-ghost" onClick={onClose}>Cancelar</button>
          <button type="submit" className="cfg-btn cfg-btn-dark">Guardar cambios</button>
        </div>
      </form>
    </Modal>
  );
}

function AvatarModal({ current, name, onSave, onRemove, onClose }) {
  const [preview, setPreview] = useState(current || "");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const loadFile = async (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) return setError("El archivo debe ser una imagen (JPG, PNG o WebP).");
    if (file.size > MAX_IMG_MB * 1024 * 1024) return setError(`La imagen pesa más de ${MAX_IMG_MB} MB. Elige una más liviana.`);
    try {
      const dataUrl = await fileToDataUrl(file);
      setError("");
      setUrl("");
      setPreview(dataUrl);
    } catch {
      setError("No pudimos leer esa imagen. Prueba con otra.");
    }
  };

  const onUrl = (e) => {
    setUrl(e.target.value);
    setError("");
    setPreview(e.target.value);
  };

  return (
    <Modal title="Foto de perfil" onClose={onClose}>
      <div className="cfg-avatar-editor">
        <div className="cfg-avatar cfg-avatar-lg" aria-hidden="true">
          {preview ? (
            <img src={preview} alt="" onError={() => { setError("No pudimos cargar esa imagen. Revisa el enlace."); setPreview(""); }} />
          ) : (
            <span>{getInitials(name)}</span>
          )}
        </div>

        <div
          className={`cfg-drop ${dragging ? "is-over" : ""}`}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); loadFile(e.dataTransfer.files[0]); }}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
        >
          <Icon name="upload" size={22} />
          <strong>Arrastra una imagen o haz clic para elegirla</strong>
          <span>JPG, PNG o WebP · máximo {MAX_IMG_MB} MB</span>
          <input ref={inputRef} type="file" accept="image/*" hidden onChange={(e) => loadFile(e.target.files[0])} />
        </div>

        <TextField label="O pega el enlace de una imagen" type="url" placeholder="https://ejemplo.com/mi-foto.jpg" value={url} onChange={onUrl} />
        {error && <p className="cfg-field-error" role="alert">{error}</p>}
      </div>

      <div className="cfg-modal-actions cfg-spread">
        <button type="button" className="cfg-btn cfg-btn-link" onClick={onRemove} disabled={!current}>
          Quitar foto
        </button>
        <div className="cfg-inline">
          <button type="button" className="cfg-btn cfg-btn-ghost" onClick={onClose}>Cancelar</button>
          <button type="button" className="cfg-btn cfg-btn-dark" disabled={!preview || preview === current} onClick={() => onSave(preview)}>
            Guardar foto
          </button>
        </div>
      </div>
    </Modal>
  );
}

function PasswordModal({ onSave, onClose }) {
  const [p, setP] = useState({ current: "", next: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const set = (k) => (e) => setP({ ...p, [k]: e.target.value });
  const strength = getStrength(p.next);

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (!p.current) err.current = "Escribe tu contraseña actual.";
    if (p.next.length < 8) err.next = "Usa al menos 8 caracteres.";
    else if (p.next === p.current) err.next = "La nueva contraseña debe ser distinta a la actual.";
    else if (strength < 3) err.next = "Combina mayúsculas, minúsculas, números o símbolos.";
    if (p.confirm !== p.next) err.confirm = "Las contraseñas no coinciden.";
    setErrors(err);
    if (Object.keys(err).length === 0) onSave(p); // TODO: llamar a tu API aquí
  };

  return (
    <Modal title="Cambiar contraseña" onClose={onClose}>
      <form onSubmit={submit} noValidate className="cfg-form">
        <PasswordField label="Contraseña actual" value={p.current} onChange={set("current")} error={errors.current} autoFocus />
        <div>
          <PasswordField label="Nueva contraseña" value={p.next} onChange={set("next")} error={errors.next} />
          {p.next && (
            <div className="cfg-strength" aria-live="polite">
              <div className="cfg-strength-bars">
                {[1, 2, 3, 4].map((i) => (
                  <span key={i} className={i <= strength ? `on lvl-${strength}` : ""} />
                ))}
              </div>
              <span>{STRENGTH_LABELS[strength]}</span>
            </div>
          )}
        </div>
        <PasswordField label="Confirmar nueva contraseña" value={p.confirm} onChange={set("confirm")} error={errors.confirm} />
        <div className="cfg-modal-actions">
          <button type="button" className="cfg-btn cfg-btn-ghost" onClick={onClose}>Cancelar</button>
          <button type="submit" className="cfg-btn cfg-btn-dark">Actualizar contraseña</button>
        </div>
      </form>
    </Modal>
  );
}

function DeleteModal({ onConfirm, onClose }) {
  const [text, setText] = useState("");
  return (
    <Modal title="Eliminar cuenta" onClose={onClose}>
      <p className="cfg-modal-text">
        Esta acción no se puede deshacer. Se borrarán tus permisos, registros y datos vinculados a este panel de administración.
      </p>
      <TextField label='Escribe "ELIMINAR" para confirmar' value={text} onChange={(e) => setText(e.target.value)} autoFocus />
      <div className="cfg-modal-actions">
        <button className="cfg-btn cfg-btn-ghost" onClick={onClose}>Cancelar</button>
        <button className="cfg-btn cfg-btn-danger" disabled={text !== "ELIMINAR"} onClick={onConfirm}>
          Eliminar mi cuenta
        </button>
      </div>
    </Modal>
  );
}

/* ───────────── Componente principal ───────────── */
const SECTIONS = [
  { id: "perfil", label: "Perfil", icon: "user" },
  { id: "seguridad", label: "Seguridad", icon: "shield" },
  { id: "notificaciones", label: "Notificaciones", icon: "bell" },
  { id: "preferencias", label: "Preferencias", icon: "sliders" },
  { id: "cuenta", label: "Cuenta", icon: "alert" },
];

export default function Configuracion() {
  const [section, setSection] = usePersistentState("cfg:section", "perfil");

  const [userData, setUserData] = usePersistentState("cfg:userData", {
    nombre: "Felipe Galeano",
    correo: "exampleCorreo@gmail.com",
    telefono: "+57 300 123 4567",
    rol: "Administrador General",
    restaurante: "Mi Restaurante",
    sucursal: "Sede Principal",
    miembroDesde: "Marzo de 2025",
    avatar: null,
  });

  const [twoFactor, setTwoFactor] = usePersistentState("cfg:twoFactor", false);
  const [sessions, setSessions] = usePersistentState("cfg:sessions", [
    { id: 1, device: "Chrome en Windows", place: "Bogotá, Colombia", when: "Esta sesión", icon: "laptop", current: true },
    { id: 2, device: "Safari en iPhone", place: "Bogotá, Colombia", when: "Hace 2 horas", icon: "phone" },
    { id: 3, device: "Tablet de cocina", place: "Soacha, Colombia", when: "Hace 1 día", icon: "laptop" },
  ]);

  const [notifs, setNotifs] = usePersistentState("cfg:notifs", {
    emailWeekly: true,
    orderAlerts: true,
    orderSound: true,
    orderCancelled: true,
    lowStock: false,
    reservations: true,
  });

  const [prefs, setPrefs] = usePersistentState("cfg:prefs", {
    idioma: "es",
    moneda: "COP",
    hora: "12",
    inicio: "dashboard",
  });

  const [modal, setModal] = useState(null); // 'edit' | 'avatar' | 'password' | 'delete'
  const [toast, setToast] = useState(null);

  /* Toast */
  const notify = (msg, type = "ok") => setToast({ msg, type, id: Date.now() });
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(t);
  }, [toast]);

  /* Completitud del perfil */
  const checklist = useMemo(
    () => [
      { done: !!userData.avatar, hint: "Agrega una foto de perfil", action: () => setModal("avatar") },
      { done: userData.nombre.trim().length > 2, hint: "Escribe tu nombre completo", action: () => setModal("edit") },
      { done: EMAIL_RE.test(userData.correo), hint: "Agrega un correo válido", action: () => setModal("edit") },
      { done: userData.telefono.replace(/\D/g, "").length >= 10, hint: "Agrega un teléfono de contacto", action: () => setModal("edit") },
      { done: !!userData.restaurante.trim(), hint: "Indica el nombre de tu restaurante", action: () => setModal("edit") },
      { done: twoFactor, hint: "Activa la verificación en dos pasos", action: () => setSection("seguridad") },
    ],
    [userData, twoFactor]
  );
  const percent = Math.round((checklist.filter((c) => c.done).length / checklist.length) * 100);
  const nextStep = checklist.find((c) => !c.done);

  /* Handlers */
  const toggleNotif = (key) => {
    setNotifs((n) => ({ ...n, [key]: !n[key] }));
    notify("Preferencia guardada");
  };
  const setPref = (key) => (e) => {
    setPrefs((p) => ({ ...p, [key]: e.target.value }));
    notify("Preferencia guardada");
  };

  return (
    <div className="cfg">
      {/* ───── Cabecera ───── */}
      <section className="cfg-hero">
        <div className="cfg-banner">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
            alt=""
          />
        </div>
        <div className="cfg-hero-body">
          <button className="cfg-avatar cfg-avatar-hero" onClick={() => setModal("avatar")} aria-label="Cambiar foto de perfil">
            {userData.avatar ? <img src={userData.avatar} alt="" /> : <span>{getInitials(userData.nombre)}</span>}
            <span className="cfg-avatar-badge"><Icon name="camera" size={14} /></span>
          </button>

          <div className="cfg-id">
            <h1>{userData.nombre}</h1>
            <p>{userData.rol} · {userData.restaurante}</p>
          </div>

          <div className="cfg-progress">
            <div className="cfg-progress-top">
              <span>Perfil completo</span>
              <strong>{percent}%</strong>
            </div>
            <div className="cfg-progress-bar" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
              <span style={{ width: `${percent}%` }} />
            </div>
            {nextStep ? (
              <button className="cfg-progress-hint" onClick={nextStep.action}>{nextStep.hint}</button>
            ) : (
              <span className="cfg-progress-done"><Icon name="check" size={14} /> Todo listo</span>
            )}
          </div>
        </div>
      </section>

      {/* ───── Layout: menú + contenido ───── */}
      <div className="cfg-layout">
        <nav className="cfg-nav" aria-label="Secciones de configuración">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              className={`cfg-nav-item ${section === s.id ? "is-active" : ""} ${s.id === "cuenta" ? "is-last" : ""}`}
              onClick={() => setSection(s.id)}
              aria-current={section === s.id ? "page" : undefined}
            >
              <Icon name={s.icon} />
              <span>{s.label}</span>
            </button>
          ))}
        </nav>

        <main className="cfg-panel" key={section}>
          {/* PERFIL */}
          {section === "perfil" && (
            <>
              <SectionHead title="Información personal" desc="Estos datos aparecen en reportes, pedidos y comunicaciones del restaurante." />
              <dl className="cfg-data">
                <div><dt>Nombre</dt><dd>{userData.nombre}</dd></div>
                <div><dt>Correo</dt><dd>{userData.correo}</dd></div>
                <div><dt>Teléfono</dt><dd>{userData.telefono}</dd></div>
                <div><dt>Rol</dt><dd><span className="cfg-chip">{userData.rol}</span></dd></div>
                <div><dt>Restaurante</dt><dd>{userData.restaurante}</dd></div>
                <div><dt>Sucursal</dt><dd>{userData.sucursal || "—"}</dd></div>
                <div><dt>Miembro desde</dt><dd>{userData.miembroDesde}</dd></div>
              </dl>
              <div className="cfg-actions">
                <button className="cfg-btn cfg-btn-dark" onClick={() => setModal("edit")}>
                  <Icon name="edit" size={16} /> Editar datos
                </button>
                <button className="cfg-btn cfg-btn-soft" onClick={() => setModal("avatar")}>
                  <Icon name="camera" size={16} /> Cambiar foto
                </button>
              </div>
            </>
          )}

          {/* SEGURIDAD */}
          {section === "seguridad" && (
            <>
              <SectionHead title="Seguridad" desc="Protege tu acceso al panel y revisa dónde has iniciado sesión." />
              <Row title="Contraseña" desc="Última actualización hace 3 meses. Cámbiala con frecuencia.">
                <button className="cfg-btn cfg-btn-soft" onClick={() => setModal("password")}>
                  <Icon name="key" size={16} /> Cambiar contraseña
                </button>
              </Row>
              <Row title="Verificación en dos pasos" desc="Pide un código adicional al iniciar sesión desde un dispositivo nuevo.">
                <Toggle
                  checked={twoFactor}
                  label="Verificación en dos pasos"
                  onChange={() => {
                    setTwoFactor(!twoFactor);
                    notify(twoFactor ? "Verificación en dos pasos desactivada" : "Verificación en dos pasos activada");
                  }}
                />
              </Row>

              <h3 className="cfg-subhead">Sesiones activas</h3>
              <ul className="cfg-sessions">
                {sessions.map((s) => (
                  <li key={s.id}>
                    <span className="cfg-session-icon"><Icon name={s.icon} /></span>
                    <div className="cfg-session-text">
                      <strong>{s.device}</strong>
                      <span>{s.place} · {s.when}</span>
                    </div>
                    {s.current ? (
                      <span className="cfg-chip cfg-chip-ok">Este dispositivo</span>
                    ) : (
                      <button
                        className="cfg-btn cfg-btn-link"
                        onClick={() => {
                          setSessions((list) => list.filter((x) => x.id !== s.id));
                          notify("Sesión cerrada");
                        }}
                      >
                        Cerrar sesión
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* NOTIFICACIONES */}
          {section === "notificaciones" && (
            <>
              <SectionHead title="Notificaciones" desc="Elige qué avisos quieres recibir. Los cambios se guardan al instante." />
              <h3 className="cfg-subhead">Pedidos</h3>
              <Row title="Alertas de nuevos pedidos" desc="Aviso emergente cuando ingresa un pedido web.">
                <Toggle checked={notifs.orderAlerts} onChange={() => toggleNotif("orderAlerts")} label="Alertas de nuevos pedidos" />
              </Row>
              <Row title="Sonido de pedido nuevo" desc="Reproduce un sonido para no perder ningún pedido en cocina.">
                <Toggle checked={notifs.orderSound} onChange={() => toggleNotif("orderSound")} label="Sonido de pedido nuevo" />
              </Row>
              <Row title="Pedidos cancelados" desc="Te avisamos cuando un cliente cancela un pedido en curso.">
                <Toggle checked={notifs.orderCancelled} onChange={() => toggleNotif("orderCancelled")} label="Pedidos cancelados" />
              </Row>

              <h3 className="cfg-subhead">Operación</h3>
              <Row title="Reservas" desc="Recordatorios de reservas nuevas y próximas a llegar.">
                <Toggle checked={notifs.reservations} onChange={() => toggleNotif("reservations")} label="Reservas" />
              </Row>
              <Row title="Inventario bajo" desc="Aviso cuando un producto está por agotarse.">
                <Toggle checked={notifs.lowStock} onChange={() => toggleNotif("lowStock")} label="Inventario bajo" />
              </Row>

              <h3 className="cfg-subhead">Correo</h3>
              <Row title="Reporte semanal" desc="Resumen de ventas y pedidos, cada lunes en tu correo.">
                <Toggle checked={notifs.emailWeekly} onChange={() => toggleNotif("emailWeekly")} label="Reporte semanal" />
              </Row>
            </>
          )}

          {/* PREFERENCIAS */}
          {section === "preferencias" && (
            <>
              <SectionHead title="Preferencias del sistema" desc="Ajusta cómo se muestra la información en el panel." />
              <Row title="Idioma" desc="Idioma de menús y mensajes.">
                <select className="cfg-select" value={prefs.idioma} onChange={setPref("idioma")}>
                  <option value="es">Español</option>
                  <option value="en">English</option>
                </select>
              </Row>
              <Row title="Moneda" desc="Se usa en precios, ventas y reportes.">
                <select className="cfg-select" value={prefs.moneda} onChange={setPref("moneda")}>
                  <option value="COP">Peso colombiano (COP)</option>
                  <option value="USD">Dólar (USD)</option>
                </select>
              </Row>
              <Row title="Formato de hora" desc="Cómo se muestran las horas de pedidos y reservas.">
                <select className="cfg-select" value={prefs.hora} onChange={setPref("hora")}>
                  <option value="12">12 horas (3:30 p. m.)</option>
                  <option value="24">24 horas (15:30)</option>
                </select>
              </Row>
              <Row title="Pantalla de inicio" desc="Lo primero que ves al entrar al panel.">
                <select className="cfg-select" value={prefs.inicio} onChange={setPref("inicio")}>
                  <option value="dashboard">Resumen</option>
                  <option value="pedidos">Pedidos</option>
                  <option value="cocina">Cocina</option>
                </select>
              </Row>
            </>
          )}

          {/* CUENTA */}
          {section === "cuenta" && (
            <>
              <SectionHead title="Cuenta" desc="Acciones sobre tu sesión y tu cuenta." />
              <Row title="Cerrar sesión" desc="Sales de este dispositivo. Tendrás que iniciar sesión de nuevo.">
                <button className="cfg-btn cfg-btn-soft" onClick={() => notify("Sesión finalizada")}>
                  <Icon name="logout" size={16} /> Cerrar sesión
                </button>
              </Row>
              <Row title="Cerrar las demás sesiones" desc="Sales de todos los dispositivos menos de este.">
                <button
                  className="cfg-btn cfg-btn-soft"
                  onClick={() => {
                    setSessions((list) => list.filter((s) => s.current));
                    notify("Se cerraron las demás sesiones");
                  }}
                >
                  Cerrar las demás
                </button>
              </Row>
              <div className="cfg-danger">
                <div>
                  <strong>Eliminar cuenta</strong>
                  <p>Borra de forma permanente tu acceso, permisos y registros. No se puede deshacer.</p>
                </div>
                <button className="cfg-btn cfg-btn-danger-outline" onClick={() => setModal("delete")}>
                  <Icon name="trash" size={16} /> Eliminar cuenta
                </button>
              </div>
            </>
          )}
        </main>
      </div>

      {/* ───── Modales ───── */}
      {modal === "edit" && (
        <EditProfileModal
          data={userData}
          onClose={() => setModal(null)}
          onSave={(form) => {
            setUserData({ ...userData, ...form });
            setModal(null);
            notify("Datos actualizados");
          }}
        />
      )}
      {modal === "avatar" && (
        <AvatarModal
          current={userData.avatar}
          name={userData.nombre}
          onClose={() => setModal(null)}
          onSave={(url) => {
            setUserData({ ...userData, avatar: url });
            setModal(null);
            notify("Foto actualizada");
          }}
          onRemove={() => {
            setUserData({ ...userData, avatar: null });
            setModal(null);
            notify("Foto eliminada");
          }}
        />
      )}
      {modal === "password" && (
        <PasswordModal
          onClose={() => setModal(null)}
          onSave={() => {
            setModal(null);
            notify("Contraseña actualizada");
          }}
        />
      )}
      {modal === "delete" && (
        <DeleteModal
          onClose={() => setModal(null)}
          onConfirm={() => {
            setModal(null);
            notify("Cuenta eliminada"); // TODO: llamar a tu API y redirigir al login
          }}
        />
      )}

      {/* ───── Toast ───── */}
      {toast && (
        <div className={`cfg-toast ${toast.type === "error" ? "is-error" : ""}`} role="status" key={toast.id}>
          <Icon name="check" size={16} />
          {toast.msg}
        </div>
      )}
    </div>
  );
}