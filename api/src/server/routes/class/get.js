const { getClassHandler, startClassVideo } = require("../../controller/class")
const auth = require("../../middleware/auth")

module.exports = [
    { 
        name: "/:classId?",
        handler: getClassHandler,
        auth,
    },
    { 
        name: "/start/:classId?",
        handler: startClassVideo,
        auth,
    },
]