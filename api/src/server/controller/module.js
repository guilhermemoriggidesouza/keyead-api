const moduleRepository = require("../../repository/module")

const createModuleHandler = async (req, res) => {
    try{
        const { 
            name,
            description,
            moduleId,
        } = req.body
        const { companyId } = req.user

        const createdModule = await moduleRepository.create({
            name,
            description,
            moduleId,
            companyId,
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
        const { moduleId } = req.params
        const { companyId } = req.user
 
        const removedModule = await moduleRepository.delete({
            where: {
                moduleId,
                companyId
            }
        })
        
        if(removedModule == 0){
            res.status(400).json({})
            return
        }
        res.status(200).json({ success: true, removed: removedModule })
    } catch (error) {
        res.status(500).json(error)
        console.log("[controller] error on delete Module", error, req.body)
    }
}

const updateModuleHandler = async (req, res) =>{
    try{
        const { moduleId } = req.params
        const { newFields } = req.body
        const { companyId } = req.user

        const updatedModule = await moduleRepository.update(newFields, {
            where: {
                companyId,
                moduleId
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

        if(req.params.moduleId) where.moduleId = req.params.moduleId
        const courses = await moduleRepository.getAll({
            limit: where.coursesId ? 1 : undefined,
            where,
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