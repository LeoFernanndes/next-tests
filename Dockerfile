# Stage 1: Dependency Installation
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json yarn.lock* pnpm-lock.yaml* ./
RUN \ 
  if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  elif [ -f pnpm-lock.yaml ]; then pnpm install --frozen-lockfile; \
  else npm ci; \
  fi

# Stage 2: Build Application
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Stage 3: Runner Stage
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
# Set a custom port if needed, default is 3000
ARG PORT=3000
ENV PORT ${PORT}

# Create non-root user for security
RUN addgroup --system --gid 1001 nextjs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

EXPOSE ${PORT}
CMD ["npm", "run", "start"]