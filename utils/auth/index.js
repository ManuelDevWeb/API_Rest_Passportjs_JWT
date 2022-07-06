// Importando passport (Estrategias para autenticacion)
const passport = require('passport');

// Importando estrategia local
const LocalStrategy = require('./strategies/local.strategy');

passport.use(LocalStrategy);
