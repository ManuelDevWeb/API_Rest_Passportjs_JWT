// Importando estrategia passport-jwt
const { Strategy, ExtractJwt } = require('passport-jwt');

const { config } = require('../../../config/config');

// Opciones para obtener el payload desde el header
const options = {
  // De donde saca el token
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // Secreto
  secretOrKey: config.jwtSecret,
};

// Instanciando la nueva estrategia
const JwtStrategy = new Strategy(options, (payload, done) => {
  // Si todo sale bien, retornamos el payload
  done(null, payload);
});

// Exportamos modulo
module.exports = JwtStrategy;
