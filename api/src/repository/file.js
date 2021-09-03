const model = require("../models")

module.exports = {
    async getOne(params){
        try {
            let file = await model.File.findOne(params)
            return file ? file.dataValues : {}   
        } catch (error) {
            console.log("[Repository][File] error on get one File", { params, error})
            throw Error(error)
        }

    },
    async getAll(params){
        try {
            return await model.File.findAll(params)  
        } catch (error) {
            console.log("[Repository][File] error on get all Files", { params, error})
            throw Error(error)
        }
    },
    async create(params){
        try {
            let file = await model.File.create(params)
            return file ? file.dataValues : {}   
        } catch (error) {
            console.log("[Repository][File] error on create File", { params, error})
            throw Error(error)
        }
    },
    async delete(params){
        try {
            return await model.File.destroy(params)
        } catch (error) {
            console.log("[Repository][File] error on delete File", { params, error})     
            throw Error(error)
        }
    },
    async update(values, options){
        try {
            return await model.File.update(values, options)
        } catch (error) {
            console.log("[Repository][File] error on update File", { params, error})        
            throw Error(error)
        }
    },
    model: model.File
}