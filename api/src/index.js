const express = require('express')
require('dotenv').config()
const port = process.env.PORT;
const bodyParser = require("body-parser");
const cors = require("cors");
const setupRoute = require("./server/routes")

module.exports = function(){
    let api = express();
    var corsOptions = {
      origin: "*",
      optionsSuccessStatus: 200,
    };
    api.use(cors(corsOptions));
    api.use(bodyParser.json({limit: '200mb'}));
    api.use(bodyParser.urlencoded({ extended: false, limit: '200mb' }));
    api.use(express.json({
      type: ['application/json', 'text/plain']
    }))
    api = setupRoute(api)
    api.listen(port, () => {
        console.log(`Api listening at http://localhost:${port}`)
    })
}
