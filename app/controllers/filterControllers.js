const { filters } = require("../data")
const { getImageData } = require("./jsonController")
const sharp = require("sharp")


function findFilterByName(filterName) {
    const foundFilter = filters.find((filter) => {
        return filter.name === filterName
    })
    return foundFilter
}

function getFileNameByLocation(location) {
    let fileName = location.split("\\")
    fileName = fileName[fileName.length - 1]
    fileName = fileName.split(".")
    const ext = fileName[fileName.length - 1]
    fileName = fileName[0]

    return { imgFileName: fileName, extension: ext }
}
module.exports = {
    getAllFilters: () => {
        return new Promise((resolve, reject) => {
            resolve(filters)
        })
    },
    filterImg: (imgId, filter, ...args) => {
        return new Promise(async (resolve, reject) => {
            const foundImage = getImageData(imgId)
            if (!foundImage) {
                reject({ err: "wrong image id" })
            }
            const { imgFileName, extension } = getFileNameByLocation(foundImage.url)
            // console.log(imgFileName, extension)

            const filterData = findFilterByName(filter)
            if (!filterData) {
                reject({ err: "wrong filter" })
            }



            // console.log(foundImage.url)
            const actualUrl = __dirname + "/../../" + foundImage.url
            const path = __dirname + "/../../static/upload/" + foundImage.album + "/" + imgFileName + "-" + filter + "." + extension
            const shortPath = "static/upload/" + foundImage.album + "/" + imgFileName + "-" + filter + "." + extension

            const obj = {
                status: filter,
                timestamp: new Date().getTime(),
                url: shortPath
            }
            foundImage.history.push(obj)

            switch (filter) {
                case "rotate":
                    await sharp(actualUrl)
                        .rotate(args[0].deg)
                        .toFile(path);
                    break
                case "resize":
                    await sharp(actualUrl)
                        .resize({
                            width: args[0].width,
                            height: args[0].height
                        })
                        .toFile(path);
                    break
                case "reformat":
                    await sharp(actualUrl)
                        .toFormat(args[0].format)
                        .toFile(path);
                    break
                case "crop":
                    await sharp(actualUrl)
                        .extract({
                            width: args[0].width,
                            height: args[0].height,
                            left: args[0].left,
                            top: args[0].top
                        })
                        .toFile(path);
                    break
                case "grayscale":
                    await sharp(actualUrl)
                        .grayscale()
                        .toFile(path);
                    break
                case "flip/flop":
                    await sharp(actualUrl)
                        .flip() // flop()
                        .toFile(path);
                    break
                case "negate":
                    await sharp(actualUrl)
                        .negate()
                        .toFile(path);
                    break
                case "tint":
                    await sharp(actualUrl)
                        .tint({ r: args[0].r, g: args[0].g, b: args[0].b })
                        .toFile(path);
                    break

                default:
                    resolve({ err: "wrong filter" })
                    break
            }
        })
    },

    getFilteredImage() {

    }
}