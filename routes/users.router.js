const express = require('express');
const UsersController = require('../controllers/users.controller');
const { createToken } = require('../middleware/jwt.js');

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
        .then((user) => {
            let token = createToken({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            })
            // Se retorna el JWT
            res.status(200).json({ userInfo: {...user, password: undefined }, token: token }) 
        })
        .catch((err) => res.status(400).send({ err }));
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