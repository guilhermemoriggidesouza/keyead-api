const { createCategoryHandler } = require("../../controller/category-controller")
const auth = require("../../middleware/auth")

module.exports = [
    { 
        name: "/",
        handler: createCategoryHandler,
        auth,
    },
]