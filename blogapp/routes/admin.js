const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/Categoria');
require('../models/Postagem');
const Categoria = mongoose.model("categorias");
const Postagem = mongoose.model("postagens")

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
            req.flash("erro_msg", "Houve um erro ao salvar categoria, tente novamente!" + err);
            res.redirect("/admin")
        });
    }


});

router.get("/categorias/edit/:id", (req, res) => {
    Categoria.findOne({_id: req.params.id}).then((categoria) => {
        res.render("admin/editcategorias", {categoria: categoria})
    }).catch((err) => {
        req.flash("error_msg", "Está categoria não existe" + err);
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

router.post("/categorias/deletar", (req, res) => {
    Categoria.remove({_id: req.body.id}).then(() => {
        req.flash("success_msg", "Categoria excluida com sucesso!");
        res.redirect('/admin/categorias')
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro interno ao deletar categoria" + err);
        res.redirect('/admin/categorias')
    })
});

router.get("/postagens", (req, res) => {

    Postagem.find().populate("categoria").sort({data: "desc"}).then((postagens) => {
        res.render("admin/postagens", {postagens: postagens})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao listar as postagens" + err)
        res.redirect("/admin")
    });

});

router.get("/postagens/add", (req, res) => {
    Categoria.find().then((categorias) => {
        res.render("admin/addpostagem", {categorias: categorias})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao carregar o formulário" + err);
        res.redirect('/admin/postagens')
    })
});

router.post("/postagens/nova", (req, res) => {

    var erros = [];

    if (req.body.categoria === "0") {
        erros.push({texto: "Categoria invalida, regitre uma categoria"})
    }

    if (erros.length > 0) {
        console.log(erros);
        res.render("admin/addpostagem", {erros: erros})
    } else {
        const novaPostagem = {
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            conteudo: req.body.conteudo,
            categoria: req.body.categoria,
            slug: req.body.slug
        };

        new Postagem(novaPostagem).save().then(() => {
            req.flash("success_msg", "Postagem criada com sucesso!");
            res.redirect('/admin/postagens');
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro durante o salvamento da postagem" + err);
            res.redirect('/admin/postagens');
        })
    }
});

router.get("/postagens/edit/:id", (req, res) => {

    Postagem.findOne({_id: req.params.id}).then((postagem) => {
        Categoria.find().then((categorias) => {
            res.render("admin/editpostagens", {categorias: categorias, postagem: postagem});
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao carregar as categorias" + err);
            res.redirect('/admin/postagens');
        });

    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao carregar o formulario de edição" + err);
        res.redirect('/admin/postagens');
    })
});

router.post("/postagem/edit", (req, res) => {

    Postagem.findOne({_id: req.body.id}).then((postagem) => {

        postagem.titulo = req.body.titulo;
        postagem.slug = req.body.slug;
        postagem.descricao = req.body.descricao;
        postagem.conteudo = req.body.conteudo;
        postagem.categoria = req.body.categoria;

        postagem.save().then(() => {
            req.flash("success_msg", "Postagem editada com sucesso!");
            res.redirect('/admin/postagens');
        }).catch((err) => {
            req.flash("error_msg", "Err Interno" + err);
            res.redirect('/admin/postagens');
        })

    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao salvar a edição" + err);
        res.redirect('/admin/postagens');
    })
});


router.get("/postagens/deletar/:id", (req, res) => {
    Postagem.remove({_id: req.params.id}).then(() => {
        res.redirect("/admin/postagens")
    })
})

module.exports = router;