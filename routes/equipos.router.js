const EquiposController = require('../controllers/equipos.controller');
const express = require('express');

const { validateToken, checkRole } = require('../middleware/validateToken.js');

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

router.get('/:idEquipo', async function(req, res, next) {
    if (req.params.idEquipo) {
        await EquiposController.buscarEquipoPorId(req.params.idEquipo)
            .catch((err) => res.status(400).send({ err }))
            .then((equipo) => res.send(equipo));
    } else {
        res.status(400).send('Todos los datos son requeridos');
    }
});

router.get('/inscripcion/:idCategoria', async function(req, res, next) {
    await EquiposController.mostrarEquiposPorCategoria(req.params.idCategoria)
        .catch((err) => res.status(400).send({ err }))
        .then((equipos) => res.send(equipos));
});

router.post('/',
    validateToken,
    checkRole(['admin', 'user']),
    async function(req, res, next) {
    if (req.body.equipo) {
        await EquiposController.insertar(req.body.equipo)
            .catch((err) => res.status(400).send({ err }))
            .then((equipos) => res.status(201).send(equipos));
    } else {
        res.status(400).send('Todos los datos son requeridos');
    }
});

router.post('/inscribir',
    validateToken,
    checkRole(['admin', 'user']),
    async function(req, res, next) {
    const { idEquipo, idCategoria } = req.body;
    if (idEquipo && idCategoria) {

        await EquiposController.inscribirCategoria(idEquipo, idCategoria)
            .catch((err) => res.status(400).send({ err }))
            .then((equipos) => res.json({ equipos_en_categoria: equipos }));
    } else {
        res.status(400).send('Todos los datos son requeridos');
    }
});

router.put('/:id',
    validateToken,
    checkRole(['admin', 'user']),
    async function(req, res, next) {
    if (req.body.equipo && req.params.id) {
        await EquiposController.editar(req.params.id, req.body.equipo)
            .catch((err) => res.status(400).send({ err }))
            .then((equipo) => res.send(equipo));
    } else {
        res.status(400).send('Todos los datos son requeridos');
    }
});

router.delete('/:id',
    validateToken,
    checkRole(['admin', 'user']),
    async function(req, res, next) {
    await EquiposController.eliminar(req.params.id)
        .catch((err) => res.status(400).send({ err }))
        .then((equipos) => res.send(equipos));
});

router.delete('/:idEquipo/:idCategoria',
    validateToken,
    checkRole(['admin', 'user']),
    async function(req, res, next) {
    const { idEquipo, idCategoria } = req.params;

    await EquiposController.eliminarInscripcion(idEquipo, idCategoria)
        .catch((err) => res.status(400).send({ err }))
        .then((equipos) => res.send(equipos));
})

module.exports = router;
