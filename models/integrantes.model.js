const db = require('../database/connection');


class IntegrantesModel {
    async insertar(integrante, idEquipo) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO integrantes (integrante_int, id_equ_int) VALUES (?, ?);', [integrante, idEquipo], (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    }

    async mostrar() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM integrantes;', (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    async editar(idIntegrante, integrante, idEquipo) {
        return new Promise((resolve, reject) => {
            db.query('UPDATE integrantes SET integrante_int = ?, id_equ_int = ? WHERE id_int = ?;', [integrante, idEquipo, idIntegrante], (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    }

    async eliminar(id) {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM integrantes WHERE id_int = ?;', [id], (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    }

    async buscarIntegrantePorId(id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM integrantes WHERE id_int = ?;', [id], (err, results) => {
                if (err) reject(err);
                if (!results.length) reject(-1);
                else resolve(results[0]);
            });
        });
    }
}


module.exports = new IntegrantesModel();
