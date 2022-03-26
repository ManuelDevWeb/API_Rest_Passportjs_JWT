// Importando boom (Manejo de errores con status code)
const boom = require('@hapi/boom');

// Middleware de forma dinámica

// Función que me retorna un Middleware para validar esquemas
function validatorHandler(schema, property) {
    return (req, res, next) => {
        // req.body;
        // req.params;
        // req.query;
        const data = req[property];

        // Validamos el esquema y permitir que envie la información del error
        const { error } = schema.validate(data, { abortEarly: false });

        // Si hay error
        if (error) {
            // Next permite ejecutar el siguiente middleware
            next(boom.badRequest(error));
        }

        // Si no hay error
        next();
    };
}

// Exportamos módulo
module.exports = validatorHandler;
