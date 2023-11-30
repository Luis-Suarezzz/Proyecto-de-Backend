const UsersModel = require('../models/users.model.js');

class UsersController {
    async buscarId(id) {
        return new Promise((resolve, reject) => {
            UsersModel.buscarId(id)
                .catch((err) => reject(err))
                .then((usuario) => resolve(usuario));
            });
    };

    async login(user) {
        return new Promise((resolve, reject) => {
            UsersModel.login(user)
                .then((logedUser) => {
                    resolve(logedUser);
                })
                .catch((err) => reject(err & err.message ? err.message : 'Ha ocurrido un error al iniciar sesion.'))
        });
    }

    async register(user) {
        return new Promise(async (resolve, reject) => {
            UsersModel.register(user)
                .then((idUser) => {
                    UsersModel.buscarId(idUser)
                        .then((usuario) => {
                            resolve(usuario);
                        })
                        .catch((err) => reject(err && err.message ? err.message : 'Ha ocurrido un error al registrar el usuario.'));
                })
                .catch((err) => reject(err & err.message ? err.message : 'Ha ocurrido un error al registrar el usuario.'))
        });
    }

    // TODO: permitir editar.
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

    // TODO: permitir eliminar.
}

module.exports = new UsersController();
