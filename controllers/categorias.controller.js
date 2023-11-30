const CategoriasModel = require('../models/categorias.model');
const ModalidadesController = require('./modalidades.controller');


class CategoriasController {
    async ingresar(categoria, idModalidad) {
        return new Promise((resolve, reject) => {
            ModalidadesController.buscarModalidadPorId(idModalidad)
                .catch((err) => reject(err))
                .then(() => {
                    CategoriasModel.ingresar(categoria, idModalidad)
                        .catch((err) => reject('La categoría ya se encuentra registrada.'))
                        .then(() => {
                            CategoriasModel.mostrar()
                                .catch((err) => reject(err))
                                .then((categorias) => resolve(categorias));
                        });
                });
        });
    }

    async editar(id, categoria, idModalidad) {
        return new Promise((resolve, reject) => {
            ModalidadesController.buscarModalidadPorId(idModalidad)
                .catch((err) => reject(err))
                .then(() => {
                    CategoriasModel.editar(id, categoria, idModalidad)
                        .catch((err) => reject('La categoría ya está registrada.'))
                        .then(() => {
                            CategoriasModel.buscarCategoriaPorId(id)
                                .catch((err) => reject('La categoría no está registrada.'))
                                .then((categoria) => resolve(categoria));
                        });
                });
        });
    }

    async eliminar(id) {
        return new Promise((resolve, reject) => {
            CategoriasModel.buscarCategoriaPorId(id)
                .catch((err) => reject('La categoría no está registrada.'))
                .then(() => {
                    CategoriasModel.eliminar(id)
                        .catch((err) => reject(err))
                        .then(() => {
                            CategoriasModel.mostrar()
                                .catch((err) => reject(err))
                                .then((categorias) => resolve(categorias));
                        });
                });
        });
    }

    async mostrar() {
        return new Promise((resolve, reject) => {
            CategoriasModel.mostrar()
                .catch((err) => reject(err))
                .then((categorias) => resolve(categorias));
        });
    }

    async buscarCategoriaPorId(id) {
        return new Promise((resolve, reject) => {
            CategoriasModel.buscarCategoriaPorId(id)
                .catch((err) => reject('La categoría no se encuentra registrada'))
                .then((categoria) => resolve(categoria));
        });
    }
}


module.exports = new CategoriasController();
