const courseRepository = require("../../repository/course")

const createModuleHandler = async (req, res) => {
    try{
        const { name, description, photo, active, certificated, listCategory } = req.body
        const { companyId } = req.user

        const createdModule = await courseRepository.create({
            name,
            description,
            active,
            certificated,
            companyId,
            photo
        })

        if(!createdModule){
            res.status(200).json({})
            return
        }
        
        res.status(200).json({ success: true, data: createdModule || {}})
    } catch (error) {
        res.status(500).json(error)
        console.log("[controller] error on create Module", error, req.body)
    }
}

const deleteModuleHandler = async (req, res) => {
    try{
        const { courseId } = req.params
        const { companyId } = req.user
 
        const removedModule = await courseRepository.delete({
            where: {
                courseId,
                companyId
            }
        })
        
        if(removedModule == 0){
            res.status(400).json({})
            return
        }
        res.status(200).json({ success: true, removed: removedModule[0] })
    } catch (error) {
        res.status(500).json(error)
        console.log("[controller] error on delete Module", error, req.body)
    }
}

const updateModuleHandler = async (req, res) =>{
    try{
        const { courseId } = req.params
        const { newFields } = req.body
        const { companyId } = req.user

        const updatedModule = await courseRepository.update(newFields, {
            where: {
                companyId,
                courseId
            }
        })
        
        if(!updatedModule[0]){
            res.status(400).json({})
            return
        }
        
        res.status(200).json({ success: true, updated: updatedModule[0]})
    } catch (error) {
        res.status(500).json(error)
        console.log("[controller] error on update course", error, req.body)
    }
}

const getModuleHandler = async (req, res) =>{
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
    createModuleHandler,
    deleteModuleHandler,
    getModuleHandler,
    updateModuleHandler,
}