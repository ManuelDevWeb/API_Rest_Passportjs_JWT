// Middleware encargado de validar el key que viene por headers

// Importando boom (Manejo de errores con status code)
const boom = require('@hapi/boom');

// Importando la configuración con las variables de entorno
const { config } = require('../config/config');

// Funcion para validar la key de autenticacion
function checkApiKey(req, res, next) {
  // Obteniendo key de los headers
  const apiKey = req.headers['api'];

  if (apiKey === config.apiKey) {
    // Next permite ejecutar el siguiente middleware
    next();
  } else {
    next(boom.unauthorized());
  }
}

// Exportamos modulo
module.exports = { checkApiKey };
