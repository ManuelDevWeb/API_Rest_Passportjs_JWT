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

      // Llamamos el metodo encargado de firmar el token y devolverlo junto a la info del usuario
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

    // Enviamos el email que viene por body a la funcion encargada de enviar los correos electronicos
    const rta = await service.sendRecoveryPassword(email);

    res.json(rta);
  } catch (error) {
    next(error);
  }
});

// Cambiar password
router.post('/change-password', async (req, res, next) => {
  try {
    // Obteniendo el token y password que viene por body
    const { token, newPassword } = req.body;
    // Enviamos token y password al metodo encargado de cambiar la password
    const rta = await service.changePassword(token, newPassword);
    res.json(rta);
  } catch (error) {
    next(error);
  }
});

// Exportamos modulo
module.exports = router;
