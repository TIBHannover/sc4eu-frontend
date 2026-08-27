# AGENTS.md

## Architecture

Two-package repo in a single directory:

- `src/` — React 17 SPA (built with `react-scripts`)
- `server/` — Express middleware server that handles OAuth logins and serves the built React bundle

Both packages have separate `package.json` and separate `.env` files. Dependencies must be installed in both.

The app is served under the `/ocp` path prefix everywhere (React router basename, Express router mount point).

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
| Tests | `npm test` |
| Start server only | `npm start` inside `server/` |
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

React env vars must be prefixed `REACT_APP_`. They are injected at **build time** by `react-scripts`. Changing them requires a rebuild.

Key root `.env` vars: `REACT_APP_PUBLIC_URL`, `REACT_APP_EXPRESS_BACKEND_URL`, `REACT_APP_API_URL`, `REACT_APP_DISABLE_REGISTER_AND_OAUTH`.

Key `server/.env` vars: OAuth credentials (GitHub, GitLab, Google, SAP), `JWT_SECRET`, `APPLICATION_PORT`, `CALLBACK_URL`, `REDIRECT_URL`, `BACKEND_SERVER_URL`.

## CI

GitHub Actions (`build.yml`) runs a SonarQube scan on push to `main` and on PRs. No build or test step in CI — only static analysis.
