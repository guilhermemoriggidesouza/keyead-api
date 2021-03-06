const courseRepository = require("../../repository/course")
const categoryCourseRepository = require("../../repository/category-course")
const userCourseRepository = require("../../repository/user-course")
const categoryRepository = require("../../repository/category")
const fileService = require("../../service/file")

const insertListCategoryInCourse = (listCategory, courseId, companyId) => {
    listCategory.forEach(categoryId => {
        categoryCourseRepository.create({
            categoryId,
            courseId,
            companyId
        })
    })
}

const createCourseHandler = async (req, res) => {
    try{
        const { name, description, photo, active, certificated, listCategory } = req.body
        const { companyId, userId } = req.user

        const createdFile = await fileService.insertFile({ 
            name: `curso-${name.replace(/ /g, "").replace(/./g, "").replace(/;/g, "").replace(/,/g, "")}-thumb`, 
            description: `thumb para curso: ${name.replace(/ /g, "").replace(/./g, "").replace(/;/g, "").replace(/,/g, "")}`, 
            companyId, 
            userId,
            buffer: Buffer.from(photo.indexOf(",") != -1 ? photo.split(",")[1] : photo , "base64") 
        })

        const createdCourse = await courseRepository.create({
            name,
            description,
            active,
            certificated,
            companyId,
            fileId: createdFile ? createdFile.fileId : ""
        })

        if(!createdCourse){
            res.status(200).json({})
            return
        }

        await userCourseRepository.create({
            userId, 
            companyId,
            courseId: createdCourse.courseId,
            responsable: true
        })

        insertListCategoryInCourse(listCategory, createdCourse.courseId, companyId)

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
        
        await categoryCourseRepository.delete({
            where: {
                courseId,
                companyId
            }
        })

        await userCourseRepository.delete({
            where: {
                courseId,
                companyId
            }
        })

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
        res.status(200).json({ success: true, removed: removedCourse })
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

        if(newFields.listCategory && newFields.listCategory.length > 0){
            await categoryCourseRepository.delete({
                where: {
                    courseId,
                    companyId
                }
            })
            insertListCategoryInCourse(newFields.listCategory, courseId, companyId)
        }

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