# ---------- BASE ----------
FROM node:22-slim AS base
WORKDIR /app

# Install JS dependencies
COPY package.json package-lock.json* ./
RUN npm install

# ---------- BUILDER ----------
FROM base AS builder
WORKDIR /app

COPY . .
RUN npm run build

# ---------- RUNNER ----------
FROM base AS runner
WORKDIR /app

# Install runtime dependencies only
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production
ENV PORT=5173

EXPOSE 5173
CMD ["npm", "run", "start"]

# -------------------
# Step 4 : dev
# -------------------
FROM node:22-slim AS dev
WORKDIR /app

ENV NODE_ENV=development
ENV PORT=5173

EXPOSE 5173

COPY package*.json ./
RUN npm install
COPY . .

CMD ["npm", "run", "dev"]