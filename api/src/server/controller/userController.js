const userService = require("../../service/user")
var crypto = require('crypto');

const validateLoginHandler = (req, res) => {
    
} 

const infoUserHandler = (req, res) => {

}

const createUser = async (req, res) => {
    try{
        const { name, email, category, companyId, socialReason, cnpj, telefone } = req.body
        let { password } = req.body
        password = crypto.createHash('md5').update(password).digest('hex');
        let customerInserted = await userService.createUser({name, socialReason, cnpj, telefone, email, password, category, companyId})
        if(!customerInserted.dataValues){
            res.status(400).json({})
            return
        }

        res.status(200).json(customerInserted.dataValues)
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    validateLoginHandler,
    infoUserHandler,
    createUser
}