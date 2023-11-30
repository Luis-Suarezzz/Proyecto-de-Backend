const IntegrantesModel = require('../models/integrantes.model');
const EquiposController = require('./equipos.controller');


class IntegrantesController {
    async insertar(integrante, idEquipo) {
        return new Promise((resolve, reject) => {
            EquiposController.buscarEquipoPorId(idEquipo)
                .catch((err) => reject(err))
                .then(() => {
                    IntegrantesModel.insertar(integrante, idEquipo)
                        .catch((err) => reject('El integrante ya está registrado.'))
                        .then(() => {
                            IntegrantesModel.mostrar()
                                .catch((err) => reject(err))
                                .then((integrantes) => resolve(integrantes));
                        });
                });
        });
    }

    async mostrar() {
        return new Promise((resolve, reject) => {
            IntegrantesModel.mostrar()
                .catch((err) => reject(err))
                .then((integrantes) => resolve(integrantes));
        });
    }

    async editar(idIntegrante, integrante, idEquipo) {
        return new Promise((resolve, reject) => {
            EquiposController.buscarEquipoPorId(idEquipo)
                .catch((err) => reject(err))
                .then(() => {
                    IntegrantesModel.editar(idIntegrante, integrante, idEquipo)
                        .catch((err) => reject('El integrante ya está registrado.'))
                        .then(() => {
                            IntegrantesModel.buscarIntegrantePorId(idIntegrante)
                                .catch((err) => reject('El integrante no está registrado.'))
                                .then((integrante) => resolve(integrante));
                        });
                });
        });
    }

    async eliminar(id) {
        return new Promise((resolve, reject) => {
            IntegrantesModel.buscarIntegrantePorId(id)
                .catch((err) => reject('El integrante no está registrado.'))
                .then(() => {
                    IntegrantesModel.eliminar(id)
                        .catch((err) => reject(err))
                        .then(() => {
                            IntegrantesModel.mostrar()
                                .catch((err) => reject(err))
                                .then((integrantes) => resolve(integrantes));
                        });
                });
        });
    }

    async buscarIntegrantePorId(id) {
        return new Promise((resolve, reject) => {
            IntegrantesModel.buscarIntegrantePorId(id)
                .catch((err) => reject('El integrante no está registrado.'))
                .then((integrante) => resolve(integrante));
        });
    }
}


module.exports = new IntegrantesController();
