const EquiposController = require('../controllers/equipos.controller');
const express = require('express');

const router = express.Router();


router.get('/view', async function(req, res, next) {
    await EquiposController.mostrar()
        .catch((err) => res.status(400).send(err))
        .then((equipos) => res.render('equipos', {
            equipos: equipos,
            title: 'Equipos'
        }));
});

router.get('/', async function(req, res, next) {
    await EquiposController.mostrar()
        .catch((err) => res.status(400).send({ err }))
        .then((equipos) => res.send(equipos));
});

// NUEVA RUTA
router.get('/:idEquipo', async function(req, res, next) {
    await EquiposController.buscarEquipoPorId(req.params.idEquipo)
        .catch((err) => res.status(400).send({ err }))
        .then((equipo) => res.send(equipo));
});

router.get('/inscripcion/:idCategoria', async function(req, res, next) {
    await EquiposController.mostrarEquiposPorCategoria(req.params.idCategoria)
        .catch((err) => res.status(400).send({ err }))
        .then((equipos) => res.send(equipos));
});

router.post('/', async function(req, res, next) {
    if (req.body.equipo) {
        await EquiposController.insertar(req.body.equipo)
            .catch((err) => res.status(400).send({ err }))
            .then((equipos) => res.status(201).send(equipos));
    } else {
        res.status(400).send('err');
    }
});

// NUEVA RUTA
router.post('/inscribir', async function(req, res, next) {
    if (req.body.equipo && req.body.categoria) {
        const { equipo, categoria } = req.body;

        await EquiposController.inscribirCategoria(equipo, categoria)
            .catch((err) => res.status(400).send({ err }))
            .then((equipos) => res.send(equipos));
    } else {
        res.status(400).send('err');
    }
});

router.put('/:id', async function(req, res, next) {
    if (req.body.equipo) {
        await EquiposController.editar(req.params.id, req.body.equipo)
            .catch((err) => res.status(400).send({ err }))
            .then((equipo) => res.send(equipo));
    } else {
        res.status(400).send('err');
    }
});

router.delete('/:id', async function(req, res, next) {
    await EquiposController.eliminar(req.params.id)
        .catch((err) => res.status(400).send({ err }))
        .then((equipos) => res.send(equipos));
});

router.delete('/:idEquipo/:idCategoria', async function(req, res, next) {
    const { idEquipo, idCategoria } = req.params;

    await EquiposController.eliminarInscripcion(idEquipo, idCategoria)
        .catch((err) => res.status(400).send({ err }))
        .then((equipos) => res.send(equipos));
})

module.exports = router;
