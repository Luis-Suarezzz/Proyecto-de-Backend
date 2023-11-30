const express = require('express');
const UsersController = require('../controllers/users.controller');
const createAccesToken = require('../middleware/validateToken.js');

const router = express.Router();

router.get('/:id', async function (req, res) {
    UsersController.buscarId(req.params.id)
    .catch((err) => res.status(400).send({ err }))
    .then(async (usuario) => {
        res.json({ usuario });
    });
});

router.post('/login', async function(req, res) {
    await UsersController.login(req.body)
    .catch((err) => res.status(400).send({ err }))
    .then(async (usuario) => {
        const token = await createAccesToken({ id: usuario.id, tipo: usuario.tipo_user })
        res.cookie('token', token)
        res.send(usuario.tipo_user)
    });
});

router.post('/register', async function(req, res) {
    await UsersController.register(req.body)
        .then((user) => {
            res.json({ user: {
                id: user.id,
                nombre: user.nombre,
                email: user.email,
            } })
        })
        .catch((err) => res.status(400).send({ err }));
});

router.get('/loguot', function(req, res) {
    res.cookie('token', '', {
        expires: new Date(0),
    });
})

module.exports = router;