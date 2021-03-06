const categoryRepository = require("../../repository/category")
const courseRepository = require("../../repository/course")

const createCategoryHandler = async (req, res) => {
    try{
        const { description, active } = req.body
        const { companyId } = req.user

        const createdCategory = await categoryRepository.create({
            description,
            active,
            companyId
        })

        res.status(200).json({success: true, data: createdCategory || {}})
    } catch (error) {
        res.status(500).json(error)
        console.log("[controller] error on create Category", error, req.body)
    }
}

const deleteCategoryHandler = async (req, res) => {
    try{
        const { categoryId } = req.params
        const { companyId } = req.user
 
        const removedUser = await categoryRepository.delete({
            where: {
                categoryId,
                companyId
            }
        })
        
        if(removedUser == 0){
            res.status(400).json({})
            return
        }
        res.status(200).json({ success: true, removed: removedUser })
    } catch (error) {
        res.status(500).json(error)
        console.log("[controller] error on delete Category", error, req.body)
    }

}

const updateCategoryHandler = async (req, res) =>{
    try{
        const { categoryId } = req.params
        const { newFields } = req.body
        const { companyId } = req.user

        const updatedCategory = await categoryRepository.update(newFields, {
            where: {
                companyId,
                categoryId
            }
        })
        
        if(!updatedCategory[0]){
            res.status(400).json({})
            return
        }
        
        res.status(200).json({ success: true, updated: updatedCategory[0]})
    } catch (error) {
        res.status(500).json(error)
        console.log("[controller] error on update Category", error, req.body)
    }
    
}

const getCategoryHandler = async (req, res) =>{
    try{
        const { companyId } = req.user
        let response
        const where = {
            companyId,
        }

        if(req.params.categoryId) where.categoryId = req.params.categoryId
        const category = await categoryRepository.getAll({
            limit: where.categoryId ? 1 : undefined,
            where
        })

        if(!category){
            res.status(400).json([])
            return
        }
        res.status(200).json({success: true, data: category})
    } catch (error) {
        res.status(500).json(error)
        console.log("[controller] error on get Category", error, req.body)
    }
}

module.exports = {
    createCategoryHandler,
    deleteCategoryHandler,
    getCategoryHandler,
    updateCategoryHandler,
}