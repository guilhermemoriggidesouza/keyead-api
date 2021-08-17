const { getCategoryHandler, createCategoryHandler, updateCategoryHandler, deleteCategoryHandler, } = require("../src/server/controller/category-controller")
const categoryRepository = require("../src/repository/user");
const hex = require('amrhextotext')

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};
let mock = {
    CATEGORY: {
        categoryId: 1,
        description: "teste",
        active: true,
        createdAt: "2021-08-11 21:28:00.000",
        updatedAt: "2021-08-11 21:28:00.000",
        companyId: 1,
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

describe("[controller] tests Category Controller", ()=> {
    let res;
    beforeEach(() => {
        res = mockResponse()
    })

    test('[controller] create new category', async () => {
        let req = {
            header: (_) => "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJHdWlsaGVybWUiLCJzb2NpYWxSZWFzb24iOiJNb3JpZ2dpIiwiY25waiI6IjUzMTQxNTIyODIwIiwidGVsZWZvbmUiOiIxOTk4NDU0ODg4OSIsImVtYWlsIjoiR3VpbGhlcm1lTW9yaWdnaUBTb3V6YS5jb20iLCJwYXNzd29yZCI6Ijc0NjU3Mzc0NjUzMTMyMzMiLCJjYXRlZ29yeSI6IkEiLCJjb21wYW55SWQiOjEsImlhdCI6MTYyNjUzNzg3MH0.YcWutrb4zESE2kl1wJ0L2rtMyGMLkib64Tnu2gDZuHo",
            user: mock.USER,
            body: { 
                description: "Guilherme", 
                active: true, 
                companyId: 1, 
            }
        }

        const createdCategory = jest.spyOn(categoryRepository, 'create');
        createdCategory.mockReturnValue({ dataValues: mock.CATEGORY });
        
        await createCategoryHandler(req, res)
        
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mock.CATEGORY);
    });
        
        
    test('[controller] get user by CategoryId', async () => {
        let req = {
            user: mock.USER,
            params: {
                categoryId: mock.CATEGORY.categoryId
            },
            header: (_)=> "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJHdWlsaGVybWUiLCJzb2NpYWxSZWFzb24iOiJNb3JpZ2dpIiwiY25waiI6IjUzMTQxNTIyODIwIiwidGVsZWZvbmUiOiIxOTk4NDU0ODg4OSIsImVtYWlsIjoiR3VpbGhlcm1lTW9yaWdnaUBTb3V6YS5jb20iLCJwYXNzd29yZCI6Ijc0NjU3Mzc0NjUzMTMyMzMiLCJjYXRlZ29yeSI6IkEiLCJjb21wYW55SWQiOjEsImlhdCI6MTYyNjUzNzg3MH0.YcWutrb4zESE2kl1wJ0L2rtMyGMLkib64Tnu2gDZuHo",
        }
        
        const user = jest.spyOn(categoryRepository, 'getAll');
        user.mockReturnValue(mock.CATEGORY);

        await getCategoryHandler(req, res)

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toBeDefined();
        expect(res.json).toHaveBeenCalledWith(mock.CATEGORY)
    });

    test('[controller] get category', async () => {
        let req = {
            user: mock.USER,
            header: (_)=> "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJHdWlsaGVybWUiLCJzb2NpYWxSZWFzb24iOiJNb3JpZ2dpIiwiY25waiI6IjUzMTQxNTIyODIwIiwidGVsZWZvbmUiOiIxOTk4NDU0ODg4OSIsImVtYWlsIjoiR3VpbGhlcm1lTW9yaWdnaUBTb3V6YS5jb20iLCJwYXNzd29yZCI6Ijc0NjU3Mzc0NjUzMTMyMzMiLCJjYXRlZ29yeSI6IkEiLCJjb21wYW55SWQiOjEsImlhdCI6MTYyNjUzNzg3MH0.YcWutrb4zESE2kl1wJ0L2rtMyGMLkib64Tnu2gDZuHo",
        }
        
        const user = jest.spyOn(categoryRepository, 'getAll');
        user.mockReturnValue([ mock.CATEGORY, mock.CATEGORY ]);

        await getCategorysHandler(req, res)

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toBeDefined();
        expect(res.json).toHaveBeenCalledWith([ mock.CATEGORY, mock.CATEGORY ])
    });
    
    test('[controller] update category', async () => {
        let req = {
            user: mock.USER,
            body: {
                categoryId: mock.CATEGORY.categoryId,
                newFields: {
                    name: "moriggi"
                }
            },
            header: (_)=> "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJHdWlsaGVybWUiLCJzb2NpYWxSZWFzb24iOiJNb3JpZ2dpIiwiY25waiI6IjUzMTQxNTIyODIwIiwidGVsZWZvbmUiOiIxOTk4NDU0ODg4OSIsImVtYWlsIjoiR3VpbGhlcm1lTW9yaWdnaUBTb3V6YS5jb20iLCJwYXNzd29yZCI6Ijc0NjU3Mzc0NjUzMTMyMzMiLCJjYXRlZ29yeSI6IkEiLCJjb21wYW55SWQiOjEsImlhdCI6MTYyNjUzNzg3MH0.YcWutrb4zESE2kl1wJ0L2rtMyGMLkib64Tnu2gDZuHo",
        }
        
        const updatedCategory = jest.spyOn(categoryRepository, 'update');
        updatedCategory.mockReturnValue([ 1 ]);
    
        await updateCategoryHandler(req, res)
    
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toBeDefined();
        expect(res.json).toHaveBeenCalledWith({updated: 1})
    })
    
    test('[controller] delete category', async () => {
        let req = {
            user: mock.USER,
            params: {
                categoryId: mock.CATEGORY.categoryId
            },
            header: (_)=> "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJHdWlsaGVybWUiLCJzb2NpYWxSZWFzb24iOiJNb3JpZ2dpIiwiY25waiI6IjUzMTQxNTIyODIwIiwidGVsZWZvbmUiOiIxOTk4NDU0ODg4OSIsImVtYWlsIjoiR3VpbGhlcm1lTW9yaWdnaUBTb3V6YS5jb20iLCJwYXNzd29yZCI6Ijc0NjU3Mzc0NjUzMTMyMzMiLCJjYXRlZ29yeSI6IkEiLCJjb21wYW55SWQiOjEsImlhdCI6MTYyNjUzNzg3MH0.YcWutrb4zESE2kl1wJ0L2rtMyGMLkib64Tnu2gDZuHo",
        }
        
        const removedCategory = jest.spyOn(categoryRepository, 'delete');
        removedCategory.mockReturnValue([ 1 ]);
    
        await deleteCategoryHandler(req, res)
    
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toBeDefined();
        expect(res.json).toHaveBeenCalledWith({removed: 1})
    })
})