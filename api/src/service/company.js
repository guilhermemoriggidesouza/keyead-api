const model = require("../models")

const createCompany = async ({alias, name, email, logo}) => {
    try{
        return await model.Company.create({
            alias, name, email, logo
        })
    } catch (e){
        console.log("[service] error on create company", e, {name, email, logo})
    }
}

const getCompanyByAlias = async ({ alias }) => {
    try{
        return await model.Company.findOne({
            where: {
                alias
            }
        })
    } catch (e){
        console.log("[service] error on get company by alias", e, { alias })
    }
} 

module.exports = {
    createCompany,
    getCompanyByAlias
}