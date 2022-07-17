// Importando express
const express = require('express');
// Importando passport (Estrategias para autenticacion)
const passport = require('passport');

// Importando servicio de ordenes
const OrderService = require('../../services/order/order.service');

const router = express.Router();

// Instanciando el servicio de ordenes
const service = new OrderService();

// Rutas para autenticacion
/* LOS ENDPOINTS ESPECIFICOS DEBEN DECLARARSE ANTES DE LOS ENDPOINTS DINAMICOS!!! */
router.get(
  '/my-orders',
  // Capa de autenticacion, (Indicamos el tipo de estrategia)
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      // El middleware anterior dejo la informacion del usuario
      const { user } = req;
      // Obteniendo todas las ordenes de un usuario (Enviamos id que es user.sub)
      const ordersUser = await service.findByUser(user.sub);
      res.json(ordersUser);
    } catch (error) {
      next(error);
    }
  }
);

// Exportamos modulo
module.exports = router;
