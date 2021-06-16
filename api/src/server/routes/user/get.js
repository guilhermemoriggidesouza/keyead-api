const { validateLoginHandler, infoUserHandler } = require("../../controller/userController")

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