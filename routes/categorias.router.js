const CategoriasController = require('../controllers/categorias.controller');
const express = require('express');

const router = express.Router();


router.get('/', async function(req, res, next) {
    await CategoriasController.mostrar()
        .catch((err) => res.status(400).send({ err }))
        .then((categorias) => res.send(categorias));
});

// NUEVA RUTA
router.get('/:idCategoria', async function(req, res, next) {
    await CategoriasController.buscarCategoriaPorId(req.params.idCategoria)
        .catch((err) => res.status(400).send({ err }))
        .then((categoria) => res.send(categoria));
});

router.post('/', async function(req, res, next) {
    if (req.body.categoria && req.body.modalidad) {
        const { categoria, modalidad } = req.body;

        await CategoriasController.ingresar(categoria, modalidad)
            .catch((err) => res.status(400).send({ err }))
            .then((categorias) => res.status(201).send(categorias));

    } else {
        res.status(400).send('err');
    }
});

router.put('/:id', async function(req, res, next) {
    if (req.body.categoria && req.body.modalidad) {
        const { categoria, modalidad } = req.body;

        await CategoriasController.editar(req.params.id, categoria, modalidad)
            .catch((err) => res.status(400).send({ err }))
            .then((categoria) => res.send(categoria));
    } else {
        res.status(400).send('err');
    }
});

router.delete('/:id', async function(req, res, next) {
    await CategoriasController.eliminar(req.params.id)
        .catch((err) => res.status(400).send({ err }))
        .then((categorias) => res.send(categorias));
});


module.exports = router;
