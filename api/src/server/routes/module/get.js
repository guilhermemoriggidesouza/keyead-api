const { getModuleHandler } = require("../../controller/module")
const auth = require("../../middleware/auth")

module.exports = [
    { 
        name: "/:moduleId?",
        handler: getModuleHandler,
        auth,
    },
]