# Base Image
FROM node:18.17.0-bullseye-slim AS base
WORKDIR /app
COPY package.json .
COPY pnpm-lock.yaml .

# Dependencies
FROM base AS dependencies
RUN npm install -g pnpm \
    && pnpm install

# Runtime
FROM base AS runtime
RUN npm install -g pnpm
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

# Use DEPLOYMENT_ID if set, otherwise fallback to 'local'
CMD ["sh", "-c", "pnpm start --schema ${DEPLOYMENT_ID:-local}"]