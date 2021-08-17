const { updateCategoryHandler } = require("../../controller/category-controller")
const auth = require("../../middleware/auth")

module.exports = [
    { 
        name: "/",
        handler: updateCategoryHandler,
        auth,
    },
]