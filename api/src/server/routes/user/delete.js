const { deleteUserHandler } = require("../../controller/user-controller")
const auth = require("../../middleware/auth")

module.exports = [
    { 
        name: "deleteUser/",
        handler: deleteUserHandler,
        auth,
    },
]