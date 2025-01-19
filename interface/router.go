package main

import (
    "github.com/gin-gonic/gin"
    "net/http"
)

func main() {
    r := gin.Default()

    r.StaticFS("/", http.Dir("./build"))
    r.NoRoute(func(c *gin.Context) {
        c.File("./build/index.html")
    })

    r.Run(":3000")
}
