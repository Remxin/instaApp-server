const http = require('http');
const imageRouter = require("./app/imageRouter")
const tagsRouter = require("./app/tagsRouter")
const filterRouter = require("./app/filtersRouter")
const fileRouter = require("./app/fileRouter")
const userRouter = require("./app/userRouter")
require("dotenv").config()


const PORT = process.env.PORT || 3000
http
    .createServer(async (req, res) => {
        // console.log(req.url.search("/api/filters"))
        if (req.url.search("/api/photos") !== -1) {
            imageRouter(req, res)
        } else if (req.url.search("/api/tags") !== -1) {
            tagsRouter(req, res)
        } else if (req.url.search("/api/filters") !== -1) {
            // console.log('wchodzi')
            filterRouter(req, res)
        } else if (req.url.search("/static/upload") !== -1) {
            fileRouter(req, res)
        } else if (req.url.search("/api/user") !== -1) {
            userRouter(req, res)
        }
    })
    .listen(PORT, () => console.log(`Listening on port ${PORT}`))