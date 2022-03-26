/*
  Un pool de conexiones es un conjunto limitado de conexiones a una
  base de datos, que es manejado por un servidor de aplicaciones de
  forma tal, que dichas conexiones pueden ser reutilizadas por los
  diferentes usuarios.
*/

// Importando pg para conectarnos a la base de datos
const { Pool } = require('pg');

// Importando la configuración con las variables de entorno
const { config } = require('./../config/config');

const options = {};

// Validando el ambiente producción
if (config.isProd) {
    // URL de conexión (en producción)
    // Tener en cuenta que estamos usando docker
    options.connectionString = config.dbUrl;
    options.ssl = {
        rejectUnauthorized: false,
    };
} else {
    // Protegiendo variables de entorno
    const USER = encodeURIComponent(config.dbUser);
    const PASSWORD = encodeURIComponent(config.dbPassword);
    // Creando URL de conexión (Modo desarrollo)
    const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
    options.connectionString = URI;
}

// Pool para conectarnos a la BD
const pool = new Pool(options);

// Exportamos módulo
module.exports = pool;