const userService = require("../../service/user")
const companyService = require("../../service/company")
const hex = require('amrhextotext')
const config = require("../../infra/config")

const validateLoginHandler = async (req, res) => {
    try{
        const { alias, email, password } = req.body
        const company = companyService.getCompanyByAlias({ alias })
        
        if(!company){
            res.status(400).json({error: "Não foi possível encontrar sua empresa"})
            return
        }

        const user = await userService.getUser({ companyId: company.companyId, email })
        if(!user){
            res.status(400).json({error: "Não foi possível encontrar seu login"})
            return
        }

        if(user.password != hex.textToHex(password)){
            res.status(400).json({error: "Senha incorreta"})
            return
        }
        const token = jwt.sign(
            user,
            config.jwt.privateKey
        );
        user.token = token
        res.status(200).json(user)
    } catch (error) {
        console.log("[controller] error on validate login", error, req.body)
    }
} 

const getUsersHandler = async (req, res) => {
    try{
        const { companyId } = req.params
        const users = await userService.getUser({
            companyId
        })

        if(!users){
            res.status(400).json([])
            return
        }

        res.status(200).json(users)

    } catch (error) {
        console.log("[controller] error on get users", error, req.body)
    }
}

const createUserHandler = async (req, res) => {
    try{
        const { name, email, category, companyId, socialReason, cnpj, telefone } = req.body
        let { password } = req.body
        password = hex.textToHex(password);
        let customerInserted = await userService.createUser({name, socialReason, cnpj, telefone, email, password, category, companyId})
        if(!customerInserted.dataValues){
            res.status(400).json({})
            return
        }
        //TODO associate course to user
        res.status(200).json(customerInserted.dataValues)
    } catch (error) {
        console.log("[controller] error on create user", error, req.body)
    }

}

const updateUserHandler = () => {

}

const deleteUserHandler = () => {
    
}

const getUserByIdHandler = () => {

}

module.exports = {
    validateLoginHandler,
    getUsersHandler,
    createUserHandler,
    updateUserHandler,
    deleteUserHandler,
    getUserByIdHandler,
}