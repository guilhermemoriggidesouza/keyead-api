const { validateLoginHandler, infoUserHandler, createUser } = require("../server/controller/userController")

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
                email: "Guilherme Moriggi de Souza", 
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
    
    // test('[controller] validate login of client', async () => {
    //     const createdCompany = await validateLoginHandler({ body: { tenant:"keyad", password: "123", }}, mockResponse())
    //     console.log()
    //     expect(createdCompany.dataValues).toEqual(
    //         // {
    //         //     companyId: expect.any(Number),
    //         //     name: expect.any(String),
    //         //     email: expect.any(String),
    //         //     logo: null,
    //         //     updatedAt: expect.any(Date),
    //         //     createdAt: expect.any(Date)
    //         // }
    //     );
    // });
    
    
    // test('[controller] get info user', async () => {
    //     const createdCompany = await createCompany({name: "qyon", email: "qyon@qyon.com", logo: null})
    //     expect(createdCompany.dataValues).toEqual(
    //         {
    //             companyId: expect.any(Number),
    //             name: expect.any(String),
    //             email: expect.any(String),
    //             logo: null,
    //             updatedAt: expect.any(Date),
    //             createdAt: expect.any(Date)
    //         }
    //     );
    // });
})