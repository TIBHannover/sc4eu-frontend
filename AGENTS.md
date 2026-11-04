# AGENTS.md

## Architecture

Two-package repo in a single directory:

- `src/` — React 17 SPA (built with Rsbuild/Rspack, see `rsbuild.config.mjs`; migrated from CRA `react-scripts`)
- `server/` — Express 5 server (ESM, Node ≥ 22): logins, the only access path from the browser to the backend services, and serving the built React bundle

Both packages have separate `package.json` and separate `.env` files. Dependencies must be installed in both.

The app is served under the path prefix from `REACT_APP_PUBLIC_URL` (e.g. `/ocp`): React router basename, Rsbuild asset prefix, Express mount point.

## Server (`server/`)

The Python backend (Flask + FastAPI) and the processing service have **no authentication of their own** and must not be exposed publicly. The Express server is the security boundary: it verifies the login JWT, checks roles, and passes the user's identity (`userId`, `token` = backend bToken) taken from the JWT — never from the client.

| Path | Purpose |
|---|---|
| `index.js` / `app.js` | Bootstrap (`lib/loadEnv.js` must be imported first) / Express app |
| `config.js` | All environment-derived settings |
| `proxy/routes.js` | **Route table**: every pass-through route with upstream mapping and auth level (`public`, `login`, `[roles]`, `{ selfOr: [roles] }`). Add new backend endpoints here. |
| `proxy/proxy.js` | Generic handler for the route table |
| `routes/*.js` | Routes with own logic: `account.js` (register, e-mail login/verification, password reset, project-access e-mail), `oauth.js`, `ontology.js` (visualisation, Widoco), `events.js` (SSE + GitHub webhook), `status.js` |
| `lib/auth.js` | `requireLogin`, `requireRole`, `authMiddleware` |
| `lib/tokens.js` | All JWTs; each has a `purpose` (`login`, `email-verify`, `password-reset`) so they are not interchangeable |
| `lib/upstream.js` | HTTP client for the backend services (`node:http`; some backend GET endpoints need a JSON body) |

Error responses keep the historical API contract: HTTP 200 with `{ "error": ... }` (missing token: `{"error":"No Token Provided"}`).

## Setup

1. Install both packages:
   ```sh
   sh install_dependencies.sh
   # equivalent to: npm install && (cd server && npm install)
   ```

2. Create root `.env` from `.env.example`.

3. Create `server/.env` from `server/.env.example`.

Both `.env` files are required; the server will not start correctly without `server/.env`.

## Commands

Run from the repo root unless noted.

| Purpose | Command |
|---|---|
| Build React + start Express | `npm start` (runs `npm run build && (cd server && npm start)`) |
| Dev server (hot reload, React only) | `npm run start_client` (note underscore, not hyphen) |
| Production build only | `npm run build` |
| Lint | `npm run lint` |
| Lint with autofix | `npm run lint:fix` |
| Preview production build | `npm run preview` |
| Start server only (restarts on changes) | `npm start` inside `server/` |
| Bundle analysis | `npm run analyze` |
| Generate docs | `npm run docs` |

`npm run start-client` (hyphen) does **not** exist — the script is `start_client` (underscore).

The server starts on port `9000` by default (set via `APPLICATION_PORT` in `server/.env`).

## Code Style

- Prettier enforced: `printWidth: 150`, `singleQuote: true`, `tabWidth: 4`
- Pre-commit hook (husky + lint-staged) runs `eslint --fix` then `git add` on `src/**/*.{js,jsx}`
- ESLint rules enforce: `react/prop-types`, `import/no-anonymous-default-export` (named arrow functions and objects allowed), `prefer-const`, `no-var`, JSX formatting rules

All components must declare `PropTypes`.

## Module Resolution

`jsconfig.json` sets `baseUrl: "src"` — imports resolve from `src/` without relative paths. E.g. `import Foo from 'components/Foo'` resolves to `src/components/Foo`.

## State Management

Redux with `redux-thunk`, `connected-react-router`, and `redux-persist` (8-hour TTL, `auth` slice excluded from persistence). Redux DevTools are enabled when the browser extension is present.

## Environment Variables

React env vars must be prefixed `REACT_APP_`. They are injected at **build time** by Rsbuild (`loadEnv` + `source.define` in `rsbuild.config.mjs`). Changing them requires a rebuild. `NODE_ENV` in `.env` is ignored; the mode comes from the command (`rsbuild dev` / `rsbuild build`).

Key root `.env` vars: `REACT_APP_PUBLIC_URL`, `REACT_APP_EXPRESS_BACKEND_URL`, `REACT_APP_API_URL`, `REACT_APP_DISABLE_REGISTER_AND_OAUTH`.

Key `server/.env` vars: OAuth credentials (GitHub, GitLab, Google, SAP, LinkedIn), `JWT_SECRET`, `APPLICATION_PORT`, `CALLBACK_URL`, `REDIRECT_URL`, `BACKEND_SERVER_URL`, `BACKEND_FASTAPI_SERVER_URL`, `PROCESSING_SERVER_URL`, `MAIL_*`. `server/.env` is loaded with `process.loadEnvFile`; variables already set (docker compose) take precedence.

## CI

GitHub Actions (`build.yml`) runs a SonarQube scan on push to `main` and on PRs. No build or test step in CI — only static analysis.
