const model = require("../models")

module.exports = {
    async getOne(params){
        try {
            let module = await model.Module.findOne(params)
            return module ? module.dataValues : {}
        } catch (error) {
            console.log("[Repository][Module] error on get one Module ", { params, error})
            throw Error(error)
        }

    },
    async getAll(params){
        try {
            return await model.Module.findAll(params)  
        } catch (error) {
            console.log("[Repository][Module] error on get all Module ", { params, error})
            throw Error(error)
        }
    },
    async create(params){
        try {
            let module = await model.Module.create(params)
            return module ? module.dataValues : {}
        } catch (error) {
            console.log("[Repository][Module] error on create Module ", { params, error})
            throw Error(error)
        }
    },
    async delete(params){
        try {
            return await model.Module.destroy(params)
        } catch (error) {
            console.log("[Repository][Module] error on delete Module ", { params, error})     
            throw Error(error)
        }
    },
    async update(values, options){
        try {
            return await model.Module.update(values, options)
        } catch (error) {
            console.log("[Repository][Module] error on update Module ", { params, error})        
            throw Error(error)
        }
    },
    model: model.Module
}