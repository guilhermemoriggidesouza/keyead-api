const { getCategoryHandler } = require("../../controller/category-controller")
const auth = require("../../middleware/auth")

module.exports = [
    { 
        name: "/:categoryId?",
        handler: getCategoryHandler,
        auth,
    },
]