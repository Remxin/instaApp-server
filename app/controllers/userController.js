const userHelpers = require("../userHelpers")
const emailHelpers = require("../emailHelpers")
const { users } = require("../data")

module.exports = {
    createUser: async (email, name, lastName, password) => {
        const encryptedPassword = await userHelpers.encryptPass(password)
        const id = user.length
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

    login: async () => {

    },

    getUsers: () => {
        return users
    },

    getUser: (userId) => {
        return userHelpers.findUserById(userId)
    }
}