const { validateLoginHandler, infoUserHandler } = require("../../controller/user-controller")

module.exports = [
    { 
        name: "validateLogin/",
        handler: validateLoginHandler
    },
    { 
        name: "infoUser/:id",
        handler: infoUserHandler
    }
]