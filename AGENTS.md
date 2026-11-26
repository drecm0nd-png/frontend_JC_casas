## Developer Commands

- `npm run dev` — starts Vite dev server
- `npm run build` — produces production build (passes)
- `npm run lint` — runs ESLint (`eslint .`); **baseline of unused-vars / react-hooks errors** (do not worsen the count; currently ~9–10 `no-unused-vars` and some `react-hooks/set-state-in-effect`)
- `npm run preview` — locally preview the production build
- No tests or typecheck configured. No `.env` required.

## Architecture & Routing

- Chain: `index.html` → `src/main.jsx` (`BrowserRouter` → `AuthProvider` → `App`) → `src/App.jsx` → `src/Routes/AppRoutes.jsx`.
- **App.jsx** is the root shell: renders `Sidebar` + `Header` + `Footer` + routes (except on landing `/`).
- **Landing `/`**: no Sidebar/Header/Footer.
- On `/login` and `/registro`: Header and Footer are hidden; Sidebar acts as a collapsible drawer.
- After login, navigates to saved destination (`location.state.from`) or `/`.
- **Global guard** in `App.jsx`: if unauthenticated and route is **not** in `PUBLIC_UNAUTH_ROUTES` (`/`, `/inicio`, `/configuracion`, `/config`, `/login`, `/registro`), redirects to `/`.  
  Routes like `/menu`, `/car`, `/pedidos`, `/perfil` therefore require authentication even if they do not use `ProtectedRoute`.
- **ProtectedRoute** additionally guards `/dashboard` (unauthenticated → `/login`).
- **Panel `/panel`**: single route controlled via `?tab=inventario|pedidos|permisos|impresion` (`src/Pages/Panel/Panel.jsx`, default `inventario`).

## State & Data

- **Frontend-only / no backend yet**:
  - `src/Services/Api.js`, `AuthService.js`, `UserService.js`, and `src/Hooks/UseFetch.js` are empty stubs (no fetch/axios/env config).
- **Auth**: in-memory only (`src/Context/AuthProvider.jsx` with `useState`). Login accepts any non-empty email + password.
- **Carro state** (`useCarState.js`): fully hardcoded (`INITIAL_ITEMS`, `INITIAL_PENDING`, `INITIAL_HISTORY`); does **not** sync with backend or LunchBuilder. Payment confirmation/cancellation still use `alert()`.
- **Persistence (localStorage)**:
  - Theme / dark mode under key `jcasas:config_state` (applied via `dark-mode` class + `data-theme` on `<html>` in an `App.jsx` effect).
  - Profile tabs under `cfg:section` (via `useProfileState.js`).
  - User preferences, two-factor, sessions, and notifications via `usePersistentState`.
- **Menu duplication**: options are defined in both `src/Pages/Menu/Menu.jsx` and `src/Components/LunchBuilder/LunchBuilder.jsx` — keep them in sync manually.

## Assets & Gotchas

- **Login and SignUp** use literal paths like `/src/assets/...` / `/src/assets/img/logo.png` (no `import`). Vite does **not** hash these → **404 in production** outside of dev. Prefer proper `import` or files under `public/`.
- `index.html` references `/favicon.svg` (missing) and loads Roboto via Google Fonts (requires network at runtime).

## Linting

- ESLint flat config (`eslint.config.js`) covers `**/*.{js,jsx}`, ignoring only `dist`.
- Includes `react-hooks` (strict) + `react-refresh`.
- Do not introduce new lint errors beyond the current baseline.