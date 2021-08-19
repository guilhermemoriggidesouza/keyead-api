const model = require("../models")

module.exports = {
    async getOne(params){
        try {
            let user = await model.User.findOne(params)
            return user ? user.dataValues : {}   
        } catch (error) {
            console.log("[Repository][User] error on get one User", { params, error})
            throw Error(error)
        }

    },
    async getAll(params){
        try {
            return await model.User.findAll(params)  
        } catch (error) {
            console.log("[Repository][User] error on get all Users", { params, error})
            throw Error(error)
        }
    },
    async create(params){
        try {
            let user = await model.User.create(params)
            return user ? user.dataValues : {}
        } catch (error) {
            console.log("[Repository][User] error on create User", { params, error})
            throw Error(error)
        }
    },
    async delete(params){
        try {
            return await model.User.destroy(params)
        } catch (error) {
            console.log("[Repository][User] error on delete User", { params, error})     
            throw Error(error)
        }
    },
    async update(values, options){
        try {
            return await model.User.update(values, options)
        } catch (error) {
            console.log("[Repository][User] error on update User", { params, error})        
            throw Error(error)
        }
    },
    model: model.User
}