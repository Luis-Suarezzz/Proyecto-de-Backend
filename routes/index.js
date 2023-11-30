const express = require('express');

const modalidadesRouter = require('./modalidades.router');
const categoriasRouter = require('./categorias.router');
const equiposRouter = require('./equipos.router');
const patrocinantesRouter = require('./patrocinantes.router');
const integrantesRouter = require('./integrantes.router');
const usersRouter = require('./users.router.js');

const router = express.Router();


router.get('/', function(req, res, next) {
    res.render('index', { title: 'Concurso Robótica' });
});

router.use('/modalidades', modalidadesRouter);
router.use('/categorias', categoriasRouter);
router.use('/equipos', equiposRouter);
router.use('/patrocinantes', patrocinantesRouter);
router.use('/integrantes', integrantesRouter);
router.use('/usuarios', usersRouter);

module.exports = router;
