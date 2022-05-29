const tagsController = require("./controllers/tagsController")
const urlHelper = require("./helpers")
const getJson = require("./getRequestData")


const router = async (req, res) => {

    switch (req.method) {
        case "GET":
            if (req.url === "/api/tags") {
                const allTags = tagsController.getAllTags()
                res.writeHead(200, { 'content-type': 'application/json' });
                res.end(JSON.stringify(allTags));

            } else if (req.url.match(/\/api\/tags\/([0-9a-zA-Z]+)/)) {
                const id = urlHelper.getIdFromUrl(req.url)
                const foundTag = await tagsController.getTagById(id)
                console.log(foundTag)
                res.writeHead(200, { 'content-type': 'application/json' });
                res.end(JSON.stringify(foundTag));
            }
            break
        case "POST":
            if (req.url === "/api/tags") {
                let body = await getJson(req)
                body = JSON.parse(body)
                const msg = await tagsController.addTag(body)
                res.writeHead(200, { 'content-type': 'application/json' });
                res.end(JSON.stringify(msg));
            }
            break

    }
}

module.exports = router
