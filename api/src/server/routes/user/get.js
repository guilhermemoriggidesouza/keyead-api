const { getUsersHandler } = require("../../controller/user-controller")
const auth = require("../../middleware/auth")

module.exports = [
    { 
        name: "/:userId?",
        handler: getUsersHandler,
        auth,
    }
]