const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/Usuario');
const Usuario = mongoose.model('usuarios');
const bcrypt = require('bcrypt');
const passport = require('passport');

router.get("/registro", (req, res) => {
    res.render("usuarios/registro")
});

router.post("/registro", (req, res) => {
    var error = [];

    if (!req.body.nome || typeof req.body.nome === undefined || req.body.nome === null) {
        error.push({texto: "Nome invalido!"})
    }
    if (!req.body.email || typeof req.body.email === undefined || req.body.email === null) {
        error.push({texto: "E-mail invalido!"})
    }
    if (!req.body.senha || typeof req.body.senha === undefined || req.body.senha === null) {
        error.push({texto: "Senha invalido!"})
    }
    if (req.body.senha.length < 4) {
        error.push({texto: "Senha muito curta!"})
    }

    if (req.body.senha !== req.body.senha2) {
        error.push({texto: "As senhas são diferentes!"})
    }

    if (error.length > 0) {
        res.render('usuarios/registro', {error: error})
    } else {
        Usuario.findOne({email: req.body.email}).then((usuario) => {
            if (usuario) {
                req.flash("error_msg", "Já exite um usuario cadastrado no sistema");
                res.redirect('/');
            } else {

                const novoUsuario = new Usuario({
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: req.body.senha
                });

                bcrypt.genSalt(10, (erro, salt) => {
                    bcrypt.hash(novoUsuario.senha, salt, (erro, hash) => {
                        if (erro) {
                            req.flash("error_msg", "Houve um erro durante o salvamento do usuario");
                            res.redirect("/");
                        }

                        novoUsuario.senha = hash;

                        novoUsuario.save().then(() => {
                            req.flash("success_msg", "Usuario criado com sucesso!");
                            res.redirect("/")
                        }).catch((err) => {
                            req.flash("error_msg", "Houve um erro durante o salvamento do usuario!" + err);
                            res.redirect("/usuarios/registro")
                        });
                    });
                });

            }
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno" + err);
            res.redirect('/')
        })
    }


});

router.get("/login", (req, res) => {
    res.render("usuarios/login")
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local',
        {
            successRedirect: "/",
            failureRedirect: "/usuarios/login",
            failureFlash: true
        })(req, res, next)
});

module.exports = router;