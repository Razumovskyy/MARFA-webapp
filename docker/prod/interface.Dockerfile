FROM node:20-alpine AS deps
WORKDIR /myapp
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS builder
ARG NEXT_PUBLIC_HOST_API=https://marfa.app
WORKDIR /myapp
COPY --from=deps /myapp/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /myapp
COPY --from=builder /myapp/.next /myapp/.next
COPY --from=builder /myapp/package.json /myapp/package.json
COPY --from=builder /myapp/node_modules /myapp/node_modules
RUN npm prune --omit=dev
EXPOSE 3001
CMD ["npm", "run", "start", "--", "-p", "3001"]
