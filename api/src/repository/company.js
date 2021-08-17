const model = require("../models")

module.exports = {
    async getOne(params){
        try {
            return await model.Company.findOne(params)  
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
}