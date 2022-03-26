// Importando la configuración con las variables de entorno
const { config } = require('../config/config');

// Protegiendo variables de entorno
// const USER = encodeURIComponent(config.dbUser);
// const PASSWORD = encodeURIComponent(config.dbPassword);
// Creando URL de conexión
// const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
// const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

// Exportamos módulo
module.exports = {
    // Ambiente desarrollo
    development: {
        url: config.dbUrl,
        // Indicamos la BD que estamos utilizando
        dialect: 'postgres',
        // dialect: 'mysql',
    },
    // Ambiente producción
    production: {
        url: config.dbUrl,
        // Indicamos la BD que estamos utilizando
        dialect: 'postgres',
        // dialect: 'mysql',
        dialectOptions: {
            ssl: {
                rejectUnauthorized: false,
            },
        },
    },
};