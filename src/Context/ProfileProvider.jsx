import { useEffect, useState } from "react";
import {
  ProfileContext,
  DEFAULT_USER_DATA,
  PROFILE_STORAGE_KEY,
} from "./ProfileContext.jsx";

function loadUserData() {
  try {
    const saved = localStorage.getItem(PROFILE_STORAGE_KEY);
    return saved ? { ...DEFAULT_USER_DATA, ...JSON.parse(saved) } : DEFAULT_USER_DATA;
  } catch {
    return DEFAULT_USER_DATA;
  }
}

// Guarda los datos del perfil UNA sola vez para toda la app:
// Perfil, Header, dropdown, etc. leen y escriben aquí, así siempre están sincronizados.
export function ProfileProvider({ children }) {
  const [userData, setUserData] = useState(loadUserData);

  // Guardar cada vez que cambian
  useEffect(() => {
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(userData));
    } catch {
      // Ignorado si localStorage no está disponible
    }
  }, [userData]);

  // Si se cambia el perfil en otra pestaña, se actualiza aquí también
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === PROFILE_STORAGE_KEY) setUserData(loadUserData());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <ProfileContext.Provider value={{ userData, setUserData }}>
      {children}
    </ProfileContext.Provider>
  );
}
