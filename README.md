## Concurso Robótica API
Este es un servidor de node.js que se encarga de administrar un campeonato de robótica que está siendo organizado por la Universidad Valle del Momboy.

El servidor ofrece una API RESTful para acceder a los datos de las categorías, equipos, integrantes, modalidades, patrocinadores y usuarios del concurso.

# Requisitos
Para ejecutar el servidor, se necesita lo siguiente:

- Node.js (última versión)
- MySQL (entre la versión 5.3 y 8)
- Los módulos de node.js especificados en el archivo package.json

# Instalación
Para instalar el servidor, se deben seguir estos pasos:

1. Clonar el repositorio o descargar el código fuente
2. Abrir una terminal en la carpeta del proyecto
3. Ejecutar el comando `npm install` para instalar los módulos necesarios
4. Crear una base de datos MySQL con el nombre que se prefiera
5. Importar el archivo robotica.sql que se encuentra en la ruta /database/robotica.sql a la base de datos creada
6. Crear un archivo `.env` con las variables de entorno necesarias para conectarse a la base de datos, como se indica en el archivo db.js

# .env de ejemplo
```
TOKEN_SECRET = MyUltraSecretToken.1234--#%*()

PORT = 3030

DB_DATABASE=robotica
DB_PASSWORD=
DB_USER=root
DB_HOST=localhost
```

# Ejecución
Para ejecutar el servidor, se pueden usar los siguientes scripts:

- `npm start`: Ejecuta el servidor con node.js
- `npm run dev`: Ejecuta el servidor con nodemon, que permite reiniciar el servidor automáticamente cuando se detectan cambios en el código

## Uso
Para usar el servidor, se pueden enviar peticiones HTTP a las diferentes rutas que ofrece la API. Estas rutas están documentadas en la colección de Postman que se encuentra en `./Concurso Robotica API.postman_collection.json`.

La mayoría de las rutas requieren un token de autenticación (JWT) y un rol específico para acceder a los recursos. Para obtener el token, se debe enviar una petición de tipo `POST` a la ruta `/usuarios/login` con el email y la contraseña de un usuario registrado (email, password).

El token se debe enviar en el encabezado Authorization con el formato `Bearer Token`