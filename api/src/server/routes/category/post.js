const { createCategoryHandler } = require("../../controller/category")
const auth = require("../../middleware/auth")

module.exports = [
    { 
        name: "/",
        handler: createCategoryHandler,
        auth,
    },
]