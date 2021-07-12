const { updateCourseHandler } = require("../../controller/course-controller")
const auth = require("../../middleware/auth")

module.exports = [
    { 
        name: "updateCourse/",
        handler: updateCourseHandler,
        auth,
    },
]