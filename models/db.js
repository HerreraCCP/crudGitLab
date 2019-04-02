const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ContatosDB', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('Succeeded.') }
    else { console.log('Error : ' + err) }
});

require('./contato.model');