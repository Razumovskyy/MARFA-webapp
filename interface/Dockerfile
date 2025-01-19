# Stage 1: Build the application
FROM node:20-alpine AS frontend-builder
WORKDIR /myapp
COPY . .
RUN npm install
RUN npm run build

# Stage 2: Runtime with a smaller Node.js image
FROM node:20-slim
WORKDIR /myapp
COPY --from=frontend-builder /myapp/.next /myapp/.next
COPY --from=frontend-builder /myapp/package.json /myapp/package.json
EXPOSE 3001
CMD ["npm", "run", "start", "--", "-p", "3001"]
