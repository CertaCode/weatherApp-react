# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project layout

Two independent npm packages in one repo, each with its own `node_modules` and `package-lock.json`:

- `frontend/` — React 19 + Vite SPA (plain JSX, no TypeScript, no router)
- `server/` — Express 5 API that proxies WeatherAPI.com so the API key never reaches the browser

Both use ES modules (`"type": "module"`).

## Commands

Run each in its own terminal:

```bash
cd server && npm run dev      # API on http://localhost:3000 (node --watch src/server.js)
cd frontend && npm run dev    # Vite dev server on http://localhost:5173
```

Frontend only:

```bash
npm run lint      # ESLint (flat config, eslint.config.js)
npm run build     # production build to frontend/dist
npm run preview   # serve the build
```

There is no test framework set up in either package.

Known broken scripts (don't rely on them):
- `server` `npm start` runs `node index.js`, but there is no `index.js`; the entry point is `src/server.js`.
- `frontend` `npm run dev:server` uses `--prefix server`, which resolves to `frontend/server` (doesn't exist), not `../server`.

## Environment

`server/.env` (git-ignored) is loaded via `dotenv` in `server/src/config/env.js`. The server throws on startup if a required variable is missing.

- `WEATHER_API_KEY` (required)
- `WEATHER_API_URL` (required): the full WeatherAPI endpoint URL (currently the forecast endpoint, called with `days: 1, aqi: "yes"`)
- `PORT` (default `3000`)
- `CLIENT_ORIGIN` (default `http://localhost:5173`, used for CORS)

## Architecture

### Request flow

Browser → `frontend/src/services/api.js` (axios, `baseURL: "/api"`) → Vite dev proxy (`/api` → `localhost:3000`, see `vite.config.js`) → Express.

On the server, a request passes through `app.js` (helmet → cors → json → rate limit of 60 req/min on `/api`) → `routes/*.routes.js` → validation middleware → `controllers/` → `services/` → WeatherAPI.

- **Services** call the provider and map its response into the app's own shape. The frontend depends on this mapped shape (e.g. `{ city, temperature, realFeel, wind, windGust, airQuality }`), not on WeatherAPI's raw fields. When adding a field, change the service's return object first, then the UI.
- **Errors**: throw `AppError(status, message)` from `utils/AppError.js`. Express 5 forwards thrown and rejected errors from async handlers automatically, so controllers have no try/catch. `middleware/errorHandler.js` returns `{ error: message }` for an `AppError` and a generic 500 for anything else. Provider 400 is mapped to 404 "City not found"; other provider failures become 502.
- **Validation** middleware stores cleaned input on `res.locals` (e.g. `res.locals.city`) for the controller to read.
- `notFound` and `errorHandler` must stay registered last in `app.js`.

Current endpoints: `GET /health`, `GET /api/weather/current?city=...`.

### Frontend

- **Navigation** has no router. `App.jsx` holds `page` state (`"today" | "hourly" | "7days"`) and conditionally renders a page from `pages/`. `Navbar` receives `activePage`/`onNavigate`.
- **Structure**: `pages/` composes `features/weather/` components; `components/layout` and `components/ui` (Card, Carousel) are generic. Each component imports its own co-located `.css` file (plain CSS, no CSS modules or Tailwind).
- **Data fetching**: the pattern is service function (`services/weatherService.js`) → custom hook (`hooks/useWeather.js`) → component. `useWeather` tracks which city the stored result belongs to, so `loading` is derived and stale results are hidden. It uses an `AbortController` on city change, and the component renders the `{ error }` message from the server.
- **Migration in progress**: only `CurrentWeather` uses live API data (city hardcoded as `"Hamburg"`). `Forecast`, `HourlyWeather`, `TodaysWeather`, `HourlyPage` and `DailyPage` still render hardcoded arrays. Recent work follows the pattern "add server endpoint/field → wire it into the client".
- `weatherService.getCurrentWeather` doesn't currently accept or forward the abort `signal` that `useWeather` passes, so requests aren't actually cancelled.
- Vite defines an `@` → `frontend/src` alias, but existing code uses relative imports.
- ESLint includes `eslint-plugin-react`, so prop-types validation applies; components use `prop-types`.

## Conventions

Commits use Conventional Commits with scopes `client` and `server`, e.g. `feat(server): add current weather endpoint`, `feat(client): ...`, `fix(...)`, `refactor(...)`, `chore(deps-dev): ...`.

## Agent skills

### Issue tracker

Issues are tracked in GitHub Issues (CertaCode/weatherApp-react) via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Uses the five default triage labels (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one root `CONTEXT.md` plus `docs/adr/`, both created lazily. See `docs/agents/domain.md`.
