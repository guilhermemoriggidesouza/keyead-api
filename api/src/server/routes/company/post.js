const { createCompanyHandler } = require("../../controller/company-controller")

module.exports = [
    { 
        name: "/",
        handler: createCompanyHandler,
    },
]