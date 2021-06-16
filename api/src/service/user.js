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

const getUser = ({ companyId, email, userId }) => {
    try{
        return await model.EmailConfig.findAll({
            limit: email || userId ? 1 : null,
            where: {
              companyId,
              email,
              userId
            },
            order: [ [ 'createdAt', 'DESC' ]]
        })
    } catch (e){
        console.log("[service] error on getting User by email", e, { name, socialReason, cnpj, telefone, email, password, category, companyId })
    }
}

module.exports = {
    createUser,
    getUser,
}