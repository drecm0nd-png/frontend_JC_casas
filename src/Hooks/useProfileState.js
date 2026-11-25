import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

export const PROFILE_SECTIONS = [
  { id: "perfil", label: "Perfil", icon: "user" },
  { id: "seguridad", label: "Seguridad", icon: "shield" },
  { id: "notificaciones", label: "Notificaciones", icon: "bell" },
  { id: "preferencias", label: "Preferencias", icon: "sliders" },
  { id: "cuenta", label: "Cuenta", icon: "alert" }
];

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Nombre: solo letras (con tildes y ñ) y un espacio entre palabras. Sin números ni símbolos.
export const NAME_RE = /^\p{L}+(?: \p{L}+)*$/u;

// Limpia lo que escribe el usuario: borra todo lo que no sea letra o espacio
export const cleanName = (value = "") =>
  value.replace(/[^\p{L} ]/gu, "").replace(/ {2,}/g, " ").replace(/^ /, "");
export const MAX_IMG_MB = 2;

export function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

export function getStrength(p = "") {
  let s = 0;
  if (p.length >= 8) s++;
  if (/[a-z]/.test(p) && /[A-Z]/.test(p)) s++;
  if (/\d/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  return s;
}

export function fileToDataUrl(file, max = 256) {
  return new Promise((resolve, reject) => {
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
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Canvas no disponible"));
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function usePersistentState(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved === null) return initial;
      const parsed = JSON.parse(saved);
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
      // Ignorado si localStorage no está disponible
    }
  }, [key, value]);

  return [value, setValue];
}

export function useProfileState() {
  const location = useLocation();
  const [section, setSection] = usePersistentState("cfg:section", "perfil");

  const [userData, setUserData] = usePersistentState("cfg:userData", {
    nombre: "Felipe Galeano",
    correo: "exampleCorreo@gmail.com",
    telefono: "+57 300 123 4567",
    rol: "Administrador General",
    restaurante: "Mi Restaurante",
    sucursal: "Sede Principal",
    miembroDesde: "Marzo de 2025",
    avatar: null
  });

  const [twoFactor, setTwoFactor] = usePersistentState("cfg:twoFactor", false);
  const [sessions, setSessions] = usePersistentState("cfg:sessions", [
    { id: 1, device: "Chrome en Windows", place: "Bogotá, Colombia", when: "Esta sesión", icon: "laptop", current: true },
    { id: 2, device: "Safari en iPhone", place: "Bogotá, Colombia", when: "Hace 2 horas", icon: "phone" },
    { id: 3, device: "Tablet de cocina", place: "Soacha, Colombia", when: "Hace 1 día", icon: "laptop" }
  ]);

  const [notifs, setNotifs] = usePersistentState("cfg:notifs", {
    emailWeekly: true,
    orderAlerts: true,
    orderSound: true,
    orderCancelled: true,
    lowStock: false,
    reservations: true
  });

  const [prefs, setPrefs] = usePersistentState("cfg:prefs", {
    idioma: "es",
    moneda: "COP",
    hora: "12",
    inicio: "dashboard"
  });

  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null);

  const notify = (msg, type = "ok") => setToast({ msg, type, id: Date.now() });

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    const stateTab = location.state?.tab;
    const params = new URLSearchParams(location.search);
    const queryTab = params.get("tab");
    const targetTab = stateTab || queryTab;

    if (targetTab && PROFILE_SECTIONS.some((s) => s.id === targetTab)) {
      setSection(targetTab);
    }
  }, [location.state, location.search, setSection]);

  useEffect(() => {
    const syncFromNavigation = () => {
      const stateTab = window.history.state?.usr?.tab;
      const params = new URLSearchParams(window.location.search);
      const queryTab = params.get("tab");
      const targetTab = stateTab || queryTab;

      if (targetTab && PROFILE_SECTIONS.some((s) => s.id === targetTab)) {
        setSection(targetTab);
      }
    };

    const onTabChange = (e) => {
      if (e.detail && PROFILE_SECTIONS.some((s) => s.id === e.detail)) {
        setSection(e.detail);
      }
    };

    window.addEventListener("cfg:tab-change", onTabChange);
    window.addEventListener("popstate", syncFromNavigation);
    return () => {
      window.removeEventListener("cfg:tab-change", onTabChange);
      window.removeEventListener("popstate", syncFromNavigation);
    };
  }, [setSection]);

  const checklist = useMemo(
    () => [
      { done: !!userData.avatar, hint: "Agrega una foto de perfil", action: () => setModal("avatar") },
      { done: userData.nombre.trim().length > 2, hint: "Escribe tu nombre completo", action: () => setModal("edit") },
      { done: EMAIL_RE.test(userData.correo), hint: "Agrega un correo válido", action: () => setModal("edit") },
      { done: userData.telefono.replace(/\D/g, "").length >= 10, hint: "Agrega un teléfono de contacto", action: () => setModal("edit") },
      { done: !!userData.restaurante.trim(), hint: "Indica el nombre de tu restaurante", action: () => setModal("edit") },
      { done: twoFactor, hint: "Activa la verificación en dos pasos", action: () => setSection("seguridad") }
    ],
    [userData, twoFactor, setSection]
  );

  const percent = Math.round((checklist.filter((c) => c.done).length / checklist.length) * 100);
  const nextStep = checklist.find((c) => !c.done);

  const toggleNotif = (key) => {
    setNotifs((n) => ({ ...n, [key]: !n[key] }));
    notify("Preferencia guardada");
  };

  const setPref = (key) => (e) => {
    setPrefs((p) => ({ ...p, [key]: e.target.value }));
    notify("Preferencia guardada");
  };

  const closeSession = (id) => {
    setSessions((list) => list.filter((x) => x.id !== id));
    notify("Sesión cerrada");
  };

  const closeOtherSessions = () => {
    setSessions((list) => list.filter((s) => s.current));
    notify("Se cerraron las demás sesiones");
  };

  const toggleTwoFactor = () => {
    setTwoFactor(!twoFactor);
    notify(twoFactor ? "Verificación en dos pasos desactivada" : "Verificación en dos pasos activada");
  };

  return {
    section,
    setSection,
    userData,
    setUserData,
    twoFactor,
    toggleTwoFactor,
    sessions,
    closeSession,
    closeOtherSessions,
    notifs,
    toggleNotif,
    prefs,
    setPref,
    modal,
    setModal,
    toast,
    notify,
    percent,
    nextStep
  };
}