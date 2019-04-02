const mongoose = require('mongoose');

var contatoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: 'Obrigatório.'
    },
    email: {
        type: String,
        required: 'Obrigatório.'
    },
    telefone: {
        type: String,
        required: 'Obrigatório.'
    },
    mensagem: {
        type: String,
        required: 'Obrigatório.'
    }, 
    data: {
        type: Date
    }
});

contatoSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

// contatoSchema.path('data').validate((val) => {
//     dataRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
//     return dataRegex.test(val);
// }, 'Data Invalida.');

// contatoSchema.path('mensagem').validate((val) => {
//     mensagemRegex = /[\w]{20,}/;
//     return mensagemRegex.test(val);
// }, 'minimo 20.')

mongoose.model('Contato', contatoSchema);