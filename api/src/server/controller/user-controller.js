const hex = require('amrhextotext')
const jwt = require('jsonwebtoken');
const config = require("./../../infra/config")
const userRepository = require("./../../repository/user");
const companyRepository = require("./../../repository/company");

const validateLoginHandler = async (req, res) => {
    try{
        const { alias, email, password } = req.body
        const company = await companyRepository.getOne({
            where: {
                alias
            }
        })
        
        if(!company){
            res.status(400).json({error: "Não foi possível encontrar sua empresa"})
            return "empresa errada"
        }

        const user = await userRepository.getOne({
            where:{
                email
            },
        }) 

        if(!user){
            res.status(400).json({error: "Não foi possível encontrar seu login"})
            return "login errado"
        }
        if(user.password != hex.textToHex(password)){
            res.status(400).json({error: "Senha incorreta"})
            return "senha errada"
        }
        const token = jwt.sign(
            user,
            config.jwt.privateKey
        );
        user.token = token
        res.status(200).json(user)
        return token
    } catch (error) {
        console.log("[controller] error on validate login", error, req.body)
    }
} 

const getUsersHandler = async (req, res) => {
    try{
        const { companyId } = req.user
        let response
        const where = {
            companyId,
        }

        if(req.params) where.userId = req.params.userId
        const users = userRepository.getAll({
            limit: where.userId ? 1 : 0,
            where
        })

        if(!users){
            res.status(400).json([])
            return
        }
        response = users
        if(response.length == 1 ){
            response = response[0];
        }
        res.status(200).json(response)
    } catch (error) {
        console.log("[controller] error on get users", error, req.body)
    }
}

const createUserHandler = async (req, res) => {
    try{
        const { name, email, category, socialReason, cnpj, telefone } = req.body
        const { companyId } = req.user
        let { password } = req.body

        password = hex.textToHex(password);
        let customerInserted = await userRepository.create({
            name,
            socialReason,
            cnpj,
            telefone,
            email,
            password,
            category,
            companyId,
        })
        if(!customerInserted.dataValues){
            res.status(400).json({})
            return
        }
        res.status(200).json(customerInserted.dataValues)
    } catch (error) {
        res.status(500).json(error)
        console.log("[controller] error on create user", error, req.body)
    }
}

const updateUserHandler = async (req, res) => {
    try {
        const { userId, newFields } = req.body
        const { companyId } = req.user 
        
        const updatedUser = await userRepository.update(newFields, {
            where: {
                companyId,
                userId
            }
        })
        
        if(!updatedUser[0]){
            res.status(400).json({})
        }
        
        res.status(200).json({ updated: updatedUser[0]})
    } catch (error) {
        res.status(500).json(error)
        console.log("[controller] error on update user", error, req.body)
    }
}

const deleteUserHandler = async (req, res) => {
    try {
        const { userId } = req.params
        const { companyId } = req.user 
        
        const removedUser = await userRepository.delete({
            where: {
                companyId,
                userId
            }
        })
        
        if(!removedUser[0]){
            res.status(400).json({})
        }
        res.status(200).json({ removedUser: removedUser[0] })
        
    } catch (error) {
        res.status(500).json(error)
        console.log("[controller] error on delete user", error, req.body)
    }
}

module.exports = {
    validateLoginHandler,
    getUsersHandler,
    createUserHandler,
    updateUserHandler,
    deleteUserHandler,
}