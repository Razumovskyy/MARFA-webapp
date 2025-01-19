FROM node:20-alpine AS frontend-builder
WORKDIR /myapp
COPY . .
RUN npm install
RUN npm run build

FROM golang:latest AS static-router
WORKDIR /myapp
COPY router.go .
RUN go mod init myapp
RUN go get -u github.com/gin-gonic/gin
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o /main .

FROM gcr.io/distroless/static-debian12
COPY --from=frontend-builder /myapp/.next /build
COPY --from=static-router main .
EXPOSE 3000
CMD ["./main"]
