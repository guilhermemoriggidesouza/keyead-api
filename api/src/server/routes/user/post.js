const { createUserHandler } = require("../../controller/user-controller")
const auth = require("../../middleware/auth")

module.exports = [
    { 
        name: "createUser/",
        handler: createUserHandler,
        auth,
    }
]