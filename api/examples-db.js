const categoryRepository = require("./src/repository/category");
const courseRepository = require("./src/repository/course");
const moduleRepository = require("./src/repository/module");
const companyRepository = require("./src/repository/company");
const userRepository = require("./src/repository/user");
const hex = require('amrhextotext')

const rundb = async () => {
    await companyRepository.create({
        name: "local",
        alias: "local",
        logo: "",
        email: "teste@gmail.com",
        bucketName: "teste-company",
    })
    
    await userRepository.create({
        name: "Guilherme", 
        socialReason: "Moriggi", 
        cnpj: "53141522820", 
        telefone: "19984548889", 
        email: "GuilhermeMoriggi@gmail.com1", 
        password: hex.textToHex("teste123"), 
        category: "A", 
        companyId: 1, 
    })
    
    await categoryRepository.create({
        description: "Guilherme", 
        active: true, 
        companyId: 1, 
    })
    
    await courseRepository.create({
        name: "teste", 
        description: "teste de curso", 
        active: true, 
        certificated: true, 
        companyId: 1, 
    })
    
    await moduleRepository.create( {
        name: "MODULO 1",
        description: "TESTE",
        courseId: 1,
        companyId: 1, 
    })
}
rundb()
