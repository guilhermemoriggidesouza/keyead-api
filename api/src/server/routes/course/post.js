const { createCourseHandler } = require("../../controller/course")
const auth = require("../../middleware/auth")

module.exports = [
    { 
        name: "/",
        handler: createCourseHandler,
        auth,
    },
]