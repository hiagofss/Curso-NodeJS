//Carregando módulos
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const admin = require('./routes/admin');
const usuarios = require('./routes/usuario');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
require("./models/Postagem");
const Postagem = mongoose.model("postagens");
const Categoria = mongoose.model("categorias");
const passport = require('passport');
require('./config/auth')(passport);
/*
 Configurações
Session
*/
app.use(session({
    secret: "cursodenodejs",
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//Middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
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

app.use((req, res, next) => {
    console.log("Eu sou um middleware");
    next()
});

//Rotas
app.get('/', (req, res) => {
    Postagem.find().populate("categoria").sort({data: "desc"}).then((postagem) => {
        res.render("index", {postagem: postagem})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro interno" + err);
        res.redirect("/404")
    })

});

app.get("/postagem/:slug", (req, res) => {
    Postagem.findOne({slug: req.params.slug}).then((postagem) => {
        if (postagem) {
            res.render("postagem/index", {postagem: postagem});
        } else {
            req.flash("error_msg", "Esta postagem não exite");
            res.redirect("/");
        }
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro interno" + err);
        res.redirect("/");
    });
});

app.get("/categorias", (req, res) => {
    Categoria.find().then((categorias) => {
        res.render("categorias/index", {categorias: categorias})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro interno ao listar as categorias" + err);
        res.redirect("/")
    })
});

app.get("/categorias/:slug", (req, res) => {
    Categoria.findOne({slug: req.params.slug}).then((categoria) => {
        if (categoria) {
            Postagem.find({categoria: categoria._id}).then((postagens) => {
                res.render("categorias/postagens", {postagens: postagens, categoria: categoria})
            }).catch((err) => {
                req.flash("error_msg", "Houve um erro ao listar os posts!" + err);
                res.redirect("/")
            })
        } else {
            req.flash("error_msg", "Está categoria não existe");
            res.redirect("/");
        }
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro interno ao carrega sas categorias" + err);
        res.redirect("/");
    })
});

app.get("/404", (req, res) => {
    res.send('Error 404!')
});

app.use('/admin', admin);
app.use('/usuarios', usuarios);

//Outros

const PORT = 8081;
app.listen(PORT, () => {
    console.log("Servidor rodando na URL http://127.0.0.1:" + PORT + "/")
});