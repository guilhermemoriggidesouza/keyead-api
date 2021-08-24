const { deleteCategoryHandler } = require("../../controller/category")
const auth = require("../../middleware/auth")

module.exports = [
    { 
        name: "/:categoryId",
        handler: deleteCategoryHandler,
        auth,
    },
]