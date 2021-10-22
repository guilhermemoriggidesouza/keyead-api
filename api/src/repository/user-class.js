const model = require("../models")

module.exports = {
    async getOne(params){
        try {
           let userClass = await model.UserClass.findOne(params)
           return userClass ? userClass.dataValues : {}
        } catch (error) {
            console.log("[Repository][UserClass] error on get one UserClass", { params, error})
            throw Error(error)
        }

    },
    async getAll(params){
        try {
            return await model.UserClass.findAll(params)  
        } catch (error) {
            console.log("[Repository][UserClass] error on get all UserClasss", { params, error})
            throw Error(error)
        }
    },
    async create(params){
        try {
            let userClass = await model.UserClass.create(params)
            return userClass ? userClass.dataValues : {}
        } catch (error) {
            console.log("[Repository][UserClass] error on create UserClass", { params, error})
            throw Error(error)
        }
    },
    async delete(params){
        try {
           return await model.UserClass.destroy(params)
        } catch (error) {
            console.log("[Repository][UserClass] error on delete UserClass", { params, error})     
            throw Error(error)
        }
    },
    async update(values, options){
        try {
            return await model.UserClass.update(values, options)
        } catch (error) {
            console.log("[Repository][UserClass] error on update UserClass ", { params, error})        
            throw Error(error)
        }
    },
    model: model.UserClass
}