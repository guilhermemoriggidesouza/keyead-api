const companyRepository = require("../../repository/company")

const createCompanyHandler = async (req, res) => {
    try{
        const { name, email, alias, logo, } = req.body

        let companyInserted = await companyRepository.create({
            name,
            alias,
            logo,
            email,
        })

        if(!companyInserted.dataValues){
            res.status(400).json({})
            return
        }
        res.status(200).json(companyInserted.dataValues)
    } catch (error) {
        res.status(500).json(error)
        console.log("[controller] error on create company", error, req.body)
    }
}


module.exports = {
    createCompanyHandler,
}