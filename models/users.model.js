const db = require('../database/connection');

class UsersModel {
    async login(user) {
        const { email, password } = user
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM `users` WHERE `email` = ?', [email], (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    const userPass = data[0].password
                    bcrypt.compare(userPass, password).then((results) => {
                        console.log(results);
                    })
                    resolve();
                }
            })
        })
    }

    async register(user) {
        const { nombre, email, password } = user;
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO users (`nombre`, `email`, `password`, `tipo_user`) VALUES (?, ?);', [nombre, email, password], (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    }

    async buscarId(id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM `users` WHERE `id` = ?;', [id], (err, results) => {
                if (err) reject(err);
                if (!results.length) reject(-1);
                else resolve(results[0]);
            });
        });
    }
}


module.exports = new UsersModel();
