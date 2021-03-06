const model = require("../models")

module.exports = {
    async getOne(params){
        try {
            let category = await model.Category.findOne(params)
            return category ? category.dataValues : {}
        } catch (error) {
            console.log("[Repository][Category] error on get one Category Course", { params, error})
            throw Error(error)
        }

    },
    async getAll(params){
        try {
            return await model.Category.findAll(params)  
        } catch (error) {
            console.log("[Repository][Category] error on get all Category Courses", { params, error})
            throw Error(error)
        }
    },
    async create(params){
        try {
            let category = await model.Category.create(params)
            return category ? category.dataValues : {}
        } catch (error) {
            console.log("[Repository][Category] error on create Category Course", { params, error})
            throw Error(error)
        }
    },
    async delete(params){
        try {
            return await model.Category.destroy(params)
        } catch (error) {
            console.log("[Repository][Category] error on delete Category Course", { params, error})     
            throw Error(error)
        }
    },
    async update(values, options){
        try {
            return await model.Category.update(values, options)
        } catch (error) {
            console.log("[Repository][Category] error on update Category Course", { params, error})        
            throw Error(error)
        }
    },
    model: model.Category
}