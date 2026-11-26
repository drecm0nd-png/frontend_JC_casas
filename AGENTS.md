# AGENTS.md

## Commands
- Scripts: `dev`, `build`, `preview`, `lint` (no tests or typecheck configured). No `.env` required.
- `npm run build` succeeds. `npm run lint` (`eslint .`) has a baseline of 10 errors (8 `no-unused-vars` and 2 `react-hooks/set-state-in-effect` in `src/App.jsx:30` and `src/Components/Header/Header.jsx:48`). Do not worsen this count.
- `eslint.config.js`: flat config covering `**/*.{js,jsx}`, ignoring only `dist`; includes react-hooks (strict new rules) + react-refresh.

## Architecture & Routing
- Chain: `index.html` → `src/main.jsx` (`BrowserRouter` → `AuthProvider` → `App`) → `src/App.jsx` → `src/Routes/AppRoutes.jsx`.
- Global Guard in `App.jsx`: If unauthenticated and route is not in `PUBLIC_UNAUTH_ROUTES` (`/`, `/inicio`, `/configuracion`, `/config`, `/login`, `/registro`), redirects to `/`. Note that routes like `/menu`, `/car`, `/pedidos`, `/perfil` require authentication even if they don't use `ProtectedRoute`.
- Layout: `App.jsx` renders `Sidebar` + `Header` + `Footer` except on `/`. On `/login` and `/registro`, Header and Footer are hidden, and Sidebar acts as a collapsible drawer. After login, navigates to saved destination (`location.state.from` or `/`).
- Panel (`/panel`): Single route controlled via `?tab=inventario|pedidos|permisos|impresion` (`src/Pages/Panel/Panel.jsx`, default `inventario`).

## State & Data
- Frontend-only: `src/Services/Api.js`, `AuthService.js`, `UserService.js`, and `src/Hooks/UseFetch.js` are currently empty stubs (0 bytes); no backend/fetch/axios/env config.
- Auth: In-memory (`src/Context/AuthProvider.jsx`); Login accepts any non-empty email/password.
- Dark theme: Applied via `localStorage["jcasas:config_state"]` in an `App.jsx` effect (`dark-mode` class + `data-theme` on `<html>`).

## Gotchas & Assets
- `Login` and `SignUp` use literal paths `/src/assets/...` (unimported), which cause 404s in production builds outside dev.
- `index.html` references `/favicon.svg` (missing) and loads Roboto via Google Fonts (requires runtime network).
