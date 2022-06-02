const userHelpers = require("../userHelpers")
const emailHelpers = require("../emailHelpers")
const { users } = require("../data")

module.exports = {
    createUser: async (email, name, lastName, password) => {
        const encryptedPassword = await userHelpers.encryptPass(password)
        const id = users.length
        const token = await userHelpers.signToken(email, id)

        const obj = {
            id,
            email,
            name,
            lastName,
            password: encryptedPassword,
            confirmed: false
        }

        users.push(obj)

        await emailHelpers.sendVerifyEmail(email, token)

        return { msg: "Successfully created user" }
    },

    verifyUser: async (token) => {
        const tokenData = await userHelpers.verifyToken(token)
        const foundUser = userHelpers.findUserById(tokenData.id)
        foundUser.confirmed = true

        return { msg: "Verified user" }
    },

    login: async (email, password) => {
        const user = userHelpers.findUserByEmail(email)
        const goodPass = userHelpers.descryptPass(password, user.password)
        if (goodPass) {
            const token = userHelpers.signToken(user.email, user.id)
            return token
        }
        return false

    },

    getUsers: () => {
        return users
    },

    getUser: (userId) => {
        return userHelpers.findUserById(userId)
    }
}