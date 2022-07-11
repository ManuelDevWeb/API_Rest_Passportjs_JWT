// Importando express
const express = require('express');
// Importando passport (Estrategias para autenticacion)
const passport = require('passport');
// Importando JWT
const jwt = require('jsonwebtoken');

const { config } = require('../../config/config');

const router = express.Router();

// Rutas para autenticacion
/* LOS ENDPOINTS ESPECIFICOS DEBEN DECLARARSE ANTES DE LOS ENDPOINTS DINAMICOS!!! */
router.post(
  '/login',
  // Capa de autenticacion, (Indicamos el tipo de estrategia)
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      // El middleware anterior dejo la informacion del usuario
      const { user } = req;

      // Informacion a encriptar dentro del token
      const payload = {
        // Identificar del token
        sub: user.id,
        // Informacion que queramos
        role: user.role,
      };

      // Firmando token
      const token = jwt.sign(payload, config.jwtSecret);

      res.json({ user, token });
    } catch (error) {
      next(error);
    }
  }
);

// Exportamos modulo
module.exports = router;
