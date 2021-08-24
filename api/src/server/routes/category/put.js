const { updateCategoryHandler } = require("../../controller/category")
const auth = require("../../middleware/auth")

module.exports = [
    { 
        name: "/",
        handler: updateCategoryHandler,
        auth,
    },
]