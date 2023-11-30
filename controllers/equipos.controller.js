const CategoriasController = require('./categorias.controller');
const EquiposModel = require('../models/equipos.model');


class EquiposController {
    async insertar(equipo) {
        return new Promise((resolve, reject) => {
            EquiposModel.insertar(equipo)
                .then((idTeam) => {
                    EquiposModel.buscarEquipoPorId(idTeam)
                        .then((equipos) => resolve(equipos))
                        .catch((err) => reject(err));
                })
                .catch((err) => reject('El equipo ya está registrado.'));
        });
    }

    async mostrar() {
        return new Promise((resolve, reject) => {
            EquiposModel.mostrar()
                .catch((err) => reject(err))
                .then((equipos) => resolve(equipos));
        });
    }

    async editar(idEquipo, equipo) {
        return new Promise((resolve, reject) => {
            EquiposModel.editar(idEquipo, equipo)
                .catch((err) => reject('Ha ocurrido un error actualizando los datos del equipo'))
                .then(() => {
                    EquiposModel.buscarEquipoPorId(idEquipo)
                        .catch((err) => reject('El equipo no está registrado.'))
                        .then((equipo) => resolve(equipo));
                });
        });
    }

    async eliminar(id) {
        return new Promise((resolve, reject) => {
            EquiposModel.buscarEquipoPorId(id)
                .catch((err) => reject('El equipo no está registrado.'))
                .then(() => {
                    EquiposModel.eliminar(id)
                        .catch((err) => reject(err))
                        .then(() => {
                            EquiposModel.mostrar()
                                .catch((err) => reject(err))
                                .then((equipos) => resolve(equipos));
                        });
                });
        });
    }

    async mostrarEquiposPorCategoria(idCategoria) {
        return new Promise((resolve, reject) => {
            CategoriasController.buscarCategoriaPorId(idCategoria)
                .catch((err) => reject(err))
                .then(() => {
                    EquiposModel.mostrarEquiposPorCategoria(idCategoria)
                        .catch((err) => reject(err))
                        .then((equipos) => resolve(equipos));
                });
        });
    }

    async eliminarInscripcion(idEquipo, idCategoria) {
        return new Promise((resolve, reject) => {
            CategoriasController.buscarCategoriaPorId(idCategoria)
                .catch((err) => reject(err))
                .then(() => {
                    EquiposModel.buscarEquipoPorId(idEquipo)
                        .catch((err) => reject('El equipo no está registrado.'))
                        .then(() => {
                            EquiposModel.eliminarInscripcion(idEquipo, idCategoria)
                                .catch((err) => reject(err))
                                .then(() => {
                                    EquiposModel.mostrarEquiposPorCategoria(idCategoria)
                                        .catch((err) => reject(err))
                                        .then((equipos) => resolve(equipos));
                                });
                        });
                });
        });
    }

    async inscribirCategoria(idEquipo, idCategoria) {
        console.log('Se ha recibido: ' + idEquipo, idCategoria);

        return new Promise((resolve, reject) => {
            CategoriasController.buscarCategoriaPorId(idCategoria)
                .then(() => {
                    EquiposModel.buscarEquipoPorId(idEquipo)
                        .then(() => {
                            EquiposModel.inscribirCategoria(idEquipo, idCategoria)
                                .then(() => {
                                    EquiposModel.mostrarEquiposPorCategoria(idCategoria)
                                        .catch((err) => reject(err))
                                        .then((equipos) => resolve(equipos));
                                })
                                .catch((err) => reject(err));
                        })
                        .catch((err) => reject('El equipo no está registrado.'));
                })
                .catch((err) => reject(err));
        });
    }

    async buscarEquipoPorId(idEquipo) {
        return new Promise((resolve, reject) => {
            EquiposModel.buscarEquipoPorId(idEquipo)
                .catch((err) => reject('El equipo no está registrado.'))
                .then((equipo) => resolve(equipo));
        });
    }
}

module.exports = new EquiposController();
