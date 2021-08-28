const {  getCourseHandler, createCourseHandler, updateCourseHandler, deleteCourseHandler, } = require("../src/server/controller/course")
const courseRepository = require("../src/repository/course");
const categoryCourseRepository = require("../src/repository/category-course")
const mock = require("./mock")

describe("[controller] tests course controller", ()=> {
    let res;
    beforeEach(() => {
        res = mock.mockResponse()
    })

    test('[controller] create new course', async () => {
        let req = {
            header: (_) => "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJHdWlsaGVybWUiLCJzb2NpYWxSZWFzb24iOiJNb3JpZ2dpIiwiY25waiI6IjUzMTQxNTIyODIwIiwidGVsZWZvbmUiOiIxOTk4NDU0ODg4OSIsImVtYWlsIjoiR3VpbGhlcm1lTW9yaWdnaUBTb3V6YS5jb20iLCJwYXNzd29yZCI6Ijc0NjU3Mzc0NjUzMTMyMzMiLCJjYXRlZ29yeSI6IkEiLCJjb21wYW55SWQiOjEsImlhdCI6MTYyNjUzNzg3MH0.YcWutrb4zESE2kl1wJ0L2rtMyGMLkib64Tnu2gDZuHo",
            user: mock.USER,
            body: { 
                name: "teste", 
                description: "teste de curso", 
                active: true, 
                certificated: true, 
                listCategory: [1, 2, 3]
            }
        }

        const createCourse = jest.spyOn(courseRepository, 'create');
        const createCategoryCourse = jest.spyOn(categoryCourseRepository, 'create');

        createCourse.mockReturnValue(new Promise((resolve, error) => resolve(mock.COURSE)));
        createCategoryCourse.mockReturnValue(new Promise((resolve, error) => resolve(mock.CATEGORY_COURSE)));
        
        await createCourseHandler(req, res)
        
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({success: true, data: mock.COURSE});
    });
        
        
    test('[controller] get course by courseCd', async () => {
        let req = {
            user: mock.USER,
            params: {
                userId: mock.USER.userId
            },
            header: (_)=> "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJHdWlsaGVybWUiLCJzb2NpYWxSZWFzb24iOiJNb3JpZ2dpIiwiY25waiI6IjUzMTQxNTIyODIwIiwidGVsZWZvbmUiOiIxOTk4NDU0ODg4OSIsImVtYWlsIjoiR3VpbGhlcm1lTW9yaWdnaUBTb3V6YS5jb20iLCJwYXNzd29yZCI6Ijc0NjU3Mzc0NjUzMTMyMzMiLCJjYXRlZ29yeSI6IkEiLCJjb21wYW55SWQiOjEsImlhdCI6MTYyNjUzNzg3MH0.YcWutrb4zESE2kl1wJ0L2rtMyGMLkib64Tnu2gDZuHo",
        }
        
        const user = jest.spyOn(courseRepository, 'getAll');
        user.mockReturnValue(new Promise((resolve, error) => resolve(mock.COURSE)));

        await getCourseHandler(req, res)

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toBeDefined();
        expect(res.json).toHaveBeenCalledWith({success: true, data: mock.COURSE})
    });

    test('[controller] get courses', async () => {
        let req = {
            user: mock.USER,
            params : {},
            header: (_)=> "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJHdWlsaGVybWUiLCJzb2NpYWxSZWFzb24iOiJNb3JpZ2dpIiwiY25waiI6IjUzMTQxNTIyODIwIiwidGVsZWZvbmUiOiIxOTk4NDU0ODg4OSIsImVtYWlsIjoiR3VpbGhlcm1lTW9yaWdnaUBTb3V6YS5jb20iLCJwYXNzd29yZCI6Ijc0NjU3Mzc0NjUzMTMyMzMiLCJjYXRlZ29yeSI6IkEiLCJjb21wYW55SWQiOjEsImlhdCI6MTYyNjUzNzg3MH0.YcWutrb4zESE2kl1wJ0L2rtMyGMLkib64Tnu2gDZuHo",
        }
        
        const user = jest.spyOn(courseRepository, 'getAll');
        user.mockReturnValue(new Promise((resolve, error) => resolve([ mock.COURSE, mock.COURSE ])));

        await getCourseHandler(req, res)

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toBeDefined();
        expect(res.json).toHaveBeenCalledWith({success: true, data: [ mock.COURSE, mock.COURSE ]})
    });
    
    test('[controller] update course', async () => {
        let req = {
            user: mock.USER,
            params: {
                courseId: mock.COURSE.courseId,
            },
            body: {
                newFields: {
                    name: "moriggi"
                }
            },
            header: (_)=> "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJHdWlsaGVybWUiLCJzb2NpYWxSZWFzb24iOiJNb3JpZ2dpIiwiY25waiI6IjUzMTQxNTIyODIwIiwidGVsZWZvbmUiOiIxOTk4NDU0ODg4OSIsImVtYWlsIjoiR3VpbGhlcm1lTW9yaWdnaUBTb3V6YS5jb20iLCJwYXNzd29yZCI6Ijc0NjU3Mzc0NjUzMTMyMzMiLCJjYXRlZ29yeSI6IkEiLCJjb21wYW55SWQiOjEsImlhdCI6MTYyNjUzNzg3MH0.YcWutrb4zESE2kl1wJ0L2rtMyGMLkib64Tnu2gDZuHo",
        }
        
        const updateCcourse = jest.spyOn(courseRepository, 'update');
        updateCcourse.mockReturnValue(new Promise((resolve, error) => resolve([ 1 ])));
    
        await updateCourseHandler(req, res)
    
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toBeDefined();
        expect(res.json).toHaveBeenCalledWith({success:true, updated: 1})
    })
    
    test('[controller] delete course', async () => {
        let req = {
            user: mock.USER,
            params: {
                courseId: mock.COURSE.courseId,
            },
            header: (_)=> "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJHdWlsaGVybWUiLCJzb2NpYWxSZWFzb24iOiJNb3JpZ2dpIiwiY25waiI6IjUzMTQxNTIyODIwIiwidGVsZWZvbmUiOiIxOTk4NDU0ODg4OSIsImVtYWlsIjoiR3VpbGhlcm1lTW9yaWdnaUBTb3V6YS5jb20iLCJwYXNzd29yZCI6Ijc0NjU3Mzc0NjUzMTMyMzMiLCJjYXRlZ29yeSI6IkEiLCJjb21wYW55SWQiOjEsImlhdCI6MTYyNjUzNzg3MH0.YcWutrb4zESE2kl1wJ0L2rtMyGMLkib64Tnu2gDZuHo",
        }
        
        const removeCcourse = jest.spyOn(courseRepository, 'delete');
        removeCcourse.mockReturnValue(new Promise((resolve, error) => resolve([ 1 ])));
    
        await deleteCourseHandler(req, res)
    
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toBeDefined();
        expect(res.json).toHaveBeenCalledWith({success: true, removed: 1})
    })
})