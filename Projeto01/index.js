const express = require("express");
const app = express();

app.get("/", function (red, res) {
    res.sendFile(__dirname + "/html/index.html");
});

app.get("/sobre", function (red, res) {
    res.sendFile(__dirname + "/html/sobre.html");
});

app.get("/blog", function (red, res) {
    res.send("Bem vindo ao meu blog!");
});

app.get("/ola/:nome/:cargo/:cor", function (req, res) {
    res.send("<h1>Ola " + req.params.nome + "</h1>" + "<h2> Cargo " + req.params.cargo + "</h2>" + "<h3> Cor Favorita " + req.params.cor + "</h3>");
});

app.listen(8081, function () {
    console.log("Servidor rodando na URL http://127.0.0.1:8081/")
});