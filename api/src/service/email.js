const model = require("../models")

const sendEmail = () =>{

}

const getEmailConfigByCompany = ({ companyId }) => {
    try{
        return await model.EmailConfig.findAll({
            limit: 1,
            where: {
              companyId
            },
            order: [ [ 'createdAt', 'DESC' ]]
        })
    } catch (e){
        console.log("[service] error on get email info", e, {name, email, logo})
    }
}

const createEmailConfig = ({
    email,
    password,
    service,
    port,
    secure,
    companyId
}) => {
    try{
        return await model.EmailConfig.create({
            email,
            password,
            service,
            port,
            secure,
            companyId
        })
    } catch (e){
        console.log("[service] error on create email config", e, { name, socialReason, cnpj, telefone, email, password, category, companyId })
    }
}

module.exports = {
    getEmailConfigByCompany,
    sendEmail,
    createEmailConfig
}