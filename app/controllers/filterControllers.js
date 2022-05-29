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
            console.log(imgFileName, extension)

            const filterData = findFilterByName(filter)
            if (!filterData) {
                reject({ err: "wrong filter" })
            }

            const obj = {
                status: filter,
                timestamp: new Date().getTime()
            }

            switch (filter) {
                case "rotate":
                    // await sharp("input.jpg")
                    //     .rotate(args.deg)
                    //     .toFile("input-rotated.jpg");
                    break
                case "resize":
                    break
                case "reformat":
                    break
                case "crop":
                    break
                case "grayscale":
                    break
                case "flip/flop":
                    break
                case "negate":
                    break
                case "tint":
                    await sharp("input.jpg")
                        .tint({ r: args.r, g: args.g, b: args.b })
                        .toFile(__dirname + "/static/" + foundImage.album + "/" + imgFileName + "-" + filter + "." + extension);
                    break

                default:
                    resolve({ err: "wrong filter" })
                    break
            }
        })
    }
}