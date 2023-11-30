const UsersModel = require('../models/users.model.js');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createAccesToken = require("../jwt.js");

class UsersController {
    async buscarId(id) {
        UsersModel.insertar(id)
            .catch((err) => reject(err))
            .then((equipos) => resolve(equipos));
    };

    async login(user) {
        return new Promise((resolve, reject) => {
            UsersModel.login(user)
                .catch((err) => reject('El usuario ya está registrado.'))
                .then(() => {
                    UsersModel.mostrar()
                        .catch((err) => reject(err))
                        .then((users) => resolve(users));
                });
        });
    }

    async register(user) {
        return new Promise(async (resolve, reject) => {
            const passwordHash = await bcrypt.hash(password, 10)
            user.password = passwordHash;
            UsersModel.register(user)
                .catch((err) => reject('El usuario ya está registrado.'))
                .then(() => {
                    UsersModel.mostrar()
                        .catch((err) => reject(err))
                        .then(async (users) => {
                            const token = await createAccesToken({ id: users.id })
                            res.cookie('token', token)
                            res.json({
                                id: users.id,
                                nombre: users.nombre,
                                email: users.email,

                            });
                            resolve()
                        });
                });
        });
    }

    async editar(idEquipo, equipo) {
        return new Promise((resolve, reject) => {
            EquiposModel.editar(idEquipo, equipo)
                .catch((err) => reject('El equipo ya está registrado.'))
                .then(() => {
                    EquiposModel.buscarEquipoPorId(idEquipo)
                        .catch((err) => reject('El equipo no está registrado.'))
                        .then((equipo) => resolve(equipo));
                });
        });
    }
}

module.exports = new UsersController();
