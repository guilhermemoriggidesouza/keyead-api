const {  getModuleHandler, createModuleHandler, updateModuleHandler, deleteModuleHandler, } = require("../src/server/controller/module")
const moduleRepository = require("../src/repository/module");
const mock = require("./mock")

describe("[controller] tests module controller", ()=> {
    let res;
    beforeEach(() => {
        res = mock.mockResponse()
    })

    test('[controller] create new module', async () => {
        let req = {
            header: (_) => "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJHdWlsaGVybWUiLCJzb2NpYWxSZWFzb24iOiJNb3JpZ2dpIiwiY25waiI6IjUzMTQxNTIyODIwIiwidGVsZWZvbmUiOiIxOTk4NDU0ODg4OSIsImVtYWlsIjoiR3VpbGhlcm1lTW9yaWdnaUBTb3V6YS5jb20iLCJwYXNzd29yZCI6Ijc0NjU3Mzc0NjUzMTMyMzMiLCJjYXRlZ29yeSI6IkEiLCJjb21wYW55SWQiOjEsImlhdCI6MTYyNjUzNzg3MH0.YcWutrb4zESE2kl1wJ0L2rtMyGMLkib64Tnu2gDZuHo",
            user: mock.USER,
            body: {
                name: "MODULO 1",
                description: "TESTE",
                courseId: 1,
            }
        }

        const createModule = jest.spyOn(moduleRepository, 'create');
        createModule.mockReturnValue(new Promise((resolve, error) => resolve(mock.MODULE)));
        
        await createModuleHandler(req, res)
        
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({success: true, data: mock.MODULE});
    });
        
        
    test('[controller] get modules by moduleId', async () => {
        let req = {
            user: mock.USER,
            params: {
                userId: mock.MODULE.moduleId
            },
        }
        
        const user = jest.spyOn(moduleRepository, 'getAll');
        user.mockReturnValue(new Promise((resolve, error) => resolve(mock.MODULE)));

        await getModuleHandler(req, res)

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toBeDefined();
        expect(res.json).toHaveBeenCalledWith({success: true, data: mock.MODULE})
    });

    test('[controller] get modules', async () => {
        let req = {
            user: mock.USER,
            params : {},
            header: (_)=> "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJHdWlsaGVybWUiLCJzb2NpYWxSZWFzb24iOiJNb3JpZ2dpIiwiY25waiI6IjUzMTQxNTIyODIwIiwidGVsZWZvbmUiOiIxOTk4NDU0ODg4OSIsImVtYWlsIjoiR3VpbGhlcm1lTW9yaWdnaUBTb3V6YS5jb20iLCJwYXNzd29yZCI6Ijc0NjU3Mzc0NjUzMTMyMzMiLCJjYXRlZ29yeSI6IkEiLCJjb21wYW55SWQiOjEsImlhdCI6MTYyNjUzNzg3MH0.YcWutrb4zESE2kl1wJ0L2rtMyGMLkib64Tnu2gDZuHo",
        }
        
        const user = jest.spyOn(moduleRepository, 'getAll');
        user.mockReturnValue(new Promise((resolve, error) => resolve([ mock.COURSE, mock.COURSE ])));

        await getModuleHandler(req, res)

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toBeDefined();
        expect(res.json).toHaveBeenCalledWith({success: true, data: [ mock.COURSE, mock.COURSE ]})
    });
    
    test('[controller] update module', async () => {
        let req = {
            user: mock.USER,
            params: {
                moduleId: mock.MODULE.moduleId,
            },
            body: {
                newFields: {
                    name: "moriggi"
                }
            },
            header: (_)=> "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJHdWlsaGVybWUiLCJzb2NpYWxSZWFzb24iOiJNb3JpZ2dpIiwiY25waiI6IjUzMTQxNTIyODIwIiwidGVsZWZvbmUiOiIxOTk4NDU0ODg4OSIsImVtYWlsIjoiR3VpbGhlcm1lTW9yaWdnaUBTb3V6YS5jb20iLCJwYXNzd29yZCI6Ijc0NjU3Mzc0NjUzMTMyMzMiLCJjYXRlZ29yeSI6IkEiLCJjb21wYW55SWQiOjEsImlhdCI6MTYyNjUzNzg3MH0.YcWutrb4zESE2kl1wJ0L2rtMyGMLkib64Tnu2gDZuHo",
        }
        
        const updateCmodule = jest.spyOn(moduleRepository, 'update');
        updateCmodule.mockReturnValue(new Promise((resolve, error) => resolve([ 1 ])));
    
        await updateModuleHandler(req, res)
    
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toBeDefined();
        expect(res.json).toHaveBeenCalledWith({success:true, updated: 1})
    })
    
    test('[controller] delete module', async () => {
        let req = {
            user: mock.USER,
            params: {
                moduleId: mock.MODULE.moduleId,
            },
            header: (_)=> "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJHdWlsaGVybWUiLCJzb2NpYWxSZWFzb24iOiJNb3JpZ2dpIiwiY25waiI6IjUzMTQxNTIyODIwIiwidGVsZWZvbmUiOiIxOTk4NDU0ODg4OSIsImVtYWlsIjoiR3VpbGhlcm1lTW9yaWdnaUBTb3V6YS5jb20iLCJwYXNzd29yZCI6Ijc0NjU3Mzc0NjUzMTMyMzMiLCJjYXRlZ29yeSI6IkEiLCJjb21wYW55SWQiOjEsImlhdCI6MTYyNjUzNzg3MH0.YcWutrb4zESE2kl1wJ0L2rtMyGMLkib64Tnu2gDZuHo",
        }
        
        const removeCmodule = jest.spyOn(moduleRepository, 'delete');
        removeCmodule.mockReturnValue(new Promise((resolve, error) => resolve([ 1 ])));
    
        await deleteModuleHandler(req, res)
    
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toBeDefined();
        expect(res.json).toHaveBeenCalledWith({success: true, removed: 1})
    })
})