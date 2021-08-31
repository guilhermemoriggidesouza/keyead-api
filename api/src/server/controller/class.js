const classRepository = require("../../repository/class")
const categoryRepository = require("../../repository/category")

const createClassHandler = async (req, res) => {
    try{
        const { name, description, video, duration, moduleId, } = req.body
        const { companyId } = req.user

        const createdClass = await classRepository.create({
            name,
            description,
            video,
            duration,
            moduleId,
            companyId
        })

        if(!createdClass){
            res.status(200).json({})
            return
        }
        
        res.status(200).json({ success: true, data: createdClass || {}})
    } catch (error) {
        res.status(500).json(error)
        console.log("[controller] error on create Class", error, req.body)
    }
}

const deleteClassHandler = async (req, res) => {
    try{
        const { classId } = req.params
        const { companyId } = req.user
 
        const removedClass = await classRepository.delete({
            where: {
                classId,
                companyId
            }
        })
        
        if(removedClass == 0){
            res.status(400).json({})
            return
        }
        res.status(200).json({ success: true, removed: removedClass })
    } catch (error) {
        res.status(500).json(error)
        console.log("[controller] error on delete Class", error, req.body)
    }
}

const updateClassHandler = async (req, res) =>{
    try{
        const { classId } = req.params
        const { newFields } = req.body
        const { companyId } = req.user

        const updatedClass = await classRepository.update(newFields, {
            where: {
                companyId,
                classId
            }
        })
        
        if(!updatedClass[0]){
            res.status(400).json({})
            return
        }
        
        res.status(200).json({ success: true, updated: updatedClass[0]})
    } catch (error) {
        res.status(500).json(error)
        console.log("[controller] error on update course", error, req.body)
    }
}

const getClassHandler = async (req, res) =>{
    try{
        const { companyId } = req.user
        const where = {
            companyId,
        }

        if(req.params.classId) where.classId = req.params.classId
        const classes = await classRepository.getAll({
            limit: where.classId ? 1 : undefined,
            where,
        })

        if(!classes){
            res.status(400).json([])
            return
        }
        res.status(200).json({ success: true, data: classes })
    } catch (error) {
        res.status(500).json(error)
        console.log("[controller] error on get Category", error, req.body)
    }
}

module.exports = {
    createClassHandler,
    deleteClassHandler,
    getClassHandler,
    updateClassHandler,
}