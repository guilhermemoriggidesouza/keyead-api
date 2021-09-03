const companyRepository = require("../../repository/company")
const fileService = require("../../service/file")

const createCompanyHandler = async (req, res) => {
    try {
        const { name, email, alias, logo } = req.body

        let companyInserted = await companyRepository.create({
            name,
            alias,
            email,
        })

        if (!companyInserted) {
            res.status(400).json({})
            return
        }

        const updatedWithBucketName = await companyRepository.update({bucketName: `${name}-${companyInserted.companyId}` }, {
            where: {
                companyId: companyInserted.companyId
            }
        })
        if(updatedWithBucketName){
            companyInserted.bucketName = `${name}-${companyInserted.companyId}`
        }

        const bucket = await fileService.createBucketForCompanyIfNotExists({ bucketName: `${name}-${companyInserted.companyId}` })
        if (bucket) {
            const createdFile = await fileService.insertFile({ 
                name: `logo-${companyInserted.companyId}`, 
                description: `Logo for company: ${companyInserted.companyId}`, 
                companyId: companyInserted.companyId, 
                buffer: Buffer.from(logo.split(",")[1], "base64") 
            })
            if(createdFile){
                const updatedWithBucketName = await companyRepository.update({ logo: createdFile.fileId }, {
                    where: {
                        companyId
                    }
                })
                if(updatedWithBucketName){
                    companyInserted.logo = createdFile.fileId
                }
            }
        }
        res.status(200).json(companyInserted)
    } catch (error) {
        res.status(500).json(error)
        console.log("[controller] error on create company", error, req.body)
    }
}


module.exports = {
    createCompanyHandler,
}