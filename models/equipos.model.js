const db = require('../database/connection');


class EquiposModel {
    async insertar(equipo) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO equipos (equipo_equ) VALUES (?)', [equipo], (err, data) => {
                if (err) reject(err);
                resolve(data.insertId);
            });
        });
    }

    async mostrar() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM equipos;', (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    async editar(idEquipo, equipo) {
        return new Promise((resolve, reject) => {
            db.query('UPDATE equipos SET equipo_equ = ? WHERE id_equ = ?;', [equipo, idEquipo], (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    }

    async eliminar(id) {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM equipos WHERE id_equ = ?;', [id], (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    }

    async mostrarEquiposPorCategoria(idCategoria) {
        return new Promise((resolve, reject) => {
            db.query('SELECT equipos.* FROM categorias_equipos INNER JOIN equipos ON id_equ = id_equ_catequ WHERE id_cat_catequ = ?;', [idCategoria], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    async eliminarInscripcion(idEquipo, idCategoria) {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM categorias_equipos WHERE id_equ_catequ = ? AND id_cat_catequ = ?;', [idEquipo, idCategoria], (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    }

    async inscribirCategoria(idEquipo, idCategoria) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO categorias_equipos (id_equ_catequ, id_cat_catequ) VALUES (?, ?);', [idEquipo, idCategoria], (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    }

    async buscarEquipoPorId(id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM equipos WHERE id_equ = ?;', [id], (err, results) => {
                if (err) reject(err);
                if (!results.length) reject(-1);
                else resolve(results[0]);
            });
        });
    }
}


module.exports = new EquiposModel();
