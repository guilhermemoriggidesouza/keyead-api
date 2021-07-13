const { validateLoginHandler, getUsersHandler, createUserHandler } = require("../server/controller/user-controller")
const companyService = require("../service/company");
const emailService = require("../service/email");
const userService = require("../service/user");
const hex = require('amrhextotext')

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};
let token = ""
const USER = {
    userId: 1,
    name: "Guilherme",
    socialReason: "Moriggi",
    cnpj: "53141522820",
    telefone: "19984548889",
    email: "GuilhermeMoriggi@Souza.com",
    password: hex.textToHex("teste123"),
    category: "A",
    companyId: 1
}

const COMPANY = {
    companyId: 1,
    alias: "qyon", 
    name: "qyon", 
    email: "qyon@qyon.com", 
    logo: null 
}

describe("[controller] tests userController", ()=> {

    test('[controller] validate login of client', async () => {
        const res = mockResponse()
        let req = {
            body: { 
                email: "GuilhermeMoriggi@Souza.com",
                password: "teste123",
                alias: "qyon" 
            }
        }

        const getCompanyByAlias = jest.spyOn(companyService, 'getCompanyByAlias');
        const getUser = jest.spyOn(userService, 'getUser');
        getCompanyByAlias.mockReturnValue(COMPANY);
        getUser.mockReturnValue(USER);

        token = await validateLoginHandler(req, res)
        expect(token).not.toEqual("senha errada")
        expect(token).not.toEqual("login errado")
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toBeDefined();
    });

    // test('[controller] create new user', async () => {
    //     const res = mockResponse()
    //     let req = {
    //         header: (_) => token,
    //         body: { 
    //             name: "Guilherme", 
    //             socialReason: "Moriggi", 
    //             cnpj: "53141522820", 
    //             telefone: "19984548889", 
    //             email: "GuilhermeMoriggi@gmail.com", 
    //             password: "teste123", 
    //             category: "A", 
    //         }
    //     }
    //     await createUserHandler(req, res)
    //     expect(res.status).toHaveBeenCalledWith(200);
    //     expect(res.json).toHaveBeenCalledWith(
    //         {
    //             userId: expect.any(Number),
    //             name: expect.any(String),
    //             email: expect.any(String),
    //             socialReason: expect.any(String), 
    //             cnpj: expect.any(String), 
    //             telefone: expect.any(String),
    //             password: expect.any(String),
    //             category: expect.any(String),
    //             companyId: expect.any(Number),
    //             updatedAt: expect.any(Date),
    //             createdAt: expect.any(Date)
    //         }
    //     );
    // });
    
    
    // test('[controller] get info user', async () => {
    //     const res = mockResponse()
    //     let req = {
    //         header: (_)=> token,
    //     }

    //     await getUsersHandler(req, res)

    //     expect(res.status).toHaveBeenCalledWith(200);
    //     expect(res.json).toBeDefined();
    //     expect(res.json.length).toBeGreaterThan(0)
    // });
})