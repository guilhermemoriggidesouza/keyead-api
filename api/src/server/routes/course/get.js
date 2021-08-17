const { getCourseHandler } = require("../../controller/course-controller")
const auth = require("../../middleware/auth")

module.exports = [
    { 
        name: "/:courseId?",
        handler: getCourseHandler,
        auth,
    },
]