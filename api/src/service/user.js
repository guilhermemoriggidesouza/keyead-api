const model = require("../models")

const createUser = async ({name, socialReason, cnpj, telefone, email, password, category, companyId}) => {
    try{
        return await model.User.create({
            name,
            socialReason,
            cnpj,
            telefone,
            email,
            password,
            category,
            companyId,
        })
    } catch (e){
        console.log("[service] error on create User", e, { name, socialReason, cnpj, telefone, email, password, category, companyId })
    }
}

const getUser = async ({ companyId, email, userId }) => {
    try{
        let limit = null
        const where = {
            companyId
        }
        if(email)
            where.email = email

        if(userId)
            where.userId = userId

        if(email || userId)
            limit = 1
        
        return await model.User.findAll({
            limit,
            where,
            order: [[ 'createdAt', 'DESC' ]]
        })
    } catch (e){
        
        console.log("[service] error on getting User ", e, { companyId, email, userId })
    }
}

module.exports = {
    createUser,
    getUser,
}