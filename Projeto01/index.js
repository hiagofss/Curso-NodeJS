const express = require("express");
const app = express();

app.get("/", function (red, res ) {
    res.send("Seja bem vindo ao meu app!");
});

app.get("/sobre", function (red, res ) {
    res.send("Minha pagina sobre!");
});

app.get("/blog", function (red, res ) {
    res.send("Bem vindo ao meu blog!");
});




app.listen(8081, function () {
    console.log("Servidor rodando na URL http://127.0.0.1:8081/")
});