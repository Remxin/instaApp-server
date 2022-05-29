const { create } = require("domain");
const formidable = require("formidable")
const fs = require("fs")
const path = require("path");

const form = formidable({});
form.uploadDir = "static/upload/"
form.keepExtensions = true

function movePhotoToDir(fullPath, file) {
    return new Promise((resolve, reject) => {
        try {
            let fileName = file.path.split("\\")
            fileName = fileName[fileName.length - 1]

            fs.rename(file.path, `${fullPath.dir}\\${fileName}`, (err) => {
                if (err) {
                    file.path = fullPath.dir + "\\" + fileName
                    resolve({ err })
                }
                resolve({ msg: "success!", path: `${fullPath.dir}\\${fileName}` })
            })

        } catch (err) {
            reject({ err })
        }
    })
}

function createDir(dirName) {
    return new Promise((resolve, reject) => {
        const fullPath = path.join("static", "upload", dirName)
        try {
            if (!fs.existsSync(fullPath)) {
                fs.mkdir(fullPath, (err) => {
                    if (err) {
                        resolve({ err })
                    }
                    resolve({ dir: fullPath })
                })
            } else {
                resolve({ dir: fullPath })
            }
        } catch (err) {
            reject({ err })
        }
    })

}


module.exports = {
    addPhoto: (req, res) => {
        return new Promise(async (resolve, reject) => {
            try {
                form.parse(req, async function (err, fields, files) {
                    if (err) {
                        resolve({ err })
                    }
                    const desirePath = await createDir(fields.album)
                    const newDirData = await movePhotoToDir(desirePath, files.file)
                    files.file.path = newDirData.path

                    resolve({ file: files.file, album: fields.album })
                });
            } catch (err) {
                reject({ err })
            }
        })
    },

    deletePhoto: (filePath) => {
        return new Promise((resolve, reject) => {
            try {
                fs.unlink(filePath, (err) => {
                    if (err) resolve({ err })
                    resolve({ msg: "success in deleting image" })
                })
            } catch (err) {
                reject({ err })
            }
        })
    }




}