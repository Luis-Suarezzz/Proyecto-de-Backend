const db = require('../database/connection');


class CategoriasModel {
    async ingresar(categoria, idModalidad) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO categorias(categoria_cat, id_mod_cat) VALUES (?, ?);', [categoria, idModalidad], (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    }

    async editar(id, categoria, idModalidad) {
        return new Promise((resolve, reject) => {
            db.query('UPDATE categorias SET categoria_cat = ?, id_mod_cat = ? WHERE id_cat = ?;', [categoria, idModalidad, id], (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    }

    async eliminar(id) {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM categorias WHERE id_cat = ?;', [id], (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    }

    async mostrar() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM categorias;', (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    async buscarCategoriaPorId(id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM categorias WHERE id_cat = ?;', [id], (err, results) => {
                if (err) reject(err);
                if (!results.length) reject(-1);
                else resolve(results[0]);
            });
        });
    }
}


module.exports = new CategoriasModel();
