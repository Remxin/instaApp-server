const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { users } = require("./data")

module.exports = {
    findUserById: (userId) => {
        const foundUser = users.find((user) => {
            return user.id == userId
        })
        return foundUser
    },
    findUserByEmail: (email) => {
        const foundUser = users.find((user) => {
            return user.email == email
        })
        return foundUser
    },

    encryptPass: async (password) => {
        const encryptedPassword = await bcrypt.hash(password, 10);
        // console.log({ encryptedPassword: encryptedPassword });
        return encryptedPassword
    },
    descryptPass: async (userPass, encryptedPass) => {
        const decrypted = await bcrypt.compare(userPass, encryptedPass)
        return decrypted
    },

    signToken: async (email, userId) => {
        const token = await jwt.sign({
            email,
            id: userId
        }, process.env.JWT, {
            expiresIn: "1h"
        }
        )
        return token
    },

    verifyToken: async (token) => {
        try {
            const decodedToken = await jwt.verify(token, process.env.JWT)
            return decodedToken
        } catch (err) {
            return { err }
        }
    }
}