const db = require('../database/connection');


class PatrocinantesModel {
    async insertar(patrocinante) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO patrocinantes (patrocinante_pat) VALUES (?);', [patrocinante], (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    }

    async mostrar() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM patrocinantes;', (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    async mostrarEquiposPatrocinados(idPatrocinante) {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT equipos.* FROM patrocinantes_equipos INNER JOIN patrocinantes ON id_pat = id_pat_patequ INNER JOIN equipos ON id_equ = id_equ_patequ WHERE id_pat = ?',
                [idPatrocinante],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                });
        });
    }

    async inscribirEquipo(idPatrocinante, idEquipo) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO patrocinantes_equipos (id_pat_patequ, id_equ_patequ) VALUES (?, ?);', [idPatrocinante, idEquipo], (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    }

    async buscarPatrocinantePorId(id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM patrocinantes WHERE id_pat = ?;', [id], (err, results) => {
                if (err) reject(err);
                if (!results.length) reject(-1);
                else resolve(results[0]);
            });
        });
    }
}


module.exports = new PatrocinantesModel();
