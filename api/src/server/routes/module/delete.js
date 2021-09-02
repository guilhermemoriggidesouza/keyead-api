const { deleteModuleHandler } = require("../../controller/module")
const auth = require("../../middleware/auth")

module.exports = [
    { 
        name: "/:moduleId",
        handler: deleteModuleHandler,
        auth,
    },
]