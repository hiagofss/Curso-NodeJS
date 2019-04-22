const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/Categorias');
const Categoria = mongoose.model("categorias")

router.get('/', (req, res) => {
    res.render("admin/index")
});

router.get('/posts', (req, res) => {
    res.send("Página de Posts")
});

router.get('/categorias', (req, res) => {
    Categoria.find().sort({date: 'desc'}).then((categorias) => {
        res.render("admin/categorias", {categorias: categorias})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao listas as vategorias: " + err);
        res.redirect("/admin");
    })

});

router.get('/categorias/add', (req, res) => {
    res.render("admin/addcategoria")
});

router.post('/categorias/nova', (req, res) => {

    var erros = [];

    if (!req.body.nome || typeof req.body.nome === undefined || req.body.nome == null) {
        erros.push({texto: "Nome invalido"})
    }

    if (!req.body.slug || typeof req.body.slug === undefined || req.body.slug == null) {
        erros.push({texto: "Slug invalido"})
    }

    if (req.body.nome.length < 2) {
        erros.push({texto: "Nome da categoria muito pequeno"})
    }

    if (erros.length > 0) {
        console.log(erros);
        res.render("admin/addcategoria", {erros: erros})
    } else {
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        };

        new Categoria(novaCategoria).save().then(() => {
            req.flash("success_msg", "Categoria criada com sucesso!");
            res.redirect("/admin/categorias")
        }).catch((err) => {
            req.flash("erro_msg", "Houve um erro ao salvar categoria, tente novamente!");
            res.redirect("/admin")
        });
    }


});

router.get("/categorias/edit/:id", (req, res) => {
    Categoria.findOne({_id: req.params.id}).then((categoria) => {
        res.render("admin/editcategorias", {categoria: categoria})
    }).catch((err) => {
        req.flash("error_msg", "Está categoria não existe");
        res.redirect('/admin/categorias')
    })

});

router.post("/categorias/edit", (req, res) => {
    Categoria.findOne({_id: req.body.id}).then((categoria) => {
        categoria.nome = req.body.nome;
        categoria.slug = req.body.slug;

        categoria.save().then(() => {
            req.flash("success_msg", "Categoria editada com sucesso!");
            res.redirect('/admin/categorias')
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno ao salvar categoria" + err);
            res.redirect('/admin/categorias')
        })

    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao editar categoria" + err);
        res.redirect('/admin/categorias')
    })
});

module.exports = router;