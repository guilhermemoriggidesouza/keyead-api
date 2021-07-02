const { createCompany, getCompanyByAlias } = require("../service/company");
const { createEmailConfig, getEmailConfigByCompany } = require("../service/email");
const { createUser, getUser } = require("../service/user");
const { v4: uuidv4 } = require("uuid")
const testRequest = uuidv4()

describe("CLEANING DATABASE", ()=>{
    const model = require("../models")
    
    model.User.sync({ force: true });
    model.Company.sync({ force: true });
    model.EmailConfig.sync({ force: true });
})

describe("[service] tests companyService", () => {
    
    test('[companyService] create new company', async () => {
        const createdCompany = await createCompany({ alias: "qyon", name: "qyon", email: "qyon@qyon.com", logo: null })
        
        expect(createdCompany.dataValues).toBeDefined();
        expect(createdCompany.dataValues).toEqual(
            {
                companyId: expect.any(Number),
                name: expect.any(String),
                alias: expect.any(String),
                email: expect.any(String),
                logo: null,
                updatedAt: expect.any(Date),
                createdAt: expect.any(Date)
            }
            );
        });
    })

    test('[companyService] get company by alias', async () => {
        const company = await getCompanyByAlias({
            alias: "qyon",
        })
        expect(company).toBeDefined();
        expect(company.length).toEqual({
            companyId: expect.any(Number),
            name: expect.any(String),
            alias: expect.any(String),
            email: expect.any(String),
            logo: null,
            updatedAt: expect.any(Date),
            createdAt: expect.any(Date)
        });
    })

describe("[service] tests userService", () => {

    test('[userService] create new user', async () => {
        const createdUser = await createUser({
            name: "Guilherme",
            socialReason: "Moriggi",
            cnpj: "53141522820",
            telefone: "19984548889",
            email: testRequest+"@Souza.com",
            password: "teste123",
            category: "A",
            companyId: 1
        })

        expect(createdUser.dataValues).toBeDefined();
        expect(createdUser.dataValues).toEqual(
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

    test('[userService] getting user by email', async () => {
        const user = await getUser({
            email: testRequest+"@Souza.com",
            companyId: 1
        })
        expect(user).toBeDefined();
        expect(user.length).toBeGreaterThan(0);
    });

    
    test('[userService] getting all users', async () => {
        const users = await getUser({
            companyId: 1
        })
        expect(users).toBeDefined();
        expect(users.length).toBeGreaterThan(0);
    });

    test('[userService] getting user by id', async () => {
        const user = await getUser({
            userId: 5,
            companyId: 1
        })
        expect(user).toBeDefined();
        expect(user.length).toBeGreaterThan(0);
    });
})

describe("[service] tests emailService", () => {

    test('[emailService] create new email config', async () => {
        const createdEmailConfig = await createEmailConfig({ password: "qyon", email: "qyon@qyon.com", secure: true, service: "gmail", port: "5437", companyId: 1 })
        
        expect(createdEmailConfig.dataValues).toBeDefined();
        expect(createdEmailConfig.dataValues).toEqual(
            {
                emailConfigId: expect.any(Number),
                companyId: expect.any(Number),
                password: expect.any(String),
                email: expect.any(String),
                service: expect.any(String),
                port: expect.any(String),
                secure: expect.any(Boolean),
                updatedAt: expect.any(Date),
                createdAt: expect.any(Date)
            }
        );
    });

    test('[emailService] getting email config', async () => {
        const createdEmailConfig = await getEmailConfigByCompany({
            companyId: 1
        })
        
        expect(createdEmailConfig).toBeDefined();
        expect(createdEmailConfig.length).toBeGreaterThan(0);
    });
})




