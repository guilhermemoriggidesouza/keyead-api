const { createUserHandler, validateLoginHandler } = require("../../controller/user")
const auth = require("../../middleware/auth")

module.exports = [
    { 
        name: "/auth",
        handler: validateLoginHandler,
        auth: null,
    },
    { 
        name: "/",
        handler: createUserHandler,
        auth,
    }
]