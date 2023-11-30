const db = require('../database/connection');


class ModalidadesModel {
    async ingresar(modalidad) {
        
        // Comprobar que la modalidad no se encuentre registrada anteriormente
        db.query('SELECT * FROM `modalidades` WHERE `modalidad_mod` = ?', [modalidad], (err, result) => {
            if (result && result[0]) {
                throw new Error("La modalidad ya esta registrada")
            }
        })

        return new Promise((resolve, reject) => {
            db.query('INSERT INTO modalidades (modalidad_mod) VALUES (?)', [modalidad], (err, data) => {
                if (err) reject(err);
                resolve(data.insertId);
            });
        });
    }

    async mostrar() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM modalidades;', (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    async buscarModalidadPorId(idModalidad) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM modalidades WHERE id_mod = ?;', [idModalidad], (err, results) => {
                if (err) reject(err);
                if (!results || (results && !results.length)) reject(-1);
                else resolve(results[0]);
            });
        });
    }
}


module.exports = new ModalidadesModel();
