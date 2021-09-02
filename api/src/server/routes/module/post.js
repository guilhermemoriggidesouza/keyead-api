const { createModuleHandler } = require("../../controller/module")
const auth = require("../../middleware/auth")

module.exports = [
    { 
        name: "/",
        handler: createModuleHandler,
        auth,
    },
]