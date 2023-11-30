const ModalidadesModel = require('../models/modalidades.model');


class ModalidadesController {
    async ingresar(modalidad) {
        return new Promise((resolve, reject) => {
            ModalidadesModel.ingresar(modalidad)
                .then((idModalidad) => {
                    ModalidadesModel.buscarModalidadPorId(idModalidad)
                        .then((modalidades) => resolve(modalidades))
                        .catch((err) => reject(err));
                })
                .catch((err) => reject(err & err.message ? err.message : err))

        });
    }

    async mostrar() {
        return new Promise((resolve, reject) => {
            ModalidadesModel.mostrar()
                .catch((err) => reject(err))
                .then((modalidades) => resolve(modalidades));
        });
    }

    async buscarModalidadPorId(idModalidad) {
        return new Promise((resolve, reject) => {
            ModalidadesModel.buscarModalidadPorId(idModalidad)
                .catch((err) => reject((err < 0)? 'La modalidad no está registrada' : 'err'))
                .then((modalidad) => resolve(modalidad));
        });
    }
}

module.exports = new ModalidadesController();
