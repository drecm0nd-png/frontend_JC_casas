import { useState, useEffect, useRef } from "react";
import {
  EMAIL_RE,
  MAX_IMG_MB,
  getInitials,
  getStrength,
  fileToDataUrl
} from "../../../../Hooks/useProfileState";
import { ProfileIcon } from "../ProfileIcons";
import "./ProfileModals.css";

const STRENGTH_LABELS = ["Muy débil", "Débil", "Aceptable", "Buena", "Fuerte"];

function Modal({ title, onClose, children }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="cfg-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="cfg-modal" role="dialog" aria-modal="true" aria-label={title}>
        <div className="cfg-modal-head">
          <h3>{title}</h3>
          <button type="button" className="cfg-icon-btn" onClick={onClose} aria-label="Cerrar">
            <ProfileIcon name="x" />
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
          <ProfileIcon name={show ? "eyeOff" : "eye"} />
        </button>
      </span>
      {error && <span className="cfg-field-error">{error}</span>}
    </label>
  );
}

function EditProfileModal({ data, onSave, onClose }) {
  const [form, setForm] = useState({
    nombre: data.nombre,
    correo: data.correo,
    telefono: data.telefono,
    restaurante: data.restaurante,
    sucursal: data.sucursal
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
          <button type="button" className="cfg-btn cfg-btn-ghost" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className="cfg-btn cfg-btn-dark">
            Guardar cambios
          </button>
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
            <img
              src={preview}
              alt=""
              onError={() => {
                setError("No pudimos cargar esa imagen. Revisa el enlace.");
                setPreview("");
              }}
            />
          ) : (
            <span>{getInitials(name)}</span>
          )}
        </div>

        <div
          className={`cfg-drop ${dragging ? "is-over" : ""}`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            loadFile(e.dataTransfer.files[0]);
          }}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
        >
          <ProfileIcon name="upload" size={22} />
          <strong>Arrastra una imagen o haz clic para elegirla</strong>
          <span>JPG, PNG o WebP · máximo {MAX_IMG_MB} MB</span>
          <input ref={inputRef} type="file" accept="image/*" hidden onChange={(e) => loadFile(e.target.files[0])} />
        </div>

        <TextField
          label="O pega el enlace de una imagen"
          type="url"
          placeholder="https://ejemplo.com/mi-foto.jpg"
          value={url}
          onChange={onUrl}
        />
        {error && (
          <p className="cfg-field-error" role="alert">
            {error}
          </p>
        )}
      </div>

      <div className="cfg-modal-actions cfg-spread">
        <button type="button" className="cfg-btn cfg-btn-link" onClick={onRemove} disabled={!current}>
          Quitar foto
        </button>
        <div className="cfg-inline">
          <button type="button" className="cfg-btn cfg-btn-ghost" onClick={onClose}>
            Cancelar
          </button>
          <button
            type="button"
            className="cfg-btn cfg-btn-dark"
            disabled={!preview || preview === current}
            onClick={() => onSave(preview)}
          >
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
    if (Object.keys(err).length === 0) onSave(p);
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
          <button type="button" className="cfg-btn cfg-btn-ghost" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className="cfg-btn cfg-btn-dark">
            Actualizar contraseña
          </button>
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
        <button type="button" className="cfg-btn cfg-btn-ghost" onClick={onClose}>
          Cancelar
        </button>
        <button type="button" className="cfg-btn cfg-btn-danger" disabled={text !== "ELIMINAR"} onClick={onConfirm}>
          Eliminar mi cuenta
        </button>
      </div>
    </Modal>
  );
}

export default function ProfileModals({
  modal,
  userData,
  onClose,
  onSaveProfile,
  onSaveAvatar,
  onRemoveAvatar,
  onSavePassword,
  onConfirmDelete
}) {
  if (!modal) return null;

  return (
    <>
      {modal === "edit" && (
        <EditProfileModal data={userData} onClose={onClose} onSave={onSaveProfile} />
      )}
      {modal === "avatar" && (
        <AvatarModal
          current={userData.avatar}
          name={userData.nombre}
          onClose={onClose}
          onSave={onSaveAvatar}
          onRemove={onRemoveAvatar}
        />
      )}
      {modal === "password" && (
        <PasswordModal onClose={onClose} onSave={onSavePassword} />
      )}
      {modal === "delete" && (
        <DeleteModal onClose={onClose} onConfirm={onConfirmDelete} />
      )}
    </>
  );
}