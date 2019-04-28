const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/Usuario');
const Usuario = mongoose.model('usuarios');

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

    }


});

module.exports = router;