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

// NUEVA RUTA
router.get('/equiposPatrocinados/:idPatrocinante', async function(req, res, next) {
    await PatrocinantesController.mostrarEquiposPatrocinados(req.params.idPatrocinante)
        .catch((err) => res.status(400).send({ err }))
        .then((equipos) => res.send(equipos));
});

router.post('/', async function(req, res, next) {
    if (req.body.patrocinante) {
        await PatrocinantesController.insertar(req.body.patrocinante)
            .catch((err) => res.status(400).send({ err }))
            .then((patrocinantes) => res.status(201).send(patrocinantes));
    } else {
        res.status(400).send('err');
    }
});

// NUEVA RUTA
router.post('/patrocinar', async function(req, res, next) {
    if (req.body.patrocinante && req.body.equipo) {
        const { patrocinante, equipo } = req.body;

        await PatrocinantesController.inscribirEquipo(patrocinante, equipo)
            .catch((err) => res.status(400).send({ err }))
            .then((equipos) => res.send(equipos));
    } else {
        res.status(400).send('err');
    }
});


module.exports = router;
