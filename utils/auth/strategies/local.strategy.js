// Importando estrategia passport-local
const { Strategy } = require('passport-local');

// Importando Service Auth
const AuthService = require('../../../services/auth/auth.service');

// Instanciando servicio de auth
const service = new AuthService();

// Instanciando la nueva estrategia
const LocalStrategy = new Strategy(
  {
    // Personalizar como recibe los nombres la estrategia
    usernameField: 'email',
  },
  async (email, password, done) => {
    try {
      const user = await service.getUser(email, password);
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

// Exportamos modulo
module.exports = LocalStrategy;
