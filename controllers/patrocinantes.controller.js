const PatrocinantesModel = require('../models/patrocinantes.model');
const EquiposController = require('./equipos.controller');


class PatrocinantesController {
    async insertar(patrocinante) {
        return new Promise((resolve, reject) => {
            PatrocinantesModel.insertar(patrocinante)
                .catch((err) => reject('El patrocinante ya está registrado.'))
                .then(() => {
                    PatrocinantesModel.mostrar()
                        .catch((err) => reject(err))
                        .then((patrocinantes) => resolve(patrocinantes));
                });
        });
    }

    async mostrar() {
        return new Promise((resolve, reject) => {
            PatrocinantesModel.mostrar()
                .catch((err) => reject(err))
                .then((patrocinantes) => resolve(patrocinantes));
        });
    }

    async mostrarEquiposPatrocinados(idPatrocinante) {
        return new Promise((resolve, reject) => {
            PatrocinantesModel.buscarPatrocinantePorId(idPatrocinante)
                .catch((err) => reject('El patrocinante no está registrado.'))
                .then(() => {
                    PatrocinantesModel.mostrarEquiposPatrocinados(idPatrocinante)
                        .catch((err) => reject(err))
                        .then((equipos) => resolve(equipos));
                });
        });
    }

    async inscribirEquipo(idPatrocinante, idEquipo) {
        return new Promise((resolve, reject) => {
            EquiposController.buscarEquipoPorId(idEquipo)
                .catch((err) => reject(err))
                .then(() => {
                    PatrocinantesModel.buscarPatrocinantePorId(idPatrocinante)
                        .catch((err) => reject('El patrocinante no está registrado.'))
                        .then(() => {
                            PatrocinantesModel.inscribirEquipo(idPatrocinante, idEquipo)
                                .catch((err) => reject(err))
                                .then(() => {
                                    PatrocinantesModel.mostrarEquiposPatrocinados(idPatrocinante)
                                        .catch((err) => reject(err))
                                        .then((equipos) => resolve(equipos));
                                });
                        });
                });
        });
    }
}

module.exports = new PatrocinantesController();
