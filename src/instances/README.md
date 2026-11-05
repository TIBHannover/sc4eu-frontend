# Instances

One folder per deployment of the portal (e.g. `default`, `vdst`). A folder holds only what differs from `default/`:
`config.js` (feature switches, texts), `material-theme.json` (colours), and optionally pages or components to override
(import them as `@instance/<file>`, see `rsbuild.config.mjs`).

## Settings

| What | Where | Read |
|---|---|---|
| Browser app (`REACT_APP_*`), blueprint `/.env.example` | `src/instances/<name>/.env` (git-ignored; it ends up in the public JavaScript, so no real secrets) | at build time |
| Express server: URLs, mail host, OAuth, JWT ... | plain values in `all-services/docker-compose.yml`, sensitive ones in `all-services/env/<instance>/frontend.env` (+ `env/shared/`); blueprint `/server/.env.example` | at run time |

There is no `server.env` in the instance folders any more: runtime settings live in the compose file and in `all-services/env/` (see its README).
`REACT_APP_PUBLIC_URL` appears twice and must be the same: in the instance's `.env` (build) and in the compose file (server).

## Build and run with docker compose

`all-services/docker-compose.yml` has one service per instance, all built from `./frontend` with a different build argument:

```yaml
frontend_vdst:
  build: { context: ./frontend, args: { INSTANCE: vdst } }
  env_file: [./env/shared/frontend.env, ./env/vdst/frontend.env] # sensitive values
  environment: # the rest
```

```sh
cd all-services
docker compose up --build --detach frontend_vdst
```

`INSTANCE` selects `src/instances/<INSTANCE>/.env` for the build and sets `REACT_APP_INSTANCE`.
Local development (`npm run start_client`) uses the repository's own `.env`; set `REACT_APP_INSTANCE=vdst` there to try an instance.
