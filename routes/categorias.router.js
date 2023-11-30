const CategoriasController = require('../controllers/categorias.controller');
const express = require('express');

const router = express.Router();


router.get('/', async function(req, res, next) {
    await CategoriasController.mostrar()
        .catch((err) => res.status(400).send({ err }))
        .then((categorias) => res.send(categorias));
});

router.get('/:idCategoria', async function(req, res, next) {
    await CategoriasController.buscarCategoriaPorId(req.params.idCategoria)
        .catch((err) => res.status(400).send({ err }))
        .then((categoria) => res.send(categoria));
});

// TODO: probar esta ruta.
router.post('/', async function(req, res, next) {
    const { categoria, idModalidad } = req.body;
    if (categoria && idModalidad) {

        await CategoriasController.ingresar(categoria, idModalidad)
            .catch((err) => res.status(400).send({ err: "Ha ocurrido un error al agregar una categoria" }))
            .then((categorias) => res.status(201).send(categorias));

    } else {
        res.status(400).send('Todos los datos son requeridos');
    }
});

// TODO: probar esta ruta.
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

// TODO: probar esta ruta.
router.delete('/:id', async function(req, res, next) {
    await CategoriasController.eliminar(req.params.id)
        .catch((err) => res.status(400).send({ err }))
        .then((categorias) => res.send(categorias));
});


module.exports = router;
