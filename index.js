const http = require('http');
const imageRouter = require("./app/imageRouter")
const tagsRouter = require("./app/tagsRouter")
const filterRouter = require("./app/filtersRouter")
const fileRouter = require("./app/fileRouter")

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
        }
    })
    .listen(3000, () => console.log("listen on 3000"))