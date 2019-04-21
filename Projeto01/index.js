const express = require("express");
const app = express();
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const Post = require('./models/Post')

//Config
//Template engine
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
//BodyParser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Rotas
app.get('/home', function (req, res) {
    res.render('home');
})

app.get('/cad', function (req, res) {
    res.render('formulario');
});

app.post('/add', function (req, res) {
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(function () {
        res.redirect('/home')
    }).catch(function (erro) {
        res.send("Houve um erro: " + erro)
    })
});

app.listen(8081, function () {
    console.log("Servidor rodando na URL http://127.0.0.1:8081/")
});