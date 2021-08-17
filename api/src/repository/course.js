const model = require("../models")

module.exports = {
    async getOne(params){
        try {
            return await model.Course.findOne(params)  
        } catch (error) {
            console.log("[Repository][Course] error on get one Course", { params, error})
            throw Error(error)
        }

    },
    async getAll(params){
        try {
            return await model.Course.findAll(params)  
        } catch (error) {
            console.log("[Repository][Course] error on get all Courses", { params, error})
            throw Error(error)
        }
    },
    async create(params){
        try {
            model.Course.create(params)
        } catch (error) {
            console.log("[Repository][Course] error on create Course", { params, error})
            throw Error(error)
        }
    },
    async delete(params){
        try {
            model.Course.destroy(params)
        } catch (error) {
            console.log("[Repository][Course] error on delete Course", { params, error})     
            throw Error(error)
        }
    },
    async update(values, options){
        try {
            model.Course.update(values, options)
        } catch (error) {
            console.log("[Repository][Course] error on update Course", { params, error})        
            throw Error(error)
        }
    },
}