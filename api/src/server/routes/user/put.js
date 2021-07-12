const { updateUserHandler } = require("../../controller/user-controller")
const auth = require("../../middleware/auth")

module.exports = [
    { 
        name: "updateUser/",
        handler: updateUserHandler,
        auth
    },
]