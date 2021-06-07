const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT
const config = require(`./infra/config.js`)

module.exports = function(){
    app.get('/', (req, res) => {
      res.send('Hello sdfgdsfgdfgdasfe!'+ config.teste)
    })
    app.get('/teste', (req, res) => {
      res.send('Helo!'+ config.teste)
    })
    
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
    })
}
