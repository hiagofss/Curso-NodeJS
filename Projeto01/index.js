const express = require("express");
const app = express();
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')

//Config
//Template engine
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
//BodyParser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
//Conexao com o DB MySQL
const sequelize = new Sequelize('sistemadecadastro', 'root', 'root', {
    host: "localhost",
    dialect: 'mysql'
})

//Rotas
app.get('/cad', function (req, res) {
    res.render('formulario');
})

app.post('/add', function (req, res) {
    res.send("Texto: " + req.body.titulo + " Conteudo: " + req.body.conteudo)
})

app.listen(8081, function () {
    console.log("Servidor rodando na URL http://127.0.0.1:8081/")
});