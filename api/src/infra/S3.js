var AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-west-2',
    accessKeyId: config.s3.userKey,
    secretAccessKey: config.s3.userSecret,
});
module.exports = new AWS.S3();
