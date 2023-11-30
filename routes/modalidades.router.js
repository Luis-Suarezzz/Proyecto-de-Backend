const ModalidadesController = require('../controllers/modalidades.controller');
const express = require('express');

const router = express.Router();


router.get('/view', async function(req, res, next) {
    await ModalidadesController.mostrar()
        .catch((err) => res.status(400).send({ err }))
        .then((modalidades) => res.render('modalidades', {
            title: 'Modalidades',
            modalidades
        }));
});

router.get('/', async function(req, res, next) {
    await ModalidadesController.mostrar()
        .catch((err) => res.status(400).send({ err }))
        .then((modalidades) => res.send(modalidades));
});

// NUEVA RUTA
router.get('/:idModalidad', async function(req, res, next) {
    await ModalidadesController.buscarModalidadPorId(req.params.idModalidad)
        .catch((err) => res.status(400).send({ err }))
        .then((modalidad) => res.send(modalidad));
});

router.post('/', async function(req, res, next) {
    if (req.body.modalidad) {
        await ModalidadesController.ingresar(req.body.modalidad)
            .catch((err) => res.status(400).send({ err }))
            .then((modalidades) => res.status(201).send(modalidades));
    } else {
        res.status(400).send({ err: '' });
    }
})


module.exports = router;
