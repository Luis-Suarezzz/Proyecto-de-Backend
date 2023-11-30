const ModalidadesModel = require('../models/modalidades.model');


class ModalidadesController {
    async ingresar(modalidad) {
        return new Promise((resolve, reject) => {
            ModalidadesModel.ingresar(modalidad)
                .catch((err) => reject(err))
                .then(() => {
                    ModalidadesModel.mostrar()
                        .catch((err) => reject(err))
                        .then((modalidades) => resolve(modalidades));
                });
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
