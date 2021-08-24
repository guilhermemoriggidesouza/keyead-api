const { updateCourseHandler } = require("../../controller/course")
const auth = require("../../middleware/auth")

module.exports = [
    { 
        name: "/",
        handler: updateCourseHandler,
        auth,
    },
]