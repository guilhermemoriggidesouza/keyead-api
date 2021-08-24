const { getCourseHandler } = require("../../controller/course")
const auth = require("../../middleware/auth")

module.exports = [
    { 
        name: "/:courseId?",
        handler: getCourseHandler,
        auth,
    },
]