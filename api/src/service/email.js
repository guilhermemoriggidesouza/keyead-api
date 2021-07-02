const model = require("../models")

const sendEmail = () =>{

}

const getEmailConfigByCompany = async ({ companyId }) => {
    try{
        return await model.EmailConfig.findAll({
            limit: 1,
            where: {
              companyId
            },
            order: [ [ 'createdAt', 'DESC' ]]
        })
    } catch (e){
        console.log("[service] error on get email info", e, {companyId})
    }
}

const createEmailConfig = async ({
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
        console.log("[service] error on create email config", e, { 
            email,
            password,
            service,
            port,
            secure,
            companyId
        })
    }
}

module.exports = {
    getEmailConfigByCompany,
    sendEmail,
    createEmailConfig
}