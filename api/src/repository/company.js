const model = require("../models")

module.exports = {
    async getOne(params){
        try {
            let company = await model.Company.findOne(params)
            return company ? company.dataValues : {}
        } catch (error) {
            console.log("[Repository][User] error on get one Company", { params, error})
            throw Error(error)
        }

    },
    async getAll(params){
        try {
            
        } catch (error) {
            console.log("", { params, error})
        }
    },
    async create(params){
        try {
            let company = await model.Company.create(params)
            return company ? company.dataValues : {}
        } catch (error) {
            console.log("", { params, error})
        }
    },
    async delete(params){
        try {
            
        } catch (error) {
            console.log("", { params, error})            
        }
    },
    async update(params){
        try {
            
        } catch (error) {
            console.log("", { params, error})            
        }
    },
    model: model.Company
}