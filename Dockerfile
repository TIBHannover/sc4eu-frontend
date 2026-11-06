# syntax=docker/dockerfile:1

ARG NODE_VERSION=26

FROM node:${NODE_VERSION}-slim AS client-deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --ignore-scripts --no-audit --no-fund

FROM node:${NODE_VERSION}-slim AS server-deps
WORKDIR /app/server
COPY server/package.json server/package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev --no-audit --no-fund

FROM client-deps AS client-build
ENV GENERATE_SOURCEMAP=false
# Passed by docker compose (build.args.INSTANCE). Selects src/instances/<INSTANCE>/ and uses its .env for the build.
# Without it (plain docker build) the repository's own ./.env is used.
ARG INSTANCE

COPY rsbuild.config.mjs .env* ./
COPY public ./public
COPY src ./src
RUN if [ -n "$INSTANCE" ]; then cp "src/instances/$INSTANCE/.env" .env && export REACT_APP_INSTANCE="$INSTANCE"; fi && npm run build

FROM node:${NODE_VERSION}-slim
LABEL maintainer="Mark Vanin <mark.vanin@tib.eu>"
ENV NODE_ENV=production
WORKDIR /app
COPY --from=server-deps /app/server/node_modules ./server/node_modules
COPY server ./server
COPY --from=client-build /app/build ./build

WORKDIR /app/server
EXPOSE 9000
CMD ["node", "index.js"]
