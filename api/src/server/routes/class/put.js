const { createClassHandler } = require("../../controller/class")
const auth = require("../../middleware/auth")

module.exports = [
    { 
        name: "/:classId",
        handler: createClassHandler,
        auth,
    },
]