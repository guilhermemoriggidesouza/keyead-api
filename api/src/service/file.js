const S3 = require("../infra/S3");

module.exports = {
    async createBucket({bucketName}) {
        try{

        }catch(error){
            console.log("[service] create bucket", {bucketName})
        }
    }
}