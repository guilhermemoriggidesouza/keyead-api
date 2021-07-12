const { createCourseHandler } = require("../../controller/course-controller")
const auth = require("../../middleware/auth")

module.exports = [
    { 
        name: "createCourse/",
        handler: createCourseHandler,
        auth,
    },
]