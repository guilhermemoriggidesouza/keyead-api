const categoryRepository = require("./src/repository/category");
const courseRepository = require("./src/repository/course");
const companyRepository = require("./src/repository/company");
const userRepository = require("./src/repository/user");
const hex = require('amrhextotext')

companyRepository.create({
    name: "local",
    alias: "local",
    logo: "",
    email: "teste@gmail.com",
    bucketName: "teste-company",
})

userRepository.create({
    name: "Guilherme", 
    socialReason: "Moriggi", 
    cnpj: "53141522820", 
    telefone: "19984548889", 
    email: "GuilhermeMoriggi@gmail.com", 
    password: hex.textToHex("teste123"), 
    category: "A", 
    companyId: 1, 
})

categoryRepository.create({
    description: "Guilherme", 
    active: true, 
    companyId: 1, 
})

courseRepository.create({
    name: "teste", 
    description: "teste de curso", 
    active: true, 
    certificated: true, 
    companyId: 1, 
})