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

// Funcion para validar el rol
function checkAdminRole(req, res, next) {
  // console.log(req.user);
  // Obteniendo user del payload que retorna la estrategia jwt
  const user = req.user;

  // Si es de tipo admin, lo dejamos pasar
  if (user.role === 'admin') {
    next();
  } else {
    next(boom.forbidden('Se requieren permisos de administrador'));
  }
}

// Funcion para validar roles (... convierte en array lo que venga)
function checkRoles(...roles) {
  // Closure (Funcion que retorna otra funcion)
  return (req, res, next) => {
    // Obteniendo user del payload que retorna la estrategia jwt
    const user = req.user;

    // Validando si el rol del usuario esta dentro del arreglo de roles
    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.forbidden('Se requieren permisos de administrador'));
    }
  };
}

// Exportamos modulo
module.exports = { checkApiKey, checkAdminRole, checkRoles };
