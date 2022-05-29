module.exports = {
    getIdFromUrl: (urlString) => {
        const split = urlString.split("/")
        const id = split[split.length - 1]
        return id
    }
}