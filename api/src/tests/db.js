const model = require("../models")

describe("CLEANING DATABASE", ()=>{
    test("cleaning", () =>{
        model.Company.sync({ force: true });
        model.User.sync({ force: true });
        model.EmailConfig.sync({ force: true });
    })
})