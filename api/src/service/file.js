const S3 = require("../infra/S3");
const { v4: uuidv4 } = require('uuid');
const companyRepository = require("../repository/company")
const fileRepository = require("../repository/file")
const { fromBuffer } = require('file-type');
var {requestHeader} = require("./request");

module.exports = {
    async createBucketForCompanyIfNotExists({ bucketName }) {
        try {
            const bucketList = await S3.listBuckets().promise();
            console.log(bucketList)
            const [bucket] = bucketList.Buckets.filter(buc => buc.Name == bucketName)
            if(bucket){
                return bucket
            }
            console.log("creating bucket")
            return await S3.createBucket({ Bucket: bucketName }).promise().catch(error => {
                throw Error(error)
            })
        } catch(error){
            console.log("[service] error on create bucket", { bucketName }, error)
        }
    },
    async insertFile({ name, userId, description, companyId, buffer }){
        try {
            const fileId = uuidv4();
            const company = await companyRepository.getOne({
                where: {
                    companyId
                }
            })
            if(!company){
                return null
            }
            const typeFile = await fromBuffer(buffer)
            const data = await S3.upload({Bucket: company.bucketName, Key: `${fileId}.${typeFile.ext}`, Body: buffer}).promise()
            if(!data){
                return null
            }
            const contents = await requestHeader({
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
        } catch(error){
            console.log("[service] error on create bucket", { name, userId, description, companyId }, error)
        }
    }

}