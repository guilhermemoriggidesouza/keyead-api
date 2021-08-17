const { deleteCourseHandler } = require("../../controller/course-controller")
const auth = require("../../middleware/auth")

module.exports = [
    { 
        name: "/:courseId",
        handler: deleteCourseHandler,
        auth,
    },
]