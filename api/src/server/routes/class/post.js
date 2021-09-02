const { createClassHandler } = require("../../controller/class")
const auth = require("../../middleware/auth")

module.exports = [
    { 
        name: "/",
        handler: createClassHandler,
        auth,
    },
]