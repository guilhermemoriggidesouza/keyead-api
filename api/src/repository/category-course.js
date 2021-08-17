const model = require("../models")

module.exports = {
    async getOne(params){
        try {
            return await model.CategoryCourse.findOne(params)  
        } catch (error) {
            console.log("[Repository][CategoryCourse] error on get one CategoryCourse", { params, error})
            throw Error(error)
        }

    },
    async getAll(params){
        try {
            return await model.CategoryCourse.findAll(params)  
        } catch (error) {
            console.log("[Repository][CategoryCourse] error on get all CategoryCourses", { params, error})
            throw Error(error)
        }
    },
    async create(params){
        try {
            model.CategoryCourse.create(params)
        } catch (error) {
            console.log("[Repository][CategoryCourse] error on create CategoryCourse", { params, error})
            throw Error(error)
        }
    },
    async delete(params){
        try {
            model.CategoryCourse.destroy(params)
        } catch (error) {
            console.log("[Repository][CategoryCourse] error on delete CategoryCourse", { params, error})     
            throw Error(error)
        }
    },
}