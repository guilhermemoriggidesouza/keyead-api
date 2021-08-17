const { deleteCategoryHandler } = require("../../controller/category-controller")
const auth = require("../../middleware/auth")

module.exports = [
    { 
        name: "/:categoryId",
        handler: deleteCategoryHandler,
        auth,
    },
]