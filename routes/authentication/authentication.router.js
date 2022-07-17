// Importando express
const express = require('express');
// Importando passport (Estrategias para autenticacion)
const passport = require('passport');

// Importando Service Auth
const AuthService = require('../../services/auth/auth.service');

// Instanciando servicio de auth
const service = new AuthService();

const router = express.Router();

// Rutas para autenticacion
/* LOS ENDPOINTS ESPECIFICOS DEBEN DECLARARSE ANTES DE LOS ENDPOINTS DINAMICOS!!! */
router.post(
  '/login',
  // Capa de autenticacion, (Indicamos el tipo de estrategia)
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      // El middleware local retorna el user
      const { user } = req;

      const rta = await service.signToken(user);

      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

// Recuperar password
router.post('/recovery', async (req, res, next) => {
  try {
    // Obteniendo el email que viene por body
    const { email } = req.body;

    const rta = await service.sendMail(email);

    res.json(rta);
  } catch (error) {
    next(error);
  }
});

// Exportamos modulo
module.exports = router;
