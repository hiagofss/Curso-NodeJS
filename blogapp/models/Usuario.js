const moongoose = require('mongoose');
const Schema = moongoose.Schema;

const Usuario = new Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    }
});

moongoose.model("usuario", Usuario);