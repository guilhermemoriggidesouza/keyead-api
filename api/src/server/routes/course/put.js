const { updateCourseHandler } = require("../../controller/course")
const auth = require("../../middleware/auth")

module.exports = [
    { 
        name: "/:courseId",
        handler: updateCourseHandler,
        auth,
    },
]