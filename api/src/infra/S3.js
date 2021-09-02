var AWS = require('aws-sdk');
var config = require('./config');

AWS.config.update({
    region: 'us-west-2',
});

module.exports = new AWS.S3({
    accessKeyId: config.aws.userKey,
    secretAccessKey: config.aws.userSecret,
});
