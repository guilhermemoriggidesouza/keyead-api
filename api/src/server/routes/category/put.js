const { updateCategoryHandler } = require("../../controller/category")
const auth = require("../../middleware/auth")

module.exports = [
    { 
        name: "/:categoryId",
        handler: updateCategoryHandler,
        auth,
    },
]