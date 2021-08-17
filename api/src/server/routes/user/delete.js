const { deleteUserHandler } = require("../../controller/user-controller")
const auth = require("../../middleware/auth")

module.exports = [
    { 
        name: "/:userId",
        handler: deleteUserHandler,
        auth,
    },
]