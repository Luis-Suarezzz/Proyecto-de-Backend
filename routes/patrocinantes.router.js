const PatrocinantesController = require('../controllers/patrocinantes.controller');
const express = require('express');

const router = express.Router();


router.get('/view', function(req, res, next) {
    PatrocinantesController.mostrar()
        .catch((err) => res.status(400).send({ err }))
        .then((patrocinantes) => res.render('patrocinantes', {
            title: 'Patrocinantes',
            patrocinantes
        }));
});

router.get('/', async function(req, res, next) {
    await PatrocinantesController.mostrar()
        .catch((err) => res.status(400).send({ err }))
        .then((patrocinantes) => res.send(patrocinantes));
});

router.get('/equiposPatrocinados/:idPatrocinante', async function(req, res, next) {
    if (req.params.idPatrocinante) {

        await PatrocinantesController.mostrarEquiposPatrocinados(req.params.idPatrocinante)
            .catch((err) => res.status(400).send({ err }))
            .then((equipos) => res.send(equipos));
    } else {
        res.status(400).send('Todos los datos son requeridos');
    }
});

router.post('/', async function(req, res, next) {
    if (req.body.patrocinante) {
        await PatrocinantesController.insertar(req.body.patrocinante)
            .catch((err) => res.status(400).send({ err }))
            .then((patrocinantes) => res.status(201).send(patrocinantes));
    } else {
        res.status(400).send('Todos los datos son requeridos');
    }
});

router.post('/patrocinar', async function(req, res, next) {
    const { idPatrocinante, idEquipo } = req.body;
    if (idPatrocinante && idEquipo) {

        await PatrocinantesController.inscribirEquipo(idPatrocinante, idEquipo)
            .catch((err) => res.status(400).send({ err }))
            .then((equipos) => res.send(equipos));
    } else {
        res.status(400).send('Todos los datos son requeridos');
    }
});


module.exports = router;
