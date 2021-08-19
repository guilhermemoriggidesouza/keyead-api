const courseRepository = require("../../repository/course")
const categoryCourseRepository = require("../../repository/category-course")

const createCourseHandler = async (req, res) => {
    try{
        const { name, description, photoLink, active, certificated, listCategory } = req.body
        const { companyId } = req.user

        const createdCourse = await courseRepository.create({
            name,
            description,
            active,
            certificated,
            companyId,
            photoLink
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

        res.status(200).json(createdCourse)
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
        
        if(!removedCourse[0]){
            res.status(400).json({})
        }
        res.status(200).json({ removed: removedCourse[0] })
    } catch (error) {
        res.status(500).json(error)
        console.log("[controller] error on delete Course", error, req.body)
    }
}

const updateCourseHandler = async (req, res) =>{
    try{
        const { courseId, newFields } = req.body
        const { companyId } = req.user

        const updatedCourse = await courseRepository.update(newFields, {
            where: {
                companyId,
                courseId
            }
        })
        
        if(!updatedCourse[0]){
            res.status(400).json({})
        }
        
        res.status(200).json({ updated: updatedCourse[0]})
    } catch (error) {
        res.status(500).json(error)
        console.log("[controller] error on update course", error, req.body)
    }
}

const getCourseHandler = async (req, res) =>{
    try{
        const { companyId } = req.user
        let response
        const where = {
            companyId,
        }

        if(req.params.courseId) where.courseId = req.params.courseId
        const courses = courseRepository.getAll({
            limit: where.coursesId ? 1 : 0,
            where
        })

        if(!courses){
            res.status(400).json([])
            return
        }
        response = courses
        if(response.length == 1 ){
            response = response[0];
        }
        res.status(200).json(response)
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