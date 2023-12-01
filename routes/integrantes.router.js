const IntegrantesController = require('../controllers/integrantes.controller');
const { validateToken, checkRole } = require('../middleware/validateToken.js');

const express = require('express');

const router = express.Router();

router.get('/view', async function(req, res, next) {

    await IntegrantesController.mostrar()
    .catch((err) => res.status(400).send({ err }))
    .then((integrantes) => res.render('integrantes', {
        title: 'Integrantes',
        integrantes
    }));

});

router.get('/:idIntegrante', async function(req, res, next) {
    if (req.params.idIntegrante) {
    await IntegrantesController.buscarIntegrantePorId(req.params.idIntegrante)
        .catch((err) => res.status(400).send({ err }))
        .then((integrante) => res.send(integrante));
    } else {
        res.status(400).send('Todos los datos son requeridos');
    }
});

router.get('/', async function(req, res, next) {
    await IntegrantesController.mostrar()
        .catch((err) => res.status(400).send({ err }))
        .then((integrantes) => res.send(integrantes));
});

router.post('/',
    validateToken,
    checkRole(['admin', 'user']),
    async function(req, res, next) {
    const { integrante, idEquipo } = req.body;
    if (integrante && idEquipo) {

        await IntegrantesController.insertar(integrante, idEquipo)
            .catch((err) => res.status(400).send({ err }))
            .then((integrantes) => res.status(201).send(integrantes));
    } else {
        res.status(400).send('Todos los datos son requeridos');
    }
});

router.put('/:idIntegrante',
    validateToken,
    checkRole(['admin', 'user']),
    async function(req, res, next) {
    if (req.body.integrante && req.body.equipo) {
        const { integrante, equipo } = req.body;
        
        await IntegrantesController.editar(req.params.idIntegrante, integrante, equipo)
            .catch((err) => res.status(400).send({ err }))
            .then((integrante) => res.send(integrante));
    } else {
        res.status(400).send('Todos los datos son requeridos');
    }
});

router.delete('/:idIntegrante',
    validateToken,
    checkRole(['admin', 'user']),
    async function(req, res, next) {
    await IntegrantesController.eliminar(req.params.idIntegrante)
        .catch((err) => res.status(400).send({ err }))
        .then((integrantes) => res.send(integrantes));
});


module.exports = router;
