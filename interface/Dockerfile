FROM node:20-alpine AS frontend-builder
WORKDIR /myapp
COPY . .
RUN npm install
RUN npm run build

FROM gcr.io/distroless/static-debian12
COPY --from=frontend-builder /myapp/.next /build
EXPOSE 3001
CMD ["npm", "run", "start", "--", "-p", "3001"]
