const {  getClassHandler, createClassHandler, updateClassHandler, deleteClassHandler, } = require("../src/server/controller/class")
const classRepository = require("../src/repository/class");
const mock = require("./mock")

describe("[controller] tests class controller", ()=> {
    let res;
    beforeEach(() => {
        res = mock.mockResponse()
    })

    test('[controller] create new class', async () => {
        let req = {
            header: (_) => "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJHdWlsaGVybWUiLCJzb2NpYWxSZWFzb24iOiJNb3JpZ2dpIiwiY25waiI6IjUzMTQxNTIyODIwIiwidGVsZWZvbmUiOiIxOTk4NDU0ODg4OSIsImVtYWlsIjoiR3VpbGhlcm1lTW9yaWdnaUBTb3V6YS5jb20iLCJwYXNzd29yZCI6Ijc0NjU3Mzc0NjUzMTMyMzMiLCJjYXRlZ29yeSI6IkEiLCJjb21wYW55SWQiOjEsImlhdCI6MTYyNjUzNzg3MH0.YcWutrb4zESE2kl1wJ0L2rtMyGMLkib64Tnu2gDZuHo",
            user: mock.USER,
            body: { 
                "name": "TESTE",
                "description": "TESTE",
                "video": "video.mp4",
                "duration": 200,
                "moduleId": 1,
                "companyId": 1,
                "createdAt": "2021-08-11 21:28:00.000",
                "updateAt": "2021-08-11 21:28:00.000"
            }
        }

        const createClass = jest.spyOn(classRepository, 'create');
        createClass.mockReturnValue(new Promise((resolve, error) => resolve(mock.COURSE)));
        
        await createClassHandler(req, res)
        
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({success: true, data: mock.COURSE});
    });

    test('[controller] error on db creating new class', async () => {
        let req = {
            header: (_) => "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJHdWlsaGVybWUiLCJzb2NpYWxSZWFzb24iOiJNb3JpZ2dpIiwiY25waiI6IjUzMTQxNTIyODIwIiwidGVsZWZvbmUiOiIxOTk4NDU0ODg4OSIsImVtYWlsIjoiR3VpbGhlcm1lTW9yaWdnaUBTb3V6YS5jb20iLCJwYXNzd29yZCI6Ijc0NjU3Mzc0NjUzMTMyMzMiLCJjYXRlZ29yeSI6IkEiLCJjb21wYW55SWQiOjEsImlhdCI6MTYyNjUzNzg3MH0.YcWutrb4zESE2kl1wJ0L2rtMyGMLkib64Tnu2gDZuHo",
            user: mock.USER,
            body: { 
                classId: 1,
                name: "TESTE",
                description: "TESTE",
                video: "video.mp4",
                duration: 200,
                moduleId: 1,
                companyId: 1,
                createdAt: "2021-08-11 21:28:00.000",
                updateAt: "2021-08-11 21:28:00.000"
            }
        }

        const createClass = jest.spyOn(classRepository, 'create');
        createClass.mockReturnValue(new Promise((resolve, error) => error({})));
        
        await createClassHandler(req, res)
        
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({});
    });
        
    test('[controller] get class by classId', async () => {
        let req = {
            user: mock.USER,
            params: {
                userId: mock.CLASS.userId
            },
            header: (_)=> "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJHdWlsaGVybWUiLCJzb2NpYWxSZWFzb24iOiJNb3JpZ2dpIiwiY25waiI6IjUzMTQxNTIyODIwIiwidGVsZWZvbmUiOiIxOTk4NDU0ODg4OSIsImVtYWlsIjoiR3VpbGhlcm1lTW9yaWdnaUBTb3V6YS5jb20iLCJwYXNzd29yZCI6Ijc0NjU3Mzc0NjUzMTMyMzMiLCJjYXRlZ29yeSI6IkEiLCJjb21wYW55SWQiOjEsImlhdCI6MTYyNjUzNzg3MH0.YcWutrb4zESE2kl1wJ0L2rtMyGMLkib64Tnu2gDZuHo",
        }
        
        const user = jest.spyOn(classRepository, 'getAll');
        user.mockReturnValue(new Promise((resolve, error) => resolve(mock.CLASS)));

        await getClassHandler(req, res)

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toBeDefined();
        expect(res.json).toHaveBeenCalledWith({success: true, data: mock.CLASS})
    });

    test('[controller] error on getting class by classId', async () => {
        let req = {
            user: mock.USER,
            params: {
                userId: mock.CLASS.userId
            },
            header: (_)=> "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJHdWlsaGVybWUiLCJzb2NpYWxSZWFzb24iOiJNb3JpZ2dpIiwiY25waiI6IjUzMTQxNTIyODIwIiwidGVsZWZvbmUiOiIxOTk4NDU0ODg4OSIsImVtYWlsIjoiR3VpbGhlcm1lTW9yaWdnaUBTb3V6YS5jb20iLCJwYXNzd29yZCI6Ijc0NjU3Mzc0NjUzMTMyMzMiLCJjYXRlZ29yeSI6IkEiLCJjb21wYW55SWQiOjEsImlhdCI6MTYyNjUzNzg3MH0.YcWutrb4zESE2kl1wJ0L2rtMyGMLkib64Tnu2gDZuHo",
        }
        
        const user = jest.spyOn(classRepository, 'getAll');
        user.mockReturnValue(new Promise((resolve, error) => error({})));

        await getClassHandler(req, res)

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toBeDefined();
        expect(res.json).toHaveBeenCalledWith({})
    });

    test('[controller] get users', async () => {
        let req = {
            user: mock.USER,
            params : {},
        }
        
        const user = jest.spyOn(classRepository, 'getAll');
        user.mockReturnValue(new Promise((resolve, error) => resolve([ mock.CLASS, mock.CLASS ])));

        await getClassHandler(req, res)

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toBeDefined();
        expect(res.json).toHaveBeenCalledWith({success: true, data: [ mock.CLASS, mock.CLASS ]})
    });

    test('[controller] error on db get users', async () => {
        let req = {
            user: mock.USER,
            params : {},
        }
        
        const user = jest.spyOn(classRepository, 'getAll');
        user.mockReturnValue(new Promise((resolve, error) => error({})));

        await getClassHandler(req, res)

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({})
    });
    
    test('[controller] update user', async () => {
        let req = {
            user: mock.USER,
            params: {
                classId: mock.CLASS.classId,
            },
            body: {
                newFields: {
                    name: "moriggi"
                }
            },
            header: (_)=> "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJHdWlsaGVybWUiLCJzb2NpYWxSZWFzb24iOiJNb3JpZ2dpIiwiY25waiI6IjUzMTQxNTIyODIwIiwidGVsZWZvbmUiOiIxOTk4NDU0ODg4OSIsImVtYWlsIjoiR3VpbGhlcm1lTW9yaWdnaUBTb3V6YS5jb20iLCJwYXNzd29yZCI6Ijc0NjU3Mzc0NjUzMTMyMzMiLCJjYXRlZ29yeSI6IkEiLCJjb21wYW55SWQiOjEsImlhdCI6MTYyNjUzNzg3MH0.YcWutrb4zESE2kl1wJ0L2rtMyGMLkib64Tnu2gDZuHo",
        }
        
        const updateCclass = jest.spyOn(classRepository, 'update');
        updateCclass.mockReturnValue(new Promise((resolve, error) => resolve([ 1 ])));
    
        await updateClassHandler(req, res)
    
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toBeDefined();
        expect(res.json).toHaveBeenCalledWith({success:true, updated: 1})
    })
    
    test('[controller] error on db updating user', async () => {
        let req = {
            user: mock.USER,
            params: {
                classId: mock.CLASS.classId,
            },
            body: {
                newFields: {
                    name: "moriggi"
                }
            },
            header: (_)=> "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJHdWlsaGVybWUiLCJzb2NpYWxSZWFzb24iOiJNb3JpZ2dpIiwiY25waiI6IjUzMTQxNTIyODIwIiwidGVsZWZvbmUiOiIxOTk4NDU0ODg4OSIsImVtYWlsIjoiR3VpbGhlcm1lTW9yaWdnaUBTb3V6YS5jb20iLCJwYXNzd29yZCI6Ijc0NjU3Mzc0NjUzMTMyMzMiLCJjYXRlZ29yeSI6IkEiLCJjb21wYW55SWQiOjEsImlhdCI6MTYyNjUzNzg3MH0.YcWutrb4zESE2kl1wJ0L2rtMyGMLkib64Tnu2gDZuHo",
        }
        
        const updateCclass = jest.spyOn(classRepository, 'update');
        updateCclass.mockReturnValue(new Promise((resolve, error) => error({})));
    
        await updateClassHandler(req, res)
    
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({})
    })
    
    test('[controller] delete user', async () => {
        let req = {
            user: mock.USER,
            params: {
                classId: mock.CLASS.classId,
            },
            header: (_)=> "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJHdWlsaGVybWUiLCJzb2NpYWxSZWFzb24iOiJNb3JpZ2dpIiwiY25waiI6IjUzMTQxNTIyODIwIiwidGVsZWZvbmUiOiIxOTk4NDU0ODg4OSIsImVtYWlsIjoiR3VpbGhlcm1lTW9yaWdnaUBTb3V6YS5jb20iLCJwYXNzd29yZCI6Ijc0NjU3Mzc0NjUzMTMyMzMiLCJjYXRlZ29yeSI6IkEiLCJjb21wYW55SWQiOjEsImlhdCI6MTYyNjUzNzg3MH0.YcWutrb4zESE2kl1wJ0L2rtMyGMLkib64Tnu2gDZuHo",
        }
        
        const removeCclass = jest.spyOn(classRepository, 'delete');
        removeCclass.mockReturnValue(new Promise((resolve, error) => resolve(1)));
    
        await deleteClassHandler(req, res)
    
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toBeDefined();
        expect(res.json).toHaveBeenCalledWith({success: true, removed: 1})
    })

    test('[controller] error on deleting user', async () => {
        let req = {
            user: mock.USER,
            params: {
                classId: mock.CLASS.classId,
            },
            header: (_)=> "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJHdWlsaGVybWUiLCJzb2NpYWxSZWFzb24iOiJNb3JpZ2dpIiwiY25waiI6IjUzMTQxNTIyODIwIiwidGVsZWZvbmUiOiIxOTk4NDU0ODg4OSIsImVtYWlsIjoiR3VpbGhlcm1lTW9yaWdnaUBTb3V6YS5jb20iLCJwYXNzd29yZCI6Ijc0NjU3Mzc0NjUzMTMyMzMiLCJjYXRlZ29yeSI6IkEiLCJjb21wYW55SWQiOjEsImlhdCI6MTYyNjUzNzg3MH0.YcWutrb4zESE2kl1wJ0L2rtMyGMLkib64Tnu2gDZuHo",
        }
        
        const removeCclass = jest.spyOn(classRepository, 'delete');
        removeCclass.mockReturnValue(new Promise((resolve, error) => error({})));
    
        await deleteClassHandler(req, res)
    
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({})
    })
})