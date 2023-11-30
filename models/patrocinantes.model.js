const db = require('../database/connection');


class PatrocinantesModel {
    async insertar(patrocinante) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO Patrocinantes (patrocinante_pat) VALUES (?);', [patrocinante], (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    }

    async mostrar() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM Patrocinantes;', (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    async mostrarEquiposPatrocinados(idPatrocinante) {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT Equipos.* FROM Patrocinantes_Equipos INNER JOIN Patrocinantes ON id_pat = id_pat_patequ INNER JOIN Equipos ON id_equ = id_equ_patequ WHERE id_pat = ?',
                [idPatrocinante],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                });
        });
    }

    async inscribirEquipo(idPatrocinante, idEquipo) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO Patrocinantes_Equipos (id_pat_patequ, id_equ_patequ) VALUES (?, ?);', [idPatrocinante, idEquipo], (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    }

    async buscarPatrocinantePorId(id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM Patrocinantes WHERE id_pat = ?;', [id], (err, results) => {
                if (err) reject(err);
                if (!results.length) reject(-1);
                else resolve(results[0]);
            });
        });
    }
}


module.exports = new PatrocinantesModel();
