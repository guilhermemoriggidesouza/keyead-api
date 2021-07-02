const { validateLoginHandler, infoUserHandler, createUser } = require("../server/controller/user-controller")
const { v4: uuidv4 } = require("uuid")
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe("[controller] tests userController", ()=>{
    test('[controller] create new user', async () => {
        const res = mockResponse()
        let req = {
            body: { 
                name: "Guilherme", 
                socialReason: "Moriggi", 
                cnpj: "53141522820", 
                telefone: "19984548889", 
                email: uuidv4()+"@gmail.com", 
                password: "teste123", 
                category: "A", 
                companyId: 1 
            }
        }
        await createUser(req, res)
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            {
                userId: expect.any(Number),
                name: expect.any(String),
                email: expect.any(String),
                socialReason: expect.any(String), 
                cnpj: expect.any(String), 
                telefone: expect.any(String),
                password: expect.any(String),
                category: expect.any(String),
                companyId: expect.any(Number),
                updatedAt: expect.any(Date),
                createdAt: expect.any(Date)
            }
        );
    });
    
    test('[controller] validate login of client', async () => {
        const res = mockResponse()
        let req = {
            body: { 
                email: "GuilhermeMoriggi@Souza.com",
                password: "teste123",
                companyId: 1 
            }
        }

        await validateLoginHandler(req, res)

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toBeDefined();
        expect(res.json.length).toBeGreaterThan(0)
    });
    
    
    test('[controller] get info user', async () => {
        const res = mockResponse()
        let req = {
            params: { 
                companyId: 1 
            }
        }

        await infoUserHandler(req, res)

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toBeDefined();
        expect(res.json.length).toBeGreaterThan(0)
    });
})