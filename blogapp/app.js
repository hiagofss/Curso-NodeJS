//Carregando módulos
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const admin = require('./routes/admin');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
require("./models/Postagem");
const Postagens = mongoose.model("postagens");

/*
 Configurações
Session
*/
app.use(session({
    secret: "cursodenodejs",
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

//Middleware
app.use((req, res, next) =>{
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();
});

//Body Parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Handlebars
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/blogapp', {useNewUrlParser: true}).then(() => {
    console.log("Conectado com sucesso!")
}).catch((erro) => {
    console.log("Houve um erro ao se conectar: " + erro)
});

//Public
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) =>{
   console.log("Eu sou um middleware");
    next()
});

//Rotas
app.get('/', (req, res) => {
    Postagens.find().populate("categoria").sort({data: "desc"}).then((postagem) => {
        res.render("index", {postagem: postagem})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro interno")
        res.redirect("/404")
    })

});

app.get("/404", (req, res) => {
    res.send('Error 404!')
})

app.use('/admin', admin);

//Outros

const PORT = 8081;
app.listen(PORT, () => {
    console.log("Servidor rodando na URL http://127.0.0.1:" + PORT + "/")
});