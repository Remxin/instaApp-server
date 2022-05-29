const { tagsArr, photosArr } = require("../data")



module.exports = {

    getAllTags: () => {
        return tagsArr
    },

    getTagById: (id) => {
        return new Promise((resolve, reject) => {
            const foundTag = tagsArr.find((tag) => {
                return tag.id == id
            })
            resolve(foundTag)
        })
    },

    addTag: (data) => {
        return new Promise((resolve, reject) => {
            const obj = {
                id: tagsArr.length,
                name: data.name,
                popularity: data.popularity
            }

            tagsArr.push(obj)
            resolve({ msg: "successfully added new tag" })
        })
    },

    pushTagToPhoto: (imageId, tagId) => {
        return new Promise((resolve, reject) => {
            // console.log()
            const foundPhoto = photosArr.find((photo) => {
                return photo.id == imageId
            })
            const foundTag = tagsArr.find((tag) => {
                return tag.id == tagId
            })

            foundPhoto.tags.push(foundTag)
            resolve({ msg: "successfully added tag to photo" })
        })
    },

    getPhotoTags: (imageId) => {
        return new Promise((resolve, reject) => {
            const foundPhoto = photosArr.find((photo) => {
                return photo.id == imageId
            })

            resolve(foundPhoto.tags)
        })
    }

}