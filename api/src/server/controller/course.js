const courseRepository = require("../../repository/course")
const categoryCourseRepository = require("../../repository/category-course")
const categoryRepository = require("../../repository/category")

const createCourseHandler = async (req, res) => {
    try{
        const { name, description, photo, active, certificated, listCategory } = req.body
        const { companyId } = req.user

        const createdCourse = await courseRepository.create({
            name,
            description,
            active,
            certificated,
            companyId,
            photo
        })

        if(!createdCourse){
            res.status(200).json({})
            return
        }
        
        listCategory.forEach(categoryId => {
            categoryCourseRepository.create({
                categoryId,
                courseId: createdCourse.courseId,
                companyId
            })
        })

        res.status(200).json({ success: true, data: createdCourse || {}})
    } catch (error) {
        res.status(500).json(error)
        console.log("[controller] error on create Course", error, req.body)
    }
}

const deleteCourseHandler = async (req, res) => {
    try{
        const { courseId } = req.params
        const { companyId } = req.user
 
        const removedCourse = await courseRepository.delete({
            where: {
                courseId,
                companyId
            }
        })
        
        if(removedCourse == 0){
            res.status(400).json({})
            return
        }
        res.status(200).json({ success: true, removed: removedCourse[0] })
    } catch (error) {
        res.status(500).json(error)
        console.log("[controller] error on delete Course", error, req.body)
    }
}

const updateCourseHandler = async (req, res) =>{
    try{
        const { courseId } = req.params
        const { newFields } = req.body
        const { companyId } = req.user

        const updatedCourse = await courseRepository.update(newFields, {
            where: {
                companyId,
                courseId
            }
        })
        
        if(!updatedCourse[0]){
            res.status(400).json({})
            return
        }
        
        res.status(200).json({ success: true, updated: updatedCourse[0]})
    } catch (error) {
        res.status(500).json(error)
        console.log("[controller] error on update course", error, req.body)
    }
}

const getCourseHandler = async (req, res) =>{
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
    createCourseHandler,
    deleteCourseHandler,
    getCourseHandler,
    updateCourseHandler,
}