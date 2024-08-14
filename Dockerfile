# BUILDER
FROM --platform=linux/amd64 node:20-alpine AS builder
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci
# ARG ENVIRONMENT=production
COPY . .

RUN SKIP_ENV_VALIDATION=1 npm run build
# Only build if in production mode
# RUN if [ "$ENVIRONMENT" = "production" ]; then \
#       SKIP_ENV_VALIDATION=1 npm run build; \
#     else \
#       echo "Skipping build for development"; \
#     fi

# RUNNER (distroless for production, regular node image for dev)
# FROM --platform=linux/amd64 node:20-alpine AS runner
# ARG ENVIRONMENT=production
# WORKDIR /app

# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/next.config.js ./
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/package.json ./package.json
# COPY --from=builder /app/.next/standalone ./
# COPY --from=builder /app/.next/static ./.next/static
# COPY --from=builder /app/src ./src

# Set up the runner environment
# ENV NODE_ENV=$ENVIRONMENT
EXPOSE 3000
ENV PORT 3000
