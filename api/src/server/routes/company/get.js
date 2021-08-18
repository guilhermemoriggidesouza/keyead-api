const { getCourseHandler } = require("../../controller/course-controller")

module.exports = [
    { 
        name: "/:courseId?",
        handler: getCourseHandler,
    },
]