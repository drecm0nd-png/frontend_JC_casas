# AGENTS.md

## Developer Commands

- `npm run dev` — starts Vite dev server
- `npm run build` — produces production build (passes)
- `npm run lint` — runs ESLint; **9 `no-unused-vars` errors are the current baseline**, do not fix unless adding new code
- `npm run preview` — locally preview the production build

## Architecture

- **App.jsx** is the root: renders `BrowserRouter` → `AuthProvider` → `Sidebar` + `Header` + `Footer` + `AppRoutes`. Sidebar/drawer only appears on `/` and auth pages; on other routes the shell is fixed.
- **Auth is in-memory only**: `src/Context/AuthProvider.jsx` uses `useState`; there is **no backend API integration** yet. `src/Services/Api.js`, `AuthService.js`, `UserService.js` are **empty**.
- **ProtectedRoute** only guards `/dashboard`; unauthenticated users are redirected to `/login`.
- **`/panel`** route uses `?tab=inventario|pedidos|permisos|impresion` query parameter (default: `inventario`).
- **Landing page (`/`)** is separate from the app shell — no Sidebar/Header/Footer are rendered.
- **Login** accepts any non-empty email + password credentials (temporary, no backend validation yet).
- **Carro state** (`useCarState.js`) is fully hardcoded (`INITIAL_ITEMS`, `INITIAL_PENDING`, `INITIAL_HISTORY`) and does **not** sync with any backend or with LunchBuilder.

## State & Data

- **Empty services**: `src/Services/Api.js`, `src/Hooks/UseFetch.js` are empty — no fetch/axios configured.
- **Profile & theme persist in localStorage**:
  - Theme (`darkMode`) saved under key `jcasas:config_state` and applied to `documentElement`.
  - Profile tabs saved under key `cfg:section` (via `useProfileState.js`).
  - User preferences, two-factor, sessions, and notifications also persisted via `usePersistentState`.
- **Menu duplication**: options are defined in both `src/Pages/Menu/Menu.jsx` and `src/Components/LunchBuilder/LunchBuilder.jsx` — keep them in sync manually.
- **Alert() calls** in carro: payment confirmation and cancellation use `alert()` (not toast notifications).

## Assets & Gotchas

- **Login and SignUp use literal asset URLs** like `/src/assets/img/logo.png` (no actual `import` statement). Vite does **not** hash these in production → they will **404 outside of development**.
- **`index.html`** references `/favicon.svg` which **does not exist** in the repo.
- Asset paths in JSX should use proper `import` or be relative to `public/` if they must be literal URLs.

## Linting

- ESLint flat config applies to `**/*.{js,jsx}`, ignoring only `dist`.
- Includes `react-hooks` and `react-refresh` plugins.
- 9 `no-unused-vars` errors are the established baseline.