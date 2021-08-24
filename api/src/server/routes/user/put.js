const { updateUserHandler } = require("../../controller/user")
const auth = require("../../middleware/auth")

module.exports = [
    { 
        name: "/",
        handler: updateUserHandler,
        auth
    },
]