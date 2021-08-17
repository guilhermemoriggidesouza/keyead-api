const model = require("../models")

module.exports = {
    async getOne(params){
        try {
            return await model.Category.findOne(params)  
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
            model.Category.create(params)
        } catch (error) {
            console.log("[Repository][Category] error on create Category Course", { params, error})
            throw Error(error)
        }
    },
    async delete(params){
        try {
            model.Category.destroy(params)
        } catch (error) {
            console.log("[Repository][Category] error on delete Category Course", { params, error})     
            throw Error(error)
        }
    },
    async update(values, options){
        try {
            model.Category.update(values, options)
        } catch (error) {
            console.log("[Repository][Category] error on update Category Course", { params, error})        
            throw Error(error)
        }
    },
}