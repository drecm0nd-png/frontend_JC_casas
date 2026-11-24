# AGENTS.md

## Commands
- Scripts are only `dev`, `build`, `preview`, `lint`. There is no test or typecheck script; this is plain JS React + Vite, not TypeScript.
- Verify with `npm run build` (passes). `npm run lint` has a pre-existing failing baseline: 13 `no-unused-vars` errors (mostly unused `React` imports). Check the baseline before blaming your change.
- ESLint is flat-config (`eslint.config.js`) covering `**/*.{js,jsx}` and ignoring only `dist`; it includes React Hooks recommended + `react-refresh/vite` rules.

## Where the app actually runs
- `index.html` → `src/main.jsx` (`BrowserRouter` → `AuthProvider` → `App`) → `src/App.jsx` → `src/Routes/AppRoutes.jsx`.
- `App.jsx` renders Sidebar + Header + Footer around every route *except* `/`; `/login` and `/registro` still keep that shell.
- `/dashboard` is the only route wrapped in `ProtectedRoute`. `/panel` is a single route driven by `?tab=inventario|pedidos|permisos|impresion` (search params), not nested routes; Header links use that convention.
- The landing is fully under `src`: page in `src/Pages/Home/`, pieces in `src/Components/Landing/*`, styles in `src/Styles/LandingGlobal.css` + `LandingVariables.css`, assets in `src/assets/landing/`, scroll helper in `src/Utils/ScrollToSection.js`. Its header/footer replace the global shell on `/`.

## Data and state are mocked
- No backend calls exist: no `fetch`/axios/env config. `src/Services/Api.js`, `AuthService.js`, `UserService.js` and `src/Hooks/UseFetch.js` are empty placeholders.
- Auth is in-memory only: `AuthProvider` stores the user in `useState`; Login derives the name from any email and ignores the password. Reloading logs the user out.
- Ordering is disconnected: `LunchBuilder` keeps selections in its own state then navigates to `/car`; `Car` initializes hardcoded cart items and uses `alert()` for payment. Changing one does not update the other.
- Menu options are hard-coded arrays duplicated in `src/Pages/Menu/Menu.jsx` and `src/Components/LunchBuilder/LunchBuilder.jsx`; price/option edits usually need both.

## Asset gotchas
- Login and SignUp use literal `/src/assets/...` image URLs. Vite leaves these strings unchanged in the production bundle (verified), so they 404 outside dev. Prefer imported assets as used elsewhere, e.g. `import logo from "../../assets/img/logo.png"`.
- `index.html` references `/favicon.svg`, but no favicon file exists in the repo.
