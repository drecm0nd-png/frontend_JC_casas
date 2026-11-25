# AGENTS.md

## Comandos
- Scripts: `dev`, `build`, `preview`, `lint` (no hay test ni typecheck).
- `npm run build` pasa. `npm run lint` falla con 9 errores `no-unused-vars` actuales: esa es la línea base.
- `eslint.config.js`: flat config sobre `**/*.{js,jsx}`, ignora solo `dist`; incluye react-hooks + react-refresh.

## App y arquitectura
- Cadena: `index.html` → `src/main.jsx` (`BrowserRouter` → `AuthProvider` → `App`) → `src/App.jsx` → `src/Routes/AppRoutes.jsx`.
- `App.jsx` muestra `Sidebar` + `Header` + `Footer` salvo en `/`; no muestra shell en `/login` ni `/registro`; tras login navega a `/` y el Sidebar aparece pasando el cursor por la esquina.
- `ProtectedRoute` solo protege `/dashboard`; redirige a `/login`.
- `/panel` es una sola ruta dirigida por `?tab=inventario|pedidos|permisos|impresion` (`src/Pages/Panel/Panel.jsx`); `Header` usa esa convención en sus links.
- Landing en `/`: `src/Pages/Home/` + `src/Components/Landing/*` + `src/Styles/LandingGlobal.css`.

## Estado y datos
- Sin backend: `src/Services/Api.js`, `AuthService.js`, `UserService.js` y `src/Hooks/UseFetch.js` están vacíos; no hay fetch/axios ni env config.
- Auth en memoria (`src/Context/AuthProvider.jsx`); en `Login` los campos email + contraseña son obligatorios y acepta cualquier credencial no vacía (temporal, sin validación del backend todavía); tras login navega a `destination`.
- Carro: `src/Hooks/useCarState.js`, con datos hardcodeados (`INITIAL_ITEMS`, `INITIAL_PENDING`, `INITIAL_HISTORY`) y `alert()` en pago/cancelación. No sincroniza con LunchBuilder.
- Menú: opciones duplicadas en `src/Pages/Menu/Menu.jsx` y `src/Components/LunchBuilder/LunchBuilder.jsx`.

## Gotchas de assets
- `Login` y `SignUp` usan URLs literales `/src/assets/...` (sin import). En producción Vite no las hashea → 404 fuera de desarrollo.
- `index.html` referencia `/favicon.svg`, que no existe en el repo.
