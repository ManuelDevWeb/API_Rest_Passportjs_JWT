// Importando Sequelize
const { Sequelize } = require('sequelize');

// Importando la configuración con las variables de entorno
const { config } = require('./../config/config');
// Importando la configuración de los modelos
const setupModels = require('./../db/models');

const options = {
    // Indicamos la BD que estamos utilizando
    dialect: 'postgres',
    // dialect: 'mysql',
    // Si es true casa que hagamos una consulta por ORM nos muestra cómo hacerla en lenguaje SQL
    logging: config.isProd ? false : true,
};

// Validando si estamos en producción para agregar ssl
if (config.isProd) {
    options.dialectOptions = {
        ssl: {
            rejectUnauthorized: false,
        },
    };
}

// Protegiendo variables de entorno
// const USER = encodeURIComponent(config.dbUser);
// const PASSWORD = encodeURIComponent(config.dbPassword);
// Creando URL de conexión
// const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
// const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

// Instancia de sequelize (Por detras maneja conexión tipo Pool)
const sequelize = new Sequelize(config.dbUrl, options);

// Ejecutamos la función setupModels despues de crear la isntancia y le pasamos la conexión
setupModels(sequelize);

// Realiza una sincronización, agarra los modelo y crea la estructura (No se aconseja en producción).
// Crea de nuevo las tablas cada que se llama esta función
// Para Producción implementar sistema de migración
// sequelize.sync();

// Exportamos módulo
module.exports = sequelize;