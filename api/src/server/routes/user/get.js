const { validateLoginHandler, getUsersHandler } = require("../../controller/user-controller")
const auth = require("../../middleware/auth")

module.exports = [
    { 
        name: "validateLogin/",
        handler: validateLoginHandler,
        auth: null,
    },
    { 
        name: "getUser/:userId",
        handler: getUsersHandler,
        auth,
    }
]