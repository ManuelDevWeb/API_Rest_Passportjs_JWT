// Middlewares globales para capturar cualquier error

// Importando validator de errores sequelize
const { ValidationError } = require('sequelize');

// Middleware para logear errores
function logErrors(err, req, res, next) {
    console.log('logErrors');
    console.log(err);
    // Next permite ejecutar el siguiente middleware
    next(err);
}

// Middleware para crear formato estandar cada que haya error
function errorHandler(err, req, res, next) {
    console.log('errorHandler');
    res.status(500).json({
        message: err.message,
        stack: err.stack,
    });
    // Next permite ejecutar el siguiente middleware
    next(err);
}

// Middleware para manejar errores con boom
function boomErrorHandler(err, req, res, next) {
    // Validamos si el error es tipo boom
    if (err.isBoom) {
        // Destructurando la información del error
        const { output } = err;
        res.status(output.statusCode).json(output.payload);
    }
    // Next permite ejecutar el siguiente middleware
    next(err);
}

// Middleware para manejar errores orm
function ormErrorHandler(err, req, res, next) {
    // Validamos que el error sea de tipo ValidationError (Sequelize)
    if (err instanceof ValidationError) {
        res.status(409).json({
            statusCode: 409,
            message: err.message,
            errors: err.errors,
        });
    }
    // Next permite ejecutar el siguiente middleware
    next(err);
}

// Exportamos módulo
module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler };
