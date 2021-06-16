require('dotenv').config()

module.exports = {
    db: {
        username: process.env.USER_DB || '',
        password: process.env.USER_PASS || '',
        database: process.env.DATABASE_DB || '',
        host: process.env.HOST_DB || '',
        port: process.env.PORT_DB || '',
        dialect: 'postgres',
    } 
}