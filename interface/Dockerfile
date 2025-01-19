FROM node:20-alpine AS frontend-builder
WORKDIR /myapp
COPY . .
RUN npm install
RUN npm run build

FROM gcr.io/distroless/nodejs20-debian12
WORKDIR /myapp
COPY --from=frontend-builder /myapp/.next /myapp/.next
COPY --from=frontend-builder /myapp/package.json /myapp/package.json
EXPOSE 3001
CMD ["./.next/standalone/server.js", "-p", "3001"]
