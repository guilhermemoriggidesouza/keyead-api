const { createCourseHandler } = require("../../controller/course")
const auth = require("../../middleware/auth")

module.exports = [
    { 
        name: "/:classId",
        handler: createCourseHandler,
        auth,
    },
]