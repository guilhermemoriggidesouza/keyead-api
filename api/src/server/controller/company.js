const companyRepository = require("../../repository/company") 
const fileService = require("../../service/file") 

const createCompanyHandler = async (req, res) => {
    try{
        const { name, email, alias, logo, bucketName} = req.body

        let companyInserted = await companyRepository.create({
            name,
            alias,
            logo,
            email,
            bucketName
        })

        if(!companyInserted){
            res.status(400).json({})
            return
        }

        await fileService.createBucket({ bucketName })

        res.status(200).json(companyInserted)
    } catch (error) {
        res.status(500).json(error)
        console.log("[controller] error on create company", error, req.body)
    }
}


module.exports = {
    createCompanyHandler,
}