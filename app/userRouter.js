const userController = require("./controllers/userController")
const urlHelper = require("./helpers")
const getJson = require("./getRequestData")


const router = async (req, res) => {
    console.log(req.url)

    switch (req.method) {
        case "GET":
            console.log(req.url)
            if (req.url === "/api/user") {
                console.log("whodzi")
                let users = userController.getUsers()
                res.writeHead(200, { 'content-type': 'application/json' });
                res.end(JSON.stringify(users));
            } else if (req.url.match(/\/api\/user\/confirm\/([0-9a-zA-Z]+)/)) {
                const token = urlHelper.getIdFromUrl(req.url)
                const verify = await userController.verifyUser(token)

                res.writeHead(200, { 'content-type': 'application/json' });
                res.end(JSON.stringify(verify));

                break
            }
            break

        case "POST":
            if (req.url === "/api/user/register") {
                let body = await getJson(req)
                body = JSON.parse(body)
                const register = await userController.createUser(body.email, body.name, body.lastName, body.password)

                res.writeHead(200, { 'content-type': 'application/json' });
                res.end(JSON.stringify(register));
            } else if (req.url === "/api/user/login") {
                let body = await getJson(req)
                body = JSON.parse(body)
                const { email, password } = body
                const goodPass = await userController.login(email, password)
                let responseObj = {}
                if (!goodPass) {
                    res.writeHead(200, { 'content-type': 'application/json' });
                    res.end(JSON.stringify({ err: "bad email or password" }));
                }

                res.writeHead(200, { 'content-type': 'application/json' });
                res.end(JSON.stringify({ token: goodPass }));
            }
            break

    }
}

module.exports = router
