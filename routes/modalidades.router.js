const ModalidadesController = require('../controllers/modalidades.controller');
const express = require('express');

const router = express.Router();
const { validateToken, checkRole } = require('../middleware/validateToken.js');

router.get('/view', async function(req, res, next) {
    await ModalidadesController.mostrar()
        .catch((err) => res.status(400).send({ err }))
        .then((modalidades) => res.render('modalidades', {
            title: 'Modalidades',
            modalidades
        }));
});

router.get('/',
    validateToken,
    checkRole(['admin']),
    async function(req, res, next) {
    await ModalidadesController.mostrar()
        .catch((err) => res.status(400).send({ err }))
        .then((modalidades) => res.send(modalidades));
});

router.get('/:idModalidad', async function(req, res, next) {
    await ModalidadesController.buscarModalidadPorId(req.params.idModalidad)
    .then((modalidad) => res.send(modalidad))
    .catch((err) => res.status(400).send({ err }));
});

router.post('/',
    validateToken,
    checkRole(['admin']),
    async function(req, res, next) {
    if (req.body.modalidad) {
        await ModalidadesController.ingresar(req.body.modalidad)
            .then((modalidades) => res.status(201).send(modalidades))
            .catch((err) => res.status(400).send({ err }));
    } else {
        res.status(400).send('Todos los datos son requeridos');
    }
})


module.exports = router;
