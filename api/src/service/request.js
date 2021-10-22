var request = require("request");
var fetch = require("node-fetch");

module.exports = {
    requestHeader: ({url}) => new Promise((resolve, reject) => {
        request({
            url: url,
            method: "HEAD"
        }, function(err, response, body) {
            resolve(response.headers)
        })
    })
}