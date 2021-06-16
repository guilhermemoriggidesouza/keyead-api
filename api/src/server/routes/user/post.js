const { createUser } = require("../../controller/userController")

module.exports = [
    { 
        name: "createUser/",
        handler: createUser
    }
]