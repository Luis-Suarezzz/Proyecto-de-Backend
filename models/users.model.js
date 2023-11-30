const db = require('../database/connection');
const bcrypt = require("bcryptjs");

class UsersModel {
    // TODO: fix login
    async login(user) {
        const { email, password } = user
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM `users` WHERE `email` = ?', [email], async (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    const userPass = data[0].password
                    
                    bcrypt.compare(userPass, password).then((results) => {
                        resolve();
                    })
                }
            })
        })
    }

    async register(user) {
        const { nombre, email, role } = user;

        if (!nombre || !email || !user.password || !role) {
            throw new Error("Es necesario rellenar todos los campos para avanzar en el registro")
        }

        // Comprobar que el usuario no se encuentre registrado anteriormente
        db.query('SELECT * FROM `users` WHERE `email` = ?', [email], (err, result) => {
            if (result && result[0]) {
                throw new Error("El correo electronico ya esta registrado")
            }
        })

        const password = await bcrypt.hash(user.password, 10)

        // Crear usuario
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO users (`nombre`, `email`, `password`, `role`) VALUES (?, ?, ?, ?);', [nombre, email, password, role], (err, result) => {
                if (err) throw err
                if (result) {
                    const userId = result.insertId;
                    resolve(userId)
                }
            })
        });

    }

    async buscarId(id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM `users` WHERE `id` = ?', [id], (err, results) => {
                // TODO: evitar retornar la "password" del usuario

                if (err) reject(err);
                if (!results.length) reject(-1);
                else resolve(results[0]);
            });
        });
    }
}


module.exports = new UsersModel();
