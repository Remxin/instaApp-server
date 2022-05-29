getRequestData = async (req) => {
    return new Promise((resolve, reject) => {
        try {
            let body = "";

            req.on("data", (part) => {
                body += part.toString();
            });

            req.on("end", () => {
                // mamy dane i zwracamy z promisy
                body = JSON.stringify(body)
                resolve(JSON.parse(body));
            });

        } catch (error) {
            reject(error);
        }
    })

}
module.exports = getRequestData
