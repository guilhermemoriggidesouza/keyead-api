const S3 = require("../infra/S3");

module.exports = {
    async createBucketForCompany({ bucketName }) {
        try{
            return await S3.createBucket({ Bucket: bucketName }).promise().catch(error => {
                throw Error(error)
            })
        }catch(error){
            console.log("[service] error on create bucket", { bucketName }, error)
        }
    }
}