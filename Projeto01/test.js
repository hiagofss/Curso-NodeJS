const Sequelize = require('sequelize')
const sequelize = new Sequelize('sistemadecadastro', 'root', 'root', {
    host: "localhost",
    dialect: 'mysql'
})

const Postagem = sequelize.define('postagens', {
    titulo: {
        type: Sequelize.STRING
    },
    conteudo: {
        type: Sequelize.TEXT
    }
})

// Postagem.sync({force: true})

// Postagem.create({
//     titulo: "Um titulo qualquer",
//     conteudo: "Conteudo qualquer"
// })

const Usuario = sequelize.define('usuarios', {
    nome: {
        type: Sequelize.STRING
    },
    sobrenome: {
        type: Sequelize.STRING
    },
    idade: {
        type: Sequelize.INTEGER
    },
    email: {
        type: Sequelize.STRING
    }
})

Usuario.create({
    nome: "Hiago",
    sobrenome: "Souza",
    idade: 20,
    email: "hiagofss98@gmail.com"
})

// Usuario.sync({force: true})