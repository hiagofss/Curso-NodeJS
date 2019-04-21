const Sequelize = require('sequelize')

//Conexao com o DB MySQL
const sequelize = new Sequelize('postapp', 'root', 'root', {
    host: "localhost",
    dialect: 'mysql'
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}