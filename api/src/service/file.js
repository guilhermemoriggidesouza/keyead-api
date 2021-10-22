const S3 = require("../infra/S3");
const { v4: uuidv4 } = require('uuid');
const companyRepository = require("../repository/company")
const fileRepository = require("../repository/file")
const { fromBuffer } = require('file-type');
var request = require("./request");

const ceateFoldeForCompanyIfNotExists = async ({ bucketName }) => {
    try {
        const bucketList = await S3.listBuckets().promise();
        const [bucket] = bucketList.Buckets.filter(buc => buc.Name == bucketName)
        if (bucket) {
            return bucket
        }
        return await S3.createBucket({ Bucket: bucketName }).promise().catch(error => {
            throw Error(error)
        })
    } catch (error) {
        console.log("[service] error on create bucket", { bucketName }, error)
    }
}

const insertFile = async ({ name, userId, description, companyId, buffer }) => {
    try {
        const fileId = uuidv4();
        const company = await companyRepository.getOne({
            where: {
                companyId
            }
        })
        if (!company.bucketName) {
            return null
        }
        
        let bucket = await ceateFoldeForCompanyIfNotExists({ bucketName: company.bucketName })
        const typeFile = await fromBuffer(buffer)
        const data = await S3.upload({ Bucket: bucket.Name, Key: `${fileId}.${typeFile.ext}`, Body: buffer }).promise()
        if (!data) {
            return null
        }
        const contents = await request.requestHeader({
            url: data.Location,
        })
        const fileCreated = await fileRepository.create({
            fileId: `${fileId}.${typeFile.ext}`,
            name,
            description,
            size: contents['content-length'],
            userId,
            type: typeFile.mime.split("/")[0],
            companyId,
        })
        return fileCreated
    } catch (error) {
        console.log("[service] error on insert file", { name, userId, description, companyId }, error)
        return null
    }
}

const parseKeyToUrl = async (class_, companyId) =>{
    const company = await companyRepository.getOne({
        where: {
            companyId
        }
    })
    if (!company.bucketName) {
        return null
    }
    if(class_.fileId){
        class_.url = `https://s3-aws-region.amazonaws.com/${company.bucketName}}/${class_.fileId}`
    }
    return class_
} 

module.exports = {
    ceateFoldeForCompanyIfNotExists,
    insertFile,
    parseKeyToUrl
}