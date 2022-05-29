const filterController = require("./controllers/filterControllers")
const getJson = require("./getRequestData")


const router = async (req, res) => {
    switch (req.method) {
        case "GET":
            if (req.url === "/api/filters") {
                const filters = await filterController.getAllFilters()
                res.writeHead(200, { 'content-type': 'application/json' });
                res.end(JSON.stringify(filters));
                break
            }
            break
        case "PATCH":
            if (req.url === "/api/filters") {
                let data = await getJson(req)
                data = JSON.parse(data)
                const res = await filterController.filterImg(data.imgId, data.filter, data)

                res.writeHead(200, { 'content-type': 'application/json' });
                res.end(JSON.stringify(filters));
                break
            }
            break
    }

}

module.exports = router
