const classRepository = require("../../repository/class")
const userClassRepository = require("../../repository/user-class")
const userCourseRepository = require("../../repository/user-course")
const fileService = require("../../service/file")

const startClassVideo = async (req, res) => {
    try {
        const { classId } = req.params
        const { companyId, userId } = req.user

        const class_ = await classRepository.getOne({ classId, companyId })
        const course = await userCourseRepository.getOne({
            courseId: class_.courseId,
            companyId,
            userId
        })

        if(!course){
            res.status(400).send({error:"Usuário não associado ao curso"})
        }
        const createdUserClassAssociation = await userClassRepository.create({
            userId,
            companyId,
            classId,
            isFinished: false
        })

        res.status(200).send(createdUserClassAssociation)

    } catch (error) {
        res.status(500).json(error)
        console.log("[controller] error on streaming Class", error, req.body)
    }
}

const finishClassVideo = async (req, res) => {
    try {
        const { classId } = req.params
        const { companyId, userId } = req.user

        const userClass = await userClassRepository.getOne({ 
            where: { 
                classId, 
                companyId,
                userId
            }
        })
        if(!userClass){
            res.status(400).send({error:"Usuário não associado a aula"})
        }

        const updatedClassUser = await userClassRepository.update({isFinished: false}, {
            where: {
                userId,
                companyId,
                classId,
            }
        })

        res.status(200).send({ success: true, updated: updatedClassUser[0] })

    } catch (error) {
        res.status(500).json(error)
        console.log("[controller] error on streaming Class", error, req.body)
    }
}

const createClassHandler = async (req, res) => {
    try{
        const { name, description, video, duration, moduleId, courseId } = req.body
        const { companyId, userId } = req.user

        const createdVideo = await fileService.insertFile({ 
            name: `${name.replace(/ /g, "").replace(/./g, "").replace(/;/g, "").replace(/,/g, "")}-video`, 
            description: `video para aula: ${name.replace(/ /g, "").replace(/./g, "").replace(/;/g, "").replace(/,/g, "")}`, 
            companyId, 
            userId,
            buffer: Buffer.from(video.indexOf(",") != -1 ? video.split(",")[1] : video , "base64") 
        })

        const createdClass = await classRepository.create({
            name,
            description,
            fileId: createdVideo.fileId,
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
        let classes = await classRepository.getAll({
            limit: where.classId ? 1 : undefined,
            where,
        })

        if(!classes){
            res.status(400).json([])
            return
        }
        
        classes = await Promise.all(classes.map(async class_ => await fileService.parseKeyToUrl(class_)))

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
    startClassVideo,
    finishClassVideo
}