const mongoose = require('mongoose');


//Configurando o Mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/aprendendo', {useNewUrlParser: true}).then(() => {
    console.log("Conectado com sucesso!")
}).catch((erro) => {
    console.log("Houve um erro ao se conectar: " + erro)
});

//Model - Usuarios
//Definindo o Model
const UserSchema = mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    sobrenome: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    idade: {
        type: Number,
        require: true
    },
    pais: {
        type: String
    }
});

//Collection
mongoose.model('usuarios', UserSchema);

// const Hiago = mongoose.model('usuarios');

// new Hiago({
//     nome: "Hiago",
//     sobrenome: "Souza",
//     email: "hiagofss98@gmail.com",
//     idade: 20,
//     pais: "Brasil"
// }).save().then(() => {
//     console.log("Usuairo criado com sucesso!")
// }).catch((erro) => {
//     console.log("Houve um erro ao registrar usuario: " + erro)
// });
const Joe = mongoose.model('usuarios')
new Joe({
    nome: "Jhon",
    sobrenome: "Doe",
    email: "jhon@doe.com",
    idade: 34,
    pais: "EUA"
}).save().then(() => {
    console.log("Usuairo criado com sucesso!")
}).catch((erro) => {
    console.log("Houve um erro ao registrar usuario: " + erro)
});