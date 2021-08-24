const { getUsersHandler } = require("../../controller/user")
const auth = require("../../middleware/auth")

module.exports = [
    { 
        name: "/:userId?",
        handler: getUsersHandler,
        auth,
    }
]