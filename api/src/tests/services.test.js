const { createCompany } = require("../service/company");
const { createEmailConfig, getEmailConfigByCompany } = require("../service/email");
const { createUser, getUser } = require("../service/user");

describe("[service] tests companyService", () => {
    test('[companyService] create new company', async () => {
        const createdCompany = await createCompany({ name: "qyon", email: "qyon@qyon.com", logo: null })
        expect(createdCompany.dataValues).toEqual(
            {
                companyId: expect.any(Number),
                name: expect.any(String),
                email: expect.any(String),
                logo: null,
                updatedAt: expect.any(Date),
                createdAt: expect.any(Date)
            }
        );
    });
})

describe("[service] tests userService", () => {

    test('[userService] create new user', async () => {
        const createdUser = await createUser({
            name: "Guilherme",
            socialReason: "Moriggi",
            cnpj: "53141522820",
            telefone: "19984548889",
            email: "GuilhermeMoriggi@Souza.com",
            password: "teste123",
            category: "A",
            companyId: 1
        })
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
            email: "GuilhermeMoriggi@Souza.com",
            companyId: 1
        })
        expect(user).toEqual([
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
        ]);
    });

    test('[userService] getting user by id', async () => {
        const user = await createUser({
            userId: 1,
            companyId: 1
        })
        expect(user).toEqual([
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
        ]);
    });

    test('[userService] getting all users', async () => {
        const users = await createUser({
            companyId: 1
        })
        expect(users).toEqual([
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
        ]);
    });
})

describe("[service] tests emailService", () => {

    test('[emailService] create new email config', async () => {
        const createdEmailConfig = await createEmailConfig({ password: "qyon", email: "qyon@qyon.com", service: "gmail", port: "5437", companyId: 1 })
        expect(createdEmailConfig.dataValues).toEqual(
            {
                password: expect.any(String),
                email: expect.any(String),
                service: expect.any(String),
                port: expect.any(String),
                companyId: expect.any(Number)
            }
        );
    });

    test('[emailService] getting email config', async () => {
        const createdEmailConfig = await getEmailConfigByCompany({
            companyId: 1
        })
        expect(createdEmailConfig).toEqual([
            {
                password: expect.any(String),
                email: expect.any(String),
                service: expect.any(String),
                port: expect.any(String),
                companyId: expect.any(Number)
            }
        ]);
    });
})




