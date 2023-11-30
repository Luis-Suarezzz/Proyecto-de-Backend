const db = require('../database/connection');


class ModalidadesModel {
    async ingresar(modalidad) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO Modalidades (modalidad_mod) VALUES (?)', [modalidad], (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    }

    async mostrar() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM Modalidades;', (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    async buscarModalidadPorId(idModalidad) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM Modalidades WHERE id_mod = ?;', [idModalidad], (err, results) => {
                if (err) reject(err);
                if (!results.length) reject(-1);
                else resolve(results[0]);
            });
        });
    }
}


module.exports = new ModalidadesModel();
