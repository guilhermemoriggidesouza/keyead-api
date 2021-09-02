const { deleteClassHandler } = require("../../controller/class")
const auth = require("../../middleware/auth")

module.exports = [
    { 
        name: "/:courseId",
        handler: deleteClassHandler,
        auth,
    },
]