const { createCompanyHandler } = require("../../controller/company")

module.exports = [
    { 
        name: "/",
        handler: createCompanyHandler,
    },
]