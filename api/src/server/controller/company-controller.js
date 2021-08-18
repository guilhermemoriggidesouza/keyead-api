const hex = require('amrhextotext')
const jwt = require('jsonwebtoken');
const config = require("../../infra/config")
const userRepository = require("../../repository/user");
const companyRepository = require("../../repository/company");

const createCompanyHandler = async (req, res) => {
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


module.exports = {
    createCompanyHandler,
}