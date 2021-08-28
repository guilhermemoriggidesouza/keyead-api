const model = require("../models")

module.exports = {
    async getOne(params){
        try {
            let class_ = await model.Class.findOne(params)
            return class_ ? class_.dataValues : {}
        } catch (error) {
            console.log("[Repository][Class] error on get one Class ", { params, error})
            throw Error(error)
        }

    },
    async getAll(params){
        try {
            return await model.Class.findAll(params)  
        } catch (error) {
            console.log("[Repository][Class] error on get all Class ", { params, error})
            throw Error(error)
        }
    },
    async create(params){
        try {
            let class_ = await model.Class.create(params)
            return class_ ? class_.dataValues : {}
        } catch (error) {
            console.log("[Repository][Class] error on create Class ", { params, error})
            throw Error(error)
        }
    },
    async delete(params){
        try {
            return await model.Class.destroy(params)
        } catch (error) {
            console.log("[Repository][Class] error on delete Class ", { params, error})     
            throw Error(error)
        }
    },
    async update(values, options){
        try {
            return await model.Class.update(values, options)
        } catch (error) {
            console.log("[Repository][Class] error on update Class ", { params, error})        
            throw Error(error)
        }
    },
    model: model.Class
}