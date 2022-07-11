// Importando passport (Estrategias para autenticacion)
const passport = require('passport');

// Importando estrategia local
const LocalStrategy = require('./strategies/local.strategy');
// Importando estrategia jwt
const JwtStrategy = require('./strategies/jwt.strategy');

passport.use(LocalStrategy);
passport.use(JwtStrategy);
