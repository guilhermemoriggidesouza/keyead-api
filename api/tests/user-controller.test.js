const {  validateLoginHandler, getUsersHandler, createUserHandler, updateUserHandler, deleteUserHandler, } = require("../src/server/controller/user")
const userRepository = require("../src/repository/user");
const companyRepository = require("../src/repository/company");
const mock = require("./mock")

describe("[controller] tests userController", ()=> {
    let res;
    beforeEach(() => {
        res = mock.mockResponse()
    })

    test('[controller] validate login of client', async () => {
        let req = {
            user: mock.USER,
            body: { 
                email: "GuilhermeMoriggi@Souza.com",
                password: "teste123",
                alias: "qyon" 
            }
        }

        const getCompanyByAlias = jest.spyOn(companyRepository, 'getOne');
        const getUser = jest.spyOn(userRepository, 'getOne');
        
        getCompanyByAlias.mockReturnValue(new Promise((resolve, error) => resolve(mock.COMPANY)));
        getUser.mockReturnValue(new Promise((resolve, error) => resolve(mock.USER)));
        
        token = await validateLoginHandler(req, res)
        
        expect(token).not.toEqual("senha errada")
        expect(token).not.toEqual("login errado")
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toBeDefined();
    });

    test('[controller] wrong login', async () => {
        let req = {
            user: mock.USER,
            body: { 
                email: "GuilhermeMoriggi@Souza.com",
                password: "1",
                alias: "qyon" 
            }
        }

        const getCompanyByAlias = jest.spyOn(companyRepository, 'getOne');
        const getUser = jest.spyOn(userRepository, 'getOne');
        
        getCompanyByAlias.mockReturnValue(new Promise((resolve, error) => resolve(mock.COMPANY)));
        getUser.mockReturnValue(new Promise((resolve, error) => resolve(mock.USER)));
        
        token = await validateLoginHandler(req, res)
        
        expect(token).toEqual("senha errada")
        expect(token).not.toEqual("login errado")
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toBeDefined();
    });

    test('[controller] wrong password', async () => {
        let req = {
            user: mock.USER,
            body: { 
                email: "@Souza.com",
                password: "teste123",
                alias: "qyon" 
            }
        }

        const getCompanyByAlias = jest.spyOn(companyRepository, 'getOne');
        const getUser = jest.spyOn(userRepository, 'getOne');
        
        getCompanyByAlias.mockReturnValue(new Promise((resolve, error) => resolve(mock.COMPANY)));
        getUser.mockReturnValue(new Promise((resolve, error) => resolve(null)));
        
        token = await validateLoginHandler(req, res)
        
        expect(token).not.toEqual("senha errada")
        expect(token).toEqual("login errado")
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toBeDefined();
    });

    test('[controller] error on db validateing login of client', async () => {
        let req = {
            user: mock.USER,
            body: { 
                email: "GuilhermeMoriggi@Souza.com",
                password: "teste123",
                alias: "qyon" 
            }
        }

        const getCompanyByAlias = jest.spyOn(companyRepository, 'getOne');
        const getUser = jest.spyOn(userRepository, 'getOne');
        
        getCompanyByAlias.mockReturnValue(new Promise((resolve, error) => resolve(mock.COMPANY)));
        getUser.mockReturnValue(new Promise((resolve, error) => error({})));
        
        token = await validateLoginHandler(req, res)
        
        expect(res.status).toHaveBeenCalledWith(500);
    });
    
    test('[controller] create new user', async () => {
        let req = {
            header: (_) => "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJHdWlsaGVybWUiLCJzb2NpYWxSZWFzb24iOiJNb3JpZ2dpIiwiY25waiI6IjUzMTQxNTIyODIwIiwidGVsZWZvbmUiOiIxOTk4NDU0ODg4OSIsImVtYWlsIjoiR3VpbGhlcm1lTW9yaWdnaUBTb3V6YS5jb20iLCJwYXNzd29yZCI6Ijc0NjU3Mzc0NjUzMTMyMzMiLCJjYXRlZ29yeSI6IkEiLCJjb21wYW55SWQiOjEsImlhdCI6MTYyNjUzNzg3MH0.YcWutrb4zESE2kl1wJ0L2rtMyGMLkib64Tnu2gDZuHo",
            user: mock.USER,
            body: { 
                name: "Guilherme", 
                socialReason: "Moriggi", 
                cnpj: "53141522820", 
                telefone: "19984548889", 
                email: "GuilhermeMoriggi@gmail.com", 
                password: "teste123", 
                category: "A", 
            }
        }

        const createdUser = jest.spyOn(userRepository, 'create');
        createdUser.mockReturnValue(new Promise((resolve, error) => resolve(mock.USER)));
        
        await createUserHandler(req, res)
        
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ success: true, data: mock.USER });
    });

    test('[controller] error on db creating new user', async () => {
        let req = {
            header: (_) => "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJHdWlsaGVybWUiLCJzb2NpYWxSZWFzb24iOiJNb3JpZ2dpIiwiY25waiI6IjUzMTQxNTIyODIwIiwidGVsZWZvbmUiOiIxOTk4NDU0ODg4OSIsImVtYWlsIjoiR3VpbGhlcm1lTW9yaWdnaUBTb3V6YS5jb20iLCJwYXNzd29yZCI6Ijc0NjU3Mzc0NjUzMTMyMzMiLCJjYXRlZ29yeSI6IkEiLCJjb21wYW55SWQiOjEsImlhdCI6MTYyNjUzNzg3MH0.YcWutrb4zESE2kl1wJ0L2rtMyGMLkib64Tnu2gDZuHo",
            user: mock.USER,
            body: { 
                name: "Guilherme", 
                socialReason: "Moriggi", 
                cnpj: "53141522820", 
                telefone: "19984548889", 
                email: "GuilhermeMoriggi@gmail.com", 
                password: "teste123", 
                category: "A", 
            }
        }

        const createdUser = jest.spyOn(userRepository, 'create');
        createdUser.mockReturnValue(new Promise((resolve, error) => error({})));
        
        await createUserHandler(req, res)
        
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({});
    });
        
    test('[controller] get user by UserId', async () => {
        let req = {
            user: mock.USER,
            params: {
                userId: mock.USER.userId
            },
            header: (_)=> "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJHdWlsaGVybWUiLCJzb2NpYWxSZWFzb24iOiJNb3JpZ2dpIiwiY25waiI6IjUzMTQxNTIyODIwIiwidGVsZWZvbmUiOiIxOTk4NDU0ODg4OSIsImVtYWlsIjoiR3VpbGhlcm1lTW9yaWdnaUBTb3V6YS5jb20iLCJwYXNzd29yZCI6Ijc0NjU3Mzc0NjUzMTMyMzMiLCJjYXRlZ29yeSI6IkEiLCJjb21wYW55SWQiOjEsImlhdCI6MTYyNjUzNzg3MH0.YcWutrb4zESE2kl1wJ0L2rtMyGMLkib64Tnu2gDZuHo",
        }
        
        const user = jest.spyOn(userRepository, 'getAll');
        user.mockReturnValue(new Promise((resolve, error) => resolve(mock.USER)));

        await getUsersHandler(req, res)

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toBeDefined();
        expect(res.json).toHaveBeenCalledWith({ success: true, data: mock.USER })
    });

    test('[controller] error on db getting user by UserId', async () => {
        let req = {
            user: mock.USER,
            params: {
                userId: mock.USER.userId
            },
            header: (_)=> "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJHdWlsaGVybWUiLCJzb2NpYWxSZWFzb24iOiJNb3JpZ2dpIiwiY25waiI6IjUzMTQxNTIyODIwIiwidGVsZWZvbmUiOiIxOTk4NDU0ODg4OSIsImVtYWlsIjoiR3VpbGhlcm1lTW9yaWdnaUBTb3V6YS5jb20iLCJwYXNzd29yZCI6Ijc0NjU3Mzc0NjUzMTMyMzMiLCJjYXRlZ29yeSI6IkEiLCJjb21wYW55SWQiOjEsImlhdCI6MTYyNjUzNzg3MH0.YcWutrb4zESE2kl1wJ0L2rtMyGMLkib64Tnu2gDZuHo",
        }
        
        const user = jest.spyOn(userRepository, 'getAll');
        user.mockReturnValue(new Promise((resolve, error) => error({})));

        await getUsersHandler(req, res)

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({})
    });

    test('[controller] get users', async () => {
        let req = {
            user: mock.USER,
            params : {},
            header: (_)=> "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJHdWlsaGVybWUiLCJzb2NpYWxSZWFzb24iOiJNb3JpZ2dpIiwiY25waiI6IjUzMTQxNTIyODIwIiwidGVsZWZvbmUiOiIxOTk4NDU0ODg4OSIsImVtYWlsIjoiR3VpbGhlcm1lTW9yaWdnaUBTb3V6YS5jb20iLCJwYXNzd29yZCI6Ijc0NjU3Mzc0NjUzMTMyMzMiLCJjYXRlZ29yeSI6IkEiLCJjb21wYW55SWQiOjEsImlhdCI6MTYyNjUzNzg3MH0.YcWutrb4zESE2kl1wJ0L2rtMyGMLkib64Tnu2gDZuHo",
        }
        
        const user = jest.spyOn(userRepository, 'getAll');
        user.mockReturnValue(new Promise((resolve, error) => resolve([ mock.USER, mock.USER ])));

        await getUsersHandler(req, res)

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toBeDefined();
        expect(res.json).toHaveBeenCalledWith({ success: true, data: [ mock.USER, mock.USER ] })
    });

    test('[controller] error on db getting users', async () => {
        let req = {
            user: mock.USER,
            params : {},
            header: (_)=> "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJHdWlsaGVybWUiLCJzb2NpYWxSZWFzb24iOiJNb3JpZ2dpIiwiY25waiI6IjUzMTQxNTIyODIwIiwidGVsZWZvbmUiOiIxOTk4NDU0ODg4OSIsImVtYWlsIjoiR3VpbGhlcm1lTW9yaWdnaUBTb3V6YS5jb20iLCJwYXNzd29yZCI6Ijc0NjU3Mzc0NjUzMTMyMzMiLCJjYXRlZ29yeSI6IkEiLCJjb21wYW55SWQiOjEsImlhdCI6MTYyNjUzNzg3MH0.YcWutrb4zESE2kl1wJ0L2rtMyGMLkib64Tnu2gDZuHo",
        }
        
        const user = jest.spyOn(userRepository, 'getAll');
        user.mockReturnValue(new Promise((resolve, error) => error({})));

        await getUsersHandler(req, res)

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({})
    });
    
    test('[controller] update user', async () => {
        let req = {
            user: mock.USER,
            params: {
                userId: mock.USER.userId,
            },
            body: {
                newFields: {
                    name: "moriggi"
                }
            },
            header: (_)=> "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJHdWlsaGVybWUiLCJzb2NpYWxSZWFzb24iOiJNb3JpZ2dpIiwiY25waiI6IjUzMTQxNTIyODIwIiwidGVsZWZvbmUiOiIxOTk4NDU0ODg4OSIsImVtYWlsIjoiR3VpbGhlcm1lTW9yaWdnaUBTb3V6YS5jb20iLCJwYXNzd29yZCI6Ijc0NjU3Mzc0NjUzMTMyMzMiLCJjYXRlZ29yeSI6IkEiLCJjb21wYW55SWQiOjEsImlhdCI6MTYyNjUzNzg3MH0.YcWutrb4zESE2kl1wJ0L2rtMyGMLkib64Tnu2gDZuHo",
        }
        
        const updatedUser = jest.spyOn(userRepository, 'update');
        updatedUser.mockReturnValue(new Promise((resolve, error) => resolve([ 1 ])));
    
        await updateUserHandler(req, res)
    
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toBeDefined();
        expect(res.json).toHaveBeenCalledWith({ success: true, updated: 1 })
    })

    test('[controller]error on db updating user', async () => {
        let req = {
            user: mock.USER,
            params: {
                userId: mock.USER.userId,
            },
            body: {
                newFields: {
                    name: "moriggi"
                }
            },
            header: (_)=> "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJHdWlsaGVybWUiLCJzb2NpYWxSZWFzb24iOiJNb3JpZ2dpIiwiY25waiI6IjUzMTQxNTIyODIwIiwidGVsZWZvbmUiOiIxOTk4NDU0ODg4OSIsImVtYWlsIjoiR3VpbGhlcm1lTW9yaWdnaUBTb3V6YS5jb20iLCJwYXNzd29yZCI6Ijc0NjU3Mzc0NjUzMTMyMzMiLCJjYXRlZ29yeSI6IkEiLCJjb21wYW55SWQiOjEsImlhdCI6MTYyNjUzNzg3MH0.YcWutrb4zESE2kl1wJ0L2rtMyGMLkib64Tnu2gDZuHo",
        }
        
        const updatedUser = jest.spyOn(userRepository, 'update');
        updatedUser.mockReturnValue(new Promise((resolve, error) => error({})));
    
        await updateUserHandler(req, res)
    
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({})
    })
    
    test('[controller] delete user', async () => {
        let req = {
            user: mock.USER,
            params: {
                userId: mock.USER.userId
            },
            header: (_)=> "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJHdWlsaGVybWUiLCJzb2NpYWxSZWFzb24iOiJNb3JpZ2dpIiwiY25waiI6IjUzMTQxNTIyODIwIiwidGVsZWZvbmUiOiIxOTk4NDU0ODg4OSIsImVtYWlsIjoiR3VpbGhlcm1lTW9yaWdnaUBTb3V6YS5jb20iLCJwYXNzd29yZCI6Ijc0NjU3Mzc0NjUzMTMyMzMiLCJjYXRlZ29yeSI6IkEiLCJjb21wYW55SWQiOjEsImlhdCI6MTYyNjUzNzg3MH0.YcWutrb4zESE2kl1wJ0L2rtMyGMLkib64Tnu2gDZuHo",
        }
        
        const removedUser = jest.spyOn(userRepository, 'delete');
        removedUser.mockReturnValue(new Promise((resolve, error) => resolve(1)));
    
        await deleteUserHandler(req, res)
    
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toBeDefined();
        expect(res.json).toHaveBeenCalledWith({ success: true, removed: 1 })
    })

    test('[controller]error on db deleting user', async () => {
        let req = {
            user: mock.USER,
            params: {
                userId: mock.USER.userId
            },
            header: (_)=> "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJHdWlsaGVybWUiLCJzb2NpYWxSZWFzb24iOiJNb3JpZ2dpIiwiY25waiI6IjUzMTQxNTIyODIwIiwidGVsZWZvbmUiOiIxOTk4NDU0ODg4OSIsImVtYWlsIjoiR3VpbGhlcm1lTW9yaWdnaUBTb3V6YS5jb20iLCJwYXNzd29yZCI6Ijc0NjU3Mzc0NjUzMTMyMzMiLCJjYXRlZ29yeSI6IkEiLCJjb21wYW55SWQiOjEsImlhdCI6MTYyNjUzNzg3MH0.YcWutrb4zESE2kl1wJ0L2rtMyGMLkib64Tnu2gDZuHo",
        }
        
        const removedUser = jest.spyOn(userRepository, 'delete');
        removedUser.mockReturnValue(new Promise((resolve, error) => error({})));
    
        await deleteUserHandler(req, res)
    
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({})
    })
})