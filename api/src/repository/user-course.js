const model = require("../models")

module.exports = {
    async getOne(params){
        try {
           let userCourse = await model.UserCourse.findOne(params)
           return userCourse ? userCourse.dataValues : {}
        } catch (error) {
            console.log("[Repository][UserCourse] error on get one UserCourse", { params, error})
            throw Error(error)
        }

    },
    async getAll(params){
        try {
            return await model.UserCourse.findAll(params)  
        } catch (error) {
            console.log("[Repository][UserCourse] error on get all UserCourses", { params, error})
            throw Error(error)
        }
    },
    async create(params){
        try {
            let userCourse = await model.UserCourse.create(params)
            return userCourse ? userCourse.dataValues : {}
        } catch (error) {
            console.log("[Repository][UserCourse] error on create UserCourse", { params, error})
            throw Error(error)
        }
    },
    async delete(params){
        try {
           return await model.UserCourse.destroy(params)
        } catch (error) {
            console.log("[Repository][UserCourse] error on delete UserCourse", { params, error})     
            throw Error(error)
        }
    },
    model: model.UserCourse
}