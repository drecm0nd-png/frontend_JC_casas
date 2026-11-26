import { createContext } from "react";

// Clave donde se guardan los datos del perfil en el navegador
export const PROFILE_STORAGE_KEY = "cfg:userData";

// Datos por defecto (mientras no haya backend)
export const DEFAULT_USER_DATA = {
  nombre: "Felipe Galeano",
  correo: "exampleCorreo@gmail.com",
  telefono: "+57 300 123 4567",
  rol: "Administrador General",
  restaurante: "Mi Restaurante",
  sucursal: "Sede Principal",
  miembroDesde: "Marzo de 2025",
  avatar: null,
};

export const ProfileContext = createContext(null);
