const fileController = require("./controllers/fileController")
const { getImageData } = require("./controllers/jsonController")
const jsonController = require("./controllers/jsonController")
const tagsController = require("./controllers/tagsController")
const getJson = require("./getRequestData")
const helpers = require("./helpers")
const router = async (req, res) => {

   
    switch (req.method) {
        case "GET":
            switch (req.url) {
                case "/api/photos":
                    const data = await jsonController.getAllImageData()
                    res.writeHead(200, { 'content-type': 'application/json' });
                    res.end(JSON.stringify(data));
                    break
                default:
                    // ! Zaczynaj od najbardziej złożynych zapytań
                    if (req.url.match(/\/api\/photos\/tags\/([0-9a-zA-Z]+)/)) {
                        const id = helpers.getIdFromUrl(req.url)
                        const tags = await tagsController.getPhotoTags(id)

                        res.writeHead(200, { 'content-type': 'application/json' });
                        res.end(JSON.stringify(tags));

                        break
                    } else if (req.url.match(/\/api\/photos\/([0-9a-zA-Z]+)/)) {
                        console.log('tutaj')
                        const id = helpers.getIdFromUrl(req.url)
                        const data = await jsonController.getImageData(id)
                        if (data.err) {
                            res.writeHead(200, { 'content-type': 'application/json' });
                            res.end(JSON.stringify(data));
                            return
                        }
                        res.writeHead(200, { 'content-type': 'application/json' });
                        res.end(JSON.stringify(data));
                        break
                    }

                    res.writeHead(200, { 'content-type': 'application/json' });
                    res.end(JSON.stringify({ err: "This page does not exist" }));
                    break

            }

            break
        case "POST":
            switch (req.url) {
                case "/api/photos":
                    const photo = await fileController.addPhoto(req, res)
                    const photoData = await jsonController.appendImageData(photo)
                    res.writeHead(200, { 'content-type': 'application/json' });
                    res.end(JSON.stringify(photoData.fileData));

                    break
            }
            break
        case "DELETE":
            if (req.url.match(/\/api\/photos\/([0-9a-zA-Z]+)/)) {
                const id = helpers.getIdFromUrl(req.url)
                const data = await jsonController.deleteImageData(id)
                // console.log(data)
                if (data.err) {
                    res.writeHead(200, { 'content-type': 'application/json' });
                    res.end(JSON.stringify(data));
                    return
                }
                res.writeHead(200, { 'content-type': 'application/json' });
                res.end(JSON.stringify(data));
            }
            break

        case "PATCH":
            if (req.url === "/api/photos") {
                let body = await getJson(req)
                body = JSON.parse(body)
                const time = new Date().getTime()
                const historyObj = {
                    status: body.status,
                    timestamp: time
                }

                const imageObj = await getImageData(body.id)
                // console.log(imageObj)
                imageObj.history.push(historyObj)
            } else if (req.url === "/api/photos/tags") {
                let body = await getJson(req)
                body = JSON.parse(body)
             
                const msg = await tagsController.pushTagToPhoto(body.imgId, body.tagId)
                res.writeHead(200, { 'content-type': 'application/json' });
                res.end(JSON.stringify(msg));
            } else if (req.url === "/api/photos/tags/mass") {
                let body = await getJson(req)
                body = JSON.parse(body)
               
                body.tagsId.forEach(async (tagId) => {
                    const msg = await tagsController.pushTagToPhoto(body.imgId, tagId)
                })
                res.writeHead(200, { 'content-type': 'application/json' });
                res.end(JSON.stringify({ msg: "Successfully added tags!" }));
            }
            break
    }
}

module.exports = router
