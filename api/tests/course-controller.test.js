const {  validateLoginHandler, getUsersHandler, createUserHandler, updateUserHandler, deleteUserHandler, } = require("../src/server/controller/user-controller")
const userRepository = require("../src/repository/user");
const companyRepository = require("../src/repository/company");

const hex = require('amrhextotext')

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};
let token = ""
let mock = {
    COURSE: {

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

describe("[controller] tests userController", ()=> {
    let res;
    beforeEach(() => {
        res = mockResponse()
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
        
        getCompanyByAlias.mockReturnValue(mock.COMPANY);
        getUser.mockReturnValue(mock.USER);
        
        token = await validateLoginHandler(req, res)
        
        expect(token).not.toEqual("senha errada")
        expect(token).not.toEqual("login errado")
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toBeDefined();
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
        createdUser.mockReturnValue({ dataValues: mock.USER });
        
        await createUserHandler(req, res)
        
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mock.USER);
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
        user.mockReturnValue(mock.USER);

        await getUsersHandler(req, res)

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toBeDefined();
        expect(res.json).toHaveBeenCalledWith(mock.USER)
    });

    test('[controller] get users', async () => {
        let req = {
            user: mock.USER,
            header: (_)=> "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJHdWlsaGVybWUiLCJzb2NpYWxSZWFzb24iOiJNb3JpZ2dpIiwiY25waiI6IjUzMTQxNTIyODIwIiwidGVsZWZvbmUiOiIxOTk4NDU0ODg4OSIsImVtYWlsIjoiR3VpbGhlcm1lTW9yaWdnaUBTb3V6YS5jb20iLCJwYXNzd29yZCI6Ijc0NjU3Mzc0NjUzMTMyMzMiLCJjYXRlZ29yeSI6IkEiLCJjb21wYW55SWQiOjEsImlhdCI6MTYyNjUzNzg3MH0.YcWutrb4zESE2kl1wJ0L2rtMyGMLkib64Tnu2gDZuHo",
        }
        
        const user = jest.spyOn(userRepository, 'getAll');
        user.mockReturnValue([ mock.USER, mock.USER ]);

        await getUsersHandler(req, res)

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toBeDefined();
        expect(res.json).toHaveBeenCalledWith([ mock.USER, mock.USER ])
        expect(res.json).toHaveBeenCalledWith([ mock.USER, mock.USER ])
    });
    
    test('[controller] update user', async () => {
        let req = {
            user: mock.USER,
            body: {
                userId: mock.USER.userId,
                newFields: {
                    name: "moriggi"
                }
            },
            header: (_)=> "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJHdWlsaGVybWUiLCJzb2NpYWxSZWFzb24iOiJNb3JpZ2dpIiwiY25waiI6IjUzMTQxNTIyODIwIiwidGVsZWZvbmUiOiIxOTk4NDU0ODg4OSIsImVtYWlsIjoiR3VpbGhlcm1lTW9yaWdnaUBTb3V6YS5jb20iLCJwYXNzd29yZCI6Ijc0NjU3Mzc0NjUzMTMyMzMiLCJjYXRlZ29yeSI6IkEiLCJjb21wYW55SWQiOjEsImlhdCI6MTYyNjUzNzg3MH0.YcWutrb4zESE2kl1wJ0L2rtMyGMLkib64Tnu2gDZuHo",
        }
        
        const updatedUser = jest.spyOn(userRepository, 'update');
        updatedUser.mockReturnValue([ 1 ]);
    
        await updateUserHandler(req, res)
    
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toBeDefined();
        expect(res.json).toHaveBeenCalledWith({updated: 1})
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
        removedUser.mockReturnValue([ 1 ]);
    
        await deleteUserHandler(req, res)
    
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toBeDefined();
        expect(res.json).toHaveBeenCalledWith({removedUser: 1})
    })
})