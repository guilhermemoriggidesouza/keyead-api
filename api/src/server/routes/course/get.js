const { getCourseHandler } = require("../../controller/course-controller")
const auth = require("../../middleware/auth")

module.exports = [
    { 
        name: "getCourse/",
        handler: getCourseHandler,
        auth,
    },
]