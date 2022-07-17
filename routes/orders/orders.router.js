// Importando express
const express = require('express');
// Importando passport (Estrategias para autenticacion)
const passport = require('passport');

// Importando servicio de ordenes
const OrderService = require('../../services/order/order.service');
// Importando los esquemas de ordenes
const {
  createOrderSchema,
  getOrderSchema,
  addItemSchema,
} = require('../../schemas/orders/order.schema');
// Importando middleware de validaciones
const validatorHandler = require('../../middlewares/validator.handler');

const router = express.Router();

// Instanciando el servicio de ordenes
const service = new OrderService();

// Rutas para ordenes
/* LOS ENDPOINTS ESPECIFICOS DEBEN DECLARARSE ANTES DE LOS ENDPOINTS DINAMICOS!!! */

// GET: Obtener ordenes
router.get('/', (req, res, next) => {
  try {
    // Obteniendo todos los ordenes ejecutando el método find
    const orders = service.find();
    res.json(orders);
  } catch (error) {
    // Next permite ejecutar el siguiente middleware, en este caso los middleware tipo error que hayan
    next(error);
  }
});

// GET: Obtener una orden (Antes de hacer la petición, validamos que el esquema sea correcto)
router.get(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      // Accediendo a los parámetros que vienen por URL
      const { id } = req.params;

      // Obteniendo una orden ejecutando el método findOne
      const order = await service.findOne(id);
      res.json(order);
    } catch (error) {
      // Next permite ejecutar el siguiente middleware, en este caso los middleware tipo error que hayan
      next(error);
    }
  }
);

// POST: Crear una orden (Antes de hacer la petición, validamos que el esquema sea correcto)
router.post(
  '/',
  // Capa de autenticacion, (Indicamos el tipo de estrategia)
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      // Accediendo a los datos que vienen por el body (Utilizar postman o insomnia)
      const body = {
        userId: req.user.sub,
      };

      // Creando una orden ejecutando el método create
      const newOrder = await service.create(body);
      res.status(201).json(newOrder);
    } catch (error) {
      // Next permite ejecutar el siguiente middleware, en este caso los middleware tipo error que hayan
      next(error);
    }
  }
);

// POST: Crear un producto en una orden (Antes de hacer la petición, validamos que el esquema sea correcto)
router.post(
  '/add-item',
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      // Accediendo a los datos que vienen por el body (Utilizar postman o insomnia)
      const body = req.body;

      // Creando una item ejecutando el método create
      const newItem = await service.addItem(body);
      res.status(201).json(newItem);
    } catch (error) {
      // Next permite ejecutar el siguiente middleware, en este caso los middleware tipo error que hayan
      next(error);
    }
  }
);

// PATCH: Actualizar una orden (Antes de hacer la petición, validamos que el esquema sea correcto)
router.patch(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      // Accediendo a los parámetros que vienen por URL
      const { id } = req.params;

      // Accediendo a los datos que vienen por el body (Utilizar postman o insomnia)
      const body = req.body;

      // Actualizando una orden ejecutando el método update
      const updatedOrder = await service.update(id, body);
      res.json(updatedOrder);
    } catch (error) {
      // Next permite ejecutar el siguiente middleware, en este caso los middleware tipo error que hayan
      next(error);
    }
  }
);

// DELETE: Eliminar una orden (Antes de hacer la petición, validamos que el esquema sea correcto)
router.delete(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      // Accediendo a los parámetros que vienen por URL
      const { id } = req.params;

      // Eliminando una orden ejecutando el método delete
      const deletedOrder = await service.delete(id);
      res.json(deletedOrder);
    } catch (error) {
      // Next permite ejecutar el siguiente middleware, en este caso los middleware tipo error que hayan
      next(error);
    }
  }
);

// Exportamos modulo
module.exports = router;
