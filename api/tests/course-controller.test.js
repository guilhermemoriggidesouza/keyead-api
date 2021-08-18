const {  getCourseHandler, createCourseHandler, updateCourseHandler, deleteCourseHandler, } = require("../src/server/controller/course-controller")
const courseRepository = require("../src/repository/course");
const categoryCourseRepository = require("../src/repository/category-course")

const hex = require('amrhextotext')

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

let mock = {
    CATEGORY_COURSE : {
        categoryCourseId: 1,
        courseId: 1,
        categoryId: 1,
        createdAt: "2021-08-11 21:28:00.000",
        updateAt: "2021-08-11 21:28:00.000",
        companyId: 1
    },
    COURSE: {
        courseId: 1,
        name: "teste", 
        description: "teste de curso", 
        active: true, 
        certificated: true, 
        listCategory: [1, 2, 3],
        companyId: 1,
        createdAt: "2021-08-11 21:28:00.000",
        updateAt: "2021-08-11 21:28:00.000"
    },
    USER : {
        userId: 1,
        name: "Guilherme",
        socialReason: "Moriggi",
        cnpj: "53141522820",
        telefone: "19984548889",
        email: "GuilhermeMoriggi@Souza.com",
        password: hex.textToHex("teste123"),
        category: "A",
        companyId: 1,
        createdAt: "2021-08-11 21:28:00.000",
        updateAt: "2021-08-11 21:28:00.000"
    },
    COMPANY : {
        companyId: 1,
        alias: "qyon", 
        name: "qyon", 
        email: "qyon@qyon.com", 
        logo: null 
    }
}

describe("[controller] tests course controller", ()=> {
    let res;
    beforeEach(() => {
        res = mockResponse()
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

        createCourse.mockReturnValue(mock.COURSE);
        createCategoryCourse.mockReturnValue(mock.CATEGORY_COURSE);
        
        await createCourseHandler(req, res)
        
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mock.COURSE);
    });
        
        
    test('[controller] get user by courseCd', async () => {
        let req = {
            user: mock.USER,
            params: {
                userId: mock.USER.userId
            },
            header: (_)=> "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJHdWlsaGVybWUiLCJzb2NpYWxSZWFzb24iOiJNb3JpZ2dpIiwiY25waiI6IjUzMTQxNTIyODIwIiwidGVsZWZvbmUiOiIxOTk4NDU0ODg4OSIsImVtYWlsIjoiR3VpbGhlcm1lTW9yaWdnaUBTb3V6YS5jb20iLCJwYXNzd29yZCI6Ijc0NjU3Mzc0NjUzMTMyMzMiLCJjYXRlZ29yeSI6IkEiLCJjb21wYW55SWQiOjEsImlhdCI6MTYyNjUzNzg3MH0.YcWutrb4zESE2kl1wJ0L2rtMyGMLkib64Tnu2gDZuHo",
        }
        
        const user = jest.spyOn(courseRepository, 'getAll');
        user.mockReturnValue(mock.COURSE);

        await getCourseHandler(req, res)

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toBeDefined();
        expect(res.json).toHaveBeenCalledWith(mock.COURSE)
    });

    test('[controller] get users', async () => {
        let req = {
            user: mock.USER,
            header: (_)=> "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJHdWlsaGVybWUiLCJzb2NpYWxSZWFzb24iOiJNb3JpZ2dpIiwiY25waiI6IjUzMTQxNTIyODIwIiwidGVsZWZvbmUiOiIxOTk4NDU0ODg4OSIsImVtYWlsIjoiR3VpbGhlcm1lTW9yaWdnaUBTb3V6YS5jb20iLCJwYXNzd29yZCI6Ijc0NjU3Mzc0NjUzMTMyMzMiLCJjYXRlZ29yeSI6IkEiLCJjb21wYW55SWQiOjEsImlhdCI6MTYyNjUzNzg3MH0.YcWutrb4zESE2kl1wJ0L2rtMyGMLkib64Tnu2gDZuHo",
        }
        
        const user = jest.spyOn(courseRepository, 'getAll');
        user.mockReturnValue([ mock.COURSE, mock.COURSE ]);

        await getCourseHandler(req, res)

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toBeDefined();
        expect(res.json).toHaveBeenCalledWith([ mock.COURSE, mock.COURSE ])
    });
    
    test('[controller] update user', async () => {
        let req = {
            user: mock.USER,
            body: {
                courseId: mock.COURSE.courseId,
                newFields: {
                    name: "moriggi"
                }
            },
            header: (_)=> "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJHdWlsaGVybWUiLCJzb2NpYWxSZWFzb24iOiJNb3JpZ2dpIiwiY25waiI6IjUzMTQxNTIyODIwIiwidGVsZWZvbmUiOiIxOTk4NDU0ODg4OSIsImVtYWlsIjoiR3VpbGhlcm1lTW9yaWdnaUBTb3V6YS5jb20iLCJwYXNzd29yZCI6Ijc0NjU3Mzc0NjUzMTMyMzMiLCJjYXRlZ29yeSI6IkEiLCJjb21wYW55SWQiOjEsImlhdCI6MTYyNjUzNzg3MH0.YcWutrb4zESE2kl1wJ0L2rtMyGMLkib64Tnu2gDZuHo",
        }
        
        const updateCcourse = jest.spyOn(courseRepository, 'update');
        updateCcourse.mockReturnValue([ 1 ]);
    
        await updateCourseHandler(req, res)
    
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toBeDefined();
        expect(res.json).toHaveBeenCalledWith({updated: 1})
    })
    
    test('[controller] delete user', async () => {
        let req = {
            user: mock.USER,
            params: {
                courseId: mock.COURSE.courseId,
            },
            header: (_)=> "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJHdWlsaGVybWUiLCJzb2NpYWxSZWFzb24iOiJNb3JpZ2dpIiwiY25waiI6IjUzMTQxNTIyODIwIiwidGVsZWZvbmUiOiIxOTk4NDU0ODg4OSIsImVtYWlsIjoiR3VpbGhlcm1lTW9yaWdnaUBTb3V6YS5jb20iLCJwYXNzd29yZCI6Ijc0NjU3Mzc0NjUzMTMyMzMiLCJjYXRlZ29yeSI6IkEiLCJjb21wYW55SWQiOjEsImlhdCI6MTYyNjUzNzg3MH0.YcWutrb4zESE2kl1wJ0L2rtMyGMLkib64Tnu2gDZuHo",
        }
        
        const removeCcourse = jest.spyOn(courseRepository, 'delete');
        removeCcourse.mockReturnValue([ 1 ]);
    
        await deleteCourseHandler(req, res)
    
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toBeDefined();
        expect(res.json).toHaveBeenCalledWith({removed: 1})
    })
})