const hex = require('amrhextotext')

module.exports = {
    mockResponse: () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    },
    CATEGORY: {
        categoryId: 1,
        description: "teste",
        active: true,
        createdAt: "2021-08-11 21:28:00.000",
        updatedAt: "2021-08-11 21:28:00.000",
        companyId: 1,
    },
    CATEGORY_COURSE: {
        categoryCourseId: 1,
        courseId: 1,
        categoryId: 1,
        createdAt: "2021-08-11 21:28:00.000",
        updateAt: "2021-08-11 21:28:00.000",
        companyId: 1
    },
    COURSE: {
        courseId: 1,
        name: "teste",
        description: "teste de curso",
        active: true,
        certificated: true,
        listCategory: [1, 2, 3],
        companyId: 1,
        createdAt: "2021-08-11 21:28:00.000",
        updateAt: "2021-08-11 21:28:00.000"
    },
    USER: {
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
    COMPANY: {
        companyId: 1,
        alias: "qyon",
        name: "qyon",
        email: "qyon@qyon.com",
        logo: null
    },
    MODULE: {
        moduleId: 1,
        name: "MODULO 1",
        description: "TESTE",
        duration: 2000,
        courseId: 1,
        companyId: 1,
        createdAt: "2021-08-11 21:28:00.000",
        updateAt: "2021-08-11 21:28:00.000"
    },
    CLASS: {
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