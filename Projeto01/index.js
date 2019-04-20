const express = require("express");
const app = express();
const handlebars = require('express-handlebars')
const Sequelize = require('sequelize')

//Config
    //Template engine
    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')
    //Conexao com o DB MySQL
    const sequelize = new Sequelize('sistemadecadastro', 'root', 'root', {
        host: "localhost",
        dialect: 'mysql'
    })


app.listen(8081, function () {
    console.log("Servidor rodando na URL http://127.0.0.1:8081/")
});