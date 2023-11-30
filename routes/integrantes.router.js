const IntegrantesController = require('../controllers/integrantes.controller');
const authRequired = require('../middleware/validateToken.js');
const express = require('express');

const router = express.Router();


router.get('/:idIntegrante', async function(req, res, next) {
    await IntegrantesController.buscarIntegrantePorId(req.params.idIntegrante)
        .catch((err) => res.status(400).send({ err }))
        .then((integrante) => res.send(integrante));
});

router.get('/', async function(req, res, next) {
    await IntegrantesController.mostrar()
        .catch((err) => res.status(400).send({ err }))
        .then((integrantes) => res.send(integrantes));
});

router.post('/', authRequired, async function(req, res, next) {
    if (req.body.integrante && req.body.equipo) {
        const { integrante, equipo } = req.body;

        await IntegrantesController.insertar(integrante, equipo)
            .catch((err) => res.status(400).send({ err }))
            .then((integrantes) => res.status(201).send(integrantes));
    } else {
        res.status(400).send('err');
    }
});

router.put('/:idIntegrante', async function(req, res, next) {
    if (req.body.integrante && req.body.equipo) {
        const { integrante, equipo } = req.body;
        
        await IntegrantesController.editar(req.params.idIntegrante, integrante, equipo)
            .catch((err) => res.status(400).send({ err }))
            .then((integrante) => res.send(integrante));
    } else {
        res.status(400).send('err');
    }
});

router.delete('/:idIntegrante', async function(req, res, next) {
    await IntegrantesController.eliminar(req.params.idIntegrante)
        .catch((err) => res.status(400).send({ err }))
        .then((integrantes) => res.send(integrantes));
});


module.exports = router;
