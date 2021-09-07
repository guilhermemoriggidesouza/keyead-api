const { getCourseHandler, createCourseHandler, updateCourseHandler, deleteCourseHandler, } = require("../src/server/controller/course")
const courseRepository = require("../src/repository/course");
const fileService = require("../src/service/file");
const categoryCourseRepository = require("../src/repository/category-course")
const mock = require("./mock")

describe("[controller] tests course controller", () => {
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
                listCategory: [1, 2, 3],
                photo: "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"
            }
        }

        const createCourse = jest.spyOn(courseRepository, 'create');
        const createCategoryCourse = jest.spyOn(categoryCourseRepository, 'create');
        const createFile = jest.spyOn(fileService, 'insertFile');
        
        createFile.mockReturnValue({promise: ()=>new Promise((resolve, error) => resolve(mock.FILE))});
        createCourse.mockReturnValue(new Promise((resolve, error) => resolve(mock.COURSE)));
        createCategoryCourse.mockReturnValue(new Promise((resolve, error) => resolve(mock.CATEGORY_COURSE)));

        await createCourseHandler(req, res)

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ success: true, data: mock.COURSE });
    });
    
    test('[controller] error on db creating new course', async () => {
        let req = {
            header: (_) => "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJHdWlsaGVybWUiLCJzb2NpYWxSZWFzb24iOiJNb3JpZ2dpIiwiY25waiI6IjUzMTQxNTIyODIwIiwidGVsZWZvbmUiOiIxOTk4NDU0ODg4OSIsImVtYWlsIjoiR3VpbGhlcm1lTW9yaWdnaUBTb3V6YS5jb20iLCJwYXNzd29yZCI6Ijc0NjU3Mzc0NjUzMTMyMzMiLCJjYXRlZ29yeSI6IkEiLCJjb21wYW55SWQiOjEsImlhdCI6MTYyNjUzNzg3MH0.YcWutrb4zESE2kl1wJ0L2rtMyGMLkib64Tnu2gDZuHo",
            user: mock.USER,
            body: {
                "name": "teste",
                "description": "teste de curso",
                "active": true,
                "certificated": true,
                "listCategory": [1, 2, 3],
                "photo": "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"
            }
        }

        const createCourse = jest.spyOn(courseRepository, 'create');
        const createFile = jest.spyOn(fileService, 'insertFile');
        const createCategoryCourse = jest.spyOn(categoryCourseRepository, 'create');

        createFile.mockReturnValue({promise: ()=>new Promise((resolve, error) => error())});
        createCourse.mockReturnValue(new Promise((resolve, error) => error({})));
        createCategoryCourse.mockReturnValue(new Promise((resolve, error) => error({})));

        await createCourseHandler(req, res)

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({});
    });


    test('[controller] get course by courseId', async () => {
        let req = {
            user: mock.USER,
            params: {
                userId: mock.USER.userId
            },
            header: (_) => "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJHdWlsaGVybWUiLCJzb2NpYWxSZWFzb24iOiJNb3JpZ2dpIiwiY25waiI6IjUzMTQxNTIyODIwIiwidGVsZWZvbmUiOiIxOTk4NDU0ODg4OSIsImVtYWlsIjoiR3VpbGhlcm1lTW9yaWdnaUBTb3V6YS5jb20iLCJwYXNzd29yZCI6Ijc0NjU3Mzc0NjUzMTMyMzMiLCJjYXRlZ29yeSI6IkEiLCJjb21wYW55SWQiOjEsImlhdCI6MTYyNjUzNzg3MH0.YcWutrb4zESE2kl1wJ0L2rtMyGMLkib64Tnu2gDZuHo",
        }

        const user = jest.spyOn(courseRepository, 'getAll');
        user.mockReturnValue(new Promise((resolve, error) => resolve({
            ...mock.COURSE,
            Categories: [
                mock.CATEGORY,
                mock.CATEGORY,
            ]
        })));

        await getCourseHandler(req, res)

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toBeDefined();
        expect(res.json).toHaveBeenCalledWith({
            success: true, data: {
                ...mock.COURSE,
                Categories: [
                    mock.CATEGORY,
                    mock.CATEGORY,
                ]
            }
        })
    });

    test('[controller] error on getting course by courseId', async () => {
        let req = {
            user: mock.USER,
            params: {
                userId: mock.USER.userId
            },
            header: (_) => "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJHdWlsaGVybWUiLCJzb2NpYWxSZWFzb24iOiJNb3JpZ2dpIiwiY25waiI6IjUzMTQxNTIyODIwIiwidGVsZWZvbmUiOiIxOTk4NDU0ODg4OSIsImVtYWlsIjoiR3VpbGhlcm1lTW9yaWdnaUBTb3V6YS5jb20iLCJwYXNzd29yZCI6Ijc0NjU3Mzc0NjUzMTMyMzMiLCJjYXRlZ29yeSI6IkEiLCJjb21wYW55SWQiOjEsImlhdCI6MTYyNjUzNzg3MH0.YcWutrb4zESE2kl1wJ0L2rtMyGMLkib64Tnu2gDZuHo",
        }

        const user = jest.spyOn(courseRepository, 'getAll');
        user.mockReturnValue(new Promise((resolve, error) => error({})));

        await getCourseHandler(req, res)

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({})
    });

    test('[controller] get courses', async () => {
        let req = {
            user: mock.USER,
            params: {},
            header: (_) => "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJHdWlsaGVybWUiLCJzb2NpYWxSZWFzb24iOiJNb3JpZ2dpIiwiY25waiI6IjUzMTQxNTIyODIwIiwidGVsZWZvbmUiOiIxOTk4NDU0ODg4OSIsImVtYWlsIjoiR3VpbGhlcm1lTW9yaWdnaUBTb3V6YS5jb20iLCJwYXNzd29yZCI6Ijc0NjU3Mzc0NjUzMTMyMzMiLCJjYXRlZ29yeSI6IkEiLCJjb21wYW55SWQiOjEsImlhdCI6MTYyNjUzNzg3MH0.YcWutrb4zESE2kl1wJ0L2rtMyGMLkib64Tnu2gDZuHo",
        }

        const user = jest.spyOn(courseRepository, 'getAll');
        user.mockReturnValue(new Promise((resolve, error) => resolve([{
            ...mock.COURSE,
            Categories: [
                mock.CATEGORY,
                mock.CATEGORY,
            ]
        }, {
            ...mock.COURSE,
            Categories: [
                mock.CATEGORY,
                mock.CATEGORY,
            ]
        }])));

        await getCourseHandler(req, res)

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toBeDefined();
        expect(res.json).toHaveBeenCalledWith({
            success: true, data: [{
                ...mock.COURSE,
                Categories: [
                    mock.CATEGORY,
                    mock.CATEGORY,
                ]
            }, {
                ...mock.COURSE,
                Categories: [
                    mock.CATEGORY,
                    mock.CATEGORY,
                ]
            }]
        })
    });
    
    test('[controller] error on gettting courses', async () => {
        let req = {
            user: mock.USER,
            params: {},
            header: (_) => "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJHdWlsaGVybWUiLCJzb2NpYWxSZWFzb24iOiJNb3JpZ2dpIiwiY25waiI6IjUzMTQxNTIyODIwIiwidGVsZWZvbmUiOiIxOTk4NDU0ODg4OSIsImVtYWlsIjoiR3VpbGhlcm1lTW9yaWdnaUBTb3V6YS5jb20iLCJwYXNzd29yZCI6Ijc0NjU3Mzc0NjUzMTMyMzMiLCJjYXRlZ29yeSI6IkEiLCJjb21wYW55SWQiOjEsImlhdCI6MTYyNjUzNzg3MH0.YcWutrb4zESE2kl1wJ0L2rtMyGMLkib64Tnu2gDZuHo",
        }

        const user = jest.spyOn(courseRepository, 'getAll');
        user.mockReturnValue(new Promise((resolve, error) => error({})));

        await getCourseHandler(req, res)

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({})
    });

    test('[controller] error on db updatting without list category course', async () => {
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
            header: (_) => "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJHdWlsaGVybWUiLCJzb2NpYWxSZWFzb24iOiJNb3JpZ2dpIiwiY25waiI6IjUzMTQxNTIyODIwIiwidGVsZWZvbmUiOiIxOTk4NDU0ODg4OSIsImVtYWlsIjoiR3VpbGhlcm1lTW9yaWdnaUBTb3V6YS5jb20iLCJwYXNzd29yZCI6Ijc0NjU3Mzc0NjUzMTMyMzMiLCJjYXRlZ29yeSI6IkEiLCJjb21wYW55SWQiOjEsImlhdCI6MTYyNjUzNzg3MH0.YcWutrb4zESE2kl1wJ0L2rtMyGMLkib64Tnu2gDZuHo",
        }

        const updateCourse = jest.spyOn(courseRepository, 'update');
        updateCourse.mockReturnValue(new Promise((resolve, error) => error({})));

        await updateCourseHandler(req, res)

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({})
    })

    test('[controller] update without list category course', async () => {
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
            header: (_) => "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJHdWlsaGVybWUiLCJzb2NpYWxSZWFzb24iOiJNb3JpZ2dpIiwiY25waiI6IjUzMTQxNTIyODIwIiwidGVsZWZvbmUiOiIxOTk4NDU0ODg4OSIsImVtYWlsIjoiR3VpbGhlcm1lTW9yaWdnaUBTb3V6YS5jb20iLCJwYXNzd29yZCI6Ijc0NjU3Mzc0NjUzMTMyMzMiLCJjYXRlZ29yeSI6IkEiLCJjb21wYW55SWQiOjEsImlhdCI6MTYyNjUzNzg3MH0.YcWutrb4zESE2kl1wJ0L2rtMyGMLkib64Tnu2gDZuHo",
        }

        const updateCourse = jest.spyOn(courseRepository, 'update');
        updateCourse.mockReturnValue(new Promise((resolve, error) => resolve([1])));

        await updateCourseHandler(req, res)

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toBeDefined();
        expect(res.json).toHaveBeenCalledWith({ success: true, updated: 1 })
    })

    test('[controller] update with list category course', async () => {
        let req = {
            user: mock.USER,
            params: {
                courseId: mock.COURSE.courseId,
            },
            body: {
                newFields: {
                    name: "moriggi",
                    listCategory: [
                        1, 2
                    ]
                }
            },
            header: (_) => "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJHdWlsaGVybWUiLCJzb2NpYWxSZWFzb24iOiJNb3JpZ2dpIiwiY25waiI6IjUzMTQxNTIyODIwIiwidGVsZWZvbmUiOiIxOTk4NDU0ODg4OSIsImVtYWlsIjoiR3VpbGhlcm1lTW9yaWdnaUBTb3V6YS5jb20iLCJwYXNzd29yZCI6Ijc0NjU3Mzc0NjUzMTMyMzMiLCJjYXRlZ29yeSI6IkEiLCJjb21wYW55SWQiOjEsImlhdCI6MTYyNjUzNzg3MH0.YcWutrb4zESE2kl1wJ0L2rtMyGMLkib64Tnu2gDZuHo",
        }

        const updateCourse = jest.spyOn(courseRepository, 'update');
        updateCourse.mockReturnValue(new Promise((resolve, error) => resolve([1])));

        const removeCategoryCourse = jest.spyOn(categoryCourseRepository, 'delete');
        removeCategoryCourse.mockReturnValue(new Promise((resolve, error) =>  resolve(2)));
        
        const createCategoryCourse = jest.spyOn(categoryCourseRepository, 'create');
        createCategoryCourse.mockReturnValue(new Promise((resolve, error) => resolve(mock.CATEGORY_COURSE)));
        createCategoryCourse.mockReturnValue(new Promise((resolve, error) => resolve(mock.CATEGORY_COURSE)));
        

        await updateCourseHandler(req, res)
        
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toBeDefined();
        expect(res.json).toHaveBeenCalledWith({ success: true, updated: 1 })
    })

    test('[controller] delete course', async () => {
        let req = {
            user: mock.USER,
            params: {
                courseId: mock.COURSE.courseId,
            },
            header: (_) => "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJHdWlsaGVybWUiLCJzb2NpYWxSZWFzb24iOiJNb3JpZ2dpIiwiY25waiI6IjUzMTQxNTIyODIwIiwidGVsZWZvbmUiOiIxOTk4NDU0ODg4OSIsImVtYWlsIjoiR3VpbGhlcm1lTW9yaWdnaUBTb3V6YS5jb20iLCJwYXNzd29yZCI6Ijc0NjU3Mzc0NjUzMTMyMzMiLCJjYXRlZ29yeSI6IkEiLCJjb21wYW55SWQiOjEsImlhdCI6MTYyNjUzNzg3MH0.YcWutrb4zESE2kl1wJ0L2rtMyGMLkib64Tnu2gDZuHo",
        }
        
        const removeCourse = jest.spyOn(courseRepository, 'delete');
        removeCourse.mockReturnValue(new Promise((resolve, error) => resolve(1)));
        
        const removeCategoryCourse = jest.spyOn(categoryCourseRepository, 'delete');
        removeCategoryCourse.mockReturnValue(new Promise((resolve, error) =>  resolve(2)));

        await deleteCourseHandler(req, res)

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toBeDefined();
        expect(res.json).toHaveBeenCalledWith({ success: true, removed: 1 })
    })

    test('[controller] error on deleting course', async () => {
        let req = {
            user: mock.USER,
            params: {
                courseId: mock.COURSE.courseId,
            },
            header: (_) => "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJHdWlsaGVybWUiLCJzb2NpYWxSZWFzb24iOiJNb3JpZ2dpIiwiY25waiI6IjUzMTQxNTIyODIwIiwidGVsZWZvbmUiOiIxOTk4NDU0ODg4OSIsImVtYWlsIjoiR3VpbGhlcm1lTW9yaWdnaUBTb3V6YS5jb20iLCJwYXNzd29yZCI6Ijc0NjU3Mzc0NjUzMTMyMzMiLCJjYXRlZ29yeSI6IkEiLCJjb21wYW55SWQiOjEsImlhdCI6MTYyNjUzNzg3MH0.YcWutrb4zESE2kl1wJ0L2rtMyGMLkib64Tnu2gDZuHo",
        }
        
        const removeCourse = jest.spyOn(courseRepository, 'delete');
        removeCourse.mockReturnValue(new Promise((resolve, error) => resolve(1)));
        
        const removeCategoryCourse = jest.spyOn(categoryCourseRepository, 'delete');
        removeCategoryCourse.mockReturnValue(new Promise((resolve, error) =>  error({})));

        await deleteCourseHandler(req, res)

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({})
    })
})