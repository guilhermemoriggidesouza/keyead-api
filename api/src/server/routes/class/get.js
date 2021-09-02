const { getClassHandler } = require("../../controller/class")
const auth = require("../../middleware/auth")

module.exports = [
    { 
        name: "/:classId?",
        handler: getClassHandler,
        auth,
    },
]