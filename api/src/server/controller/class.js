const courseRepository = require("../../repository/course")
const categoryClassRepository = require("../../repository/category-course")
const categoryRepository = require("../../repository/category")

const createClassHandler = async (req, res) => {
    try{
        const { name, description, photo, active, certificated, listCategory } = req.body
        const { companyId } = req.user

        const createdClass = await courseRepository.create({
            name,
            description,
            active,
            certificated,
            companyId,
            photo
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
        const { courseId } = req.params
        const { companyId } = req.user
 
        const removedClass = await courseRepository.delete({
            where: {
                courseId,
                companyId
            }
        })
        
        if(removedClass == 0){
            res.status(400).json({})
            return
        }
        res.status(200).json({ success: true, removed: removedClass[0] })
    } catch (error) {
        res.status(500).json(error)
        console.log("[controller] error on delete Class", error, req.body)
    }
}

const updateClassHandler = async (req, res) =>{
    try{
        const { courseId } = req.params
        const { newFields } = req.body
        const { companyId } = req.user

        const updatedClass = await courseRepository.update(newFields, {
            where: {
                companyId,
                courseId
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

        if(req.params.courseId) where.courseId = req.params.courseId
        const courses = await courseRepository.getAll({
            limit: where.coursesId ? 1 : undefined,
            where,
            include: [
                {
                    model: categoryRepository.model
                }
            ]
        })

        if(!courses){
            res.status(400).json([])
            return
        }
        res.status(200).json({ success: true, data: courses })
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