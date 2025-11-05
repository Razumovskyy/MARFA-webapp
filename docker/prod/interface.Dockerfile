# syntax=docker/dockerfile:1.7

FROM node:20-alpine AS deps
WORKDIR /myapp
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --prefer-offline --no-audit

FROM deps AS builder
ARG NEXT_PUBLIC_HOST_API=https://marfa.app
COPY . .
RUN npm run build

FROM deps AS prod-deps
RUN npm prune --omit=dev && npm cache clean --force

FROM node:20-alpine
WORKDIR /myapp
ENV NODE_ENV=production
COPY --from=prod-deps /myapp/node_modules ./node_modules
COPY --from=builder /myapp/package.json /myapp/package.json
COPY --from=builder /myapp/package-lock.json /myapp/package-lock.json
COPY --from=builder /myapp/.next /myapp/.next
COPY --from=builder /myapp/public /myapp/public
COPY --from=builder /myapp/next.config.mjs /myapp/next.config.mjs
EXPOSE 3001
CMD ["npm", "run", "start", "--", "-p", "3001"]
