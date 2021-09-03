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
    async update(values, options){
        try {
            return await model.Company.update(values, options)
        } catch (error) {
            console.log("[Repository][Company] error on update Company", { values, error})        
            throw Error(error)
        }
    },
    model: model.Company
}