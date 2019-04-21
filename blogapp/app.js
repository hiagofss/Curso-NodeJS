//Carregando módulos
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const admin = require('./routes/admin');
const path = require('path')

// Configurações
//Body Parser
app.use(bodyParser.urlencoded({extended: false}));
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
app.use(express.static(path.join(__dirname, "public")))

//Rotas
// app.use('/', (req, res) => {
//     res.send("Rota principal")
// });

app.use('/posts', (req, res) => {
    res.send("Pagina de posts")
});

app.use('/admin', admin);

//Outros

const PORT = 8081;
app.listen(PORT, () => {
    console.log("Servidor rodando na URL http://127.0.0.1:" + PORT + "/")
});