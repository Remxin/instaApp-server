let { photosArr } = require("../data")
const { deletePhoto } = require("./fileController")
let idIndex = 0



module.exports = {
    appendImageData: (file) => {
        return new Promise((resolve, reject) => {
            try {
                // console.log(file)
                const myFile = file.file
                // console.log(myFile)
                const myAlbum = file.album
                const object = {
                    id: idIndex,
                    album: myAlbum,
                    originalName: myFile.name,
                    // TODO: zmień potem url
                    url: myFile.path,
                    lastChange: "original",
                    history: [],
                    tags: []
                }
                photosArr.push(object)
                // console.log(object)
                idIndex += 1
                resolve({ fileData: object })
            } catch (err) {
                reject({ err })
            }
        })
    },
    getAllImageData: () => {
        return photosArr
    },
    getImageData: (id) => {
        const foundPhoto = photosArr.find((photo) => {
            return photo.id == id
        })
        if (foundPhoto) {
            return foundPhoto
        }
        return { err: "This photo does not exist" }
    },
    deleteImageData: async (id) => {
        foundPhoto = photosArr.find((photo) => {
            return photo.id == id
        })
        photosArr = photosArr.filter((photo) => {
            return photo.id != id
        })

        const status = await deletePhoto(foundPhoto.url)
        if (status.err) {
            return { err: status.err }
        }
        return { msg: `successfully deleted photo id: ${id}` }

    }
}