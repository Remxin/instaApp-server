const fs = require("fs");
const { dirname } = require("path");

const router = async (req, res) => {
    switch (req.method) {
        case "GET":
            // console.log(req.url)
            const dir = __dirname + "/.." + req.url
            console.log(dir)
            fs.readFile(dir, function (error, data) {
                if (error) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.write({ err: "Server error" })
                    res.end()
                }
                res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                res.write(data);
                res.end();
            })
            break

    }
}

module.exports = router
