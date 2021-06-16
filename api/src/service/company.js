const model = require("../models")

const createCompany = async ({name, email, logo}) => {
    try{
        return await model.Company.create({
            name, email, logo
        })
    } catch (e){
        console.log("[service] error on create company", e, {name, email, logo})
    }
}

module.exports = {
    createCompany
}