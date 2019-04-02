const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Contato = mongoose.model('Contato');

router.get('/', (req, res) => {
    res.render("contato/envia", {
        viewTitle: "Insert"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var contato = new Contato();
    contato.nome = req.body.nome;
    contato.email = req.body.email;
    contato.telefone = req.body.telefone;
    contato.mensagem = req.body.mensagem;
    contato.save((err, doc) => {
        if (!err)
            res.redirect('contato/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("contato/envia", {
                    viewTitle: "Insert",
                    contato: req.body
                });
            }
            else
                console.log('Error: ' + err);
        }
    });
}

function updateRecord(req, res) {
    Contato.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('contato/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("contato/envia", {
                    viewTitle: 'Update',
                    contato: req.body
                });
            }
            else
                console.log('Error update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Contato.find((err, docs) => {
        if (!err) {
            res.render("contato/list", {
                list: docs
            });
        }
        else {
            console.log('Error list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'nome':
                body['nomeError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Contato.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("contato/envia", {
                viewTitle: "Update",
                contato: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Contato.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/contato/list');
        }
        else { console.log('Error delete :' + err); }
    });
});

module.exports = router;