FROM node:20-alpine AS frontend-builder
WORKDIR /myapp
ARG NEXT_PUBLIC_HOST_API=https://marfa.app
COPY . .
RUN npm install -- force
RUN npm run build

FROM node:20-slim
WORKDIR /myapp
COPY --from=frontend-builder /myapp/.next /myapp/.next
COPY --from=frontend-builder /myapp/package.json /myapp/package.json
COPY --from=frontend-builder /myapp/node_modules /myapp/node_modules
EXPOSE 3001
CMD ["npm", "run", "start", "--", "-p", "3001"]
