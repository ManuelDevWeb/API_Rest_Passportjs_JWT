// Importando express
const express = require('express');
// Importando passport (Estrategias para autenticacion)
const passport = require('passport');

const router = express.Router();

// Rutas para autenticacion
/* LOS ENDPOINTS ESPECIFICOS DEBEN DECLARARSE ANTES DE LOS ENDPOINTS DINAMICOS!!! */
router.post(
  '/login',
  // Indicamos el tipo de estrategia
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      res.json(req.user);
    } catch (error) {
      next(error);
    }
  }
);

// Exportamos modulo
module.exports = router;
