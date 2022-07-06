// Importando estrategia passport-local
const { Strategy } = require('passport-local');
// Importando boom (Manejo de errores con status code)
const boom = require('@hapi/boom');
// Importando bcrypt (Encriptacion de password)
const bcrypt = require('bcrypt');

// Importando servicio de usuarios
const UserService = require('../../../services/user/user.service');

// Instanciando el servicio de usuarios
const service = new UserService();

// Instanciando la nueva estrategia
const LocalStrategy = new Strategy(
  {
    // Personalizar como recibe los nombres la estrategia
    usernameField: 'email',
  },
  async (email, password, done) => {
    try {
      // Intentamos buscar el usuario por email
      const user = await service.findByEmail(email);

      // Validamos que exista el usuario
      if (!user) {
        done(boom.unauthorized(), false);
      }

      // Comparamos la password ingresada con la haseada en la DB
      const isCorrect = await bcrypt.compare(password, user.password);

      if (!isCorrect) {
        done(boom.unauthorized(), false);
      }

      delete user.dataValues.password;

      // Si todo sale bien, retornamos que no hay error y el usuario
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

// Exportamos modulo
module.exports = LocalStrategy;
