// Importando express
const express = require('express');
// Importando passport (Estrategias para autenticacion)
const passport = require('passport');

// Importando servicio de categorias
const CategoryService = require('../../services/category/category.service');
// Importando los esquemas de catergorias
const {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
} = require('../../schemas/categories/category.schema');
// Importando middleware de validaciones
const validatorHandler = require('../../middlewares/validator.handler');

const router = express.Router();

// Instanciando el servicio de categorias
const service = new CategoryService();

// Rutas para categorias
/* LOS ENDPOINTS ESPECIFICOS DEBEN DECLARARSE ANTES DE LOS ENDPOINTS DINAMICOS!!! */

// GET: Obtener todas las categorias
router.get('/', async (req, res, next) => {
  try {
    // Obteniendo todas las categorias ejecutando el método find
    const categories = await service.find();
    res.json(categories);
  } catch (error) {
    // Next permite ejecutar el siguiente middleware, en este caso los middleware tipo error que hayan
    next(error);
  }
});

// GET: Obtener una categoria (Antes de hacer la petición, validamos que el esquema sea correcto)
router.get(
  '/:categoryId',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      // Accediendo a los parámetros que vienen por URL
      const { categoryId } = req.params;

      // Obteniendo una categoria ejecutando el método findOne
      const category = await service.findOne(categoryId);
      res.json(category);
    } catch (error) {
      // Next permite ejecutar el siguiente middleware, en este caso los middleware tipo error que hayan
      next(error);
    }
  }
);

// POST: Crear una categoria (Antes de hacer la petición, validamos que el esquema sea correcto)
router.post(
  '/',
  // Capa de autenticacion, (Indicamos el tipo de estrategia) y para que funcione se debe enviar el token constantemente (bearertoken)
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      // Accediendo a los datos que vienen por el body (Utilizar postman o insomnia)
      const body = req.body;

      // Creando una categoría ejecutando el método create
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      // Next permite ejecutar el siguiente middleware, en este caso los middleware tipo error que hayan
      next(error);
    }
  }
);

// PATCH: Actualizar una categoria (Antes de hacer la petición, validamos que el esquema sea correcto)
router.patch(
  '/:categoryId',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      // Accediendo a los parámetros que vienen por URL
      const { categoryId } = req.params;

      // Accediendo a los datos que vienen por el body (Utilizar postman o insomnia)
      const body = req.body;

      // Actualizando una categoria ejecutando el método update
      const updatedCategory = await service.update(categoryId, body);
      res.json(updatedCategory);
    } catch (error) {
      // Next permite ejecutar el siguiente middleware, en este caso los middleware tipo error que hayan
      next(error);
    }
  }
);

// DELETE: Eliminar una categoria (Antes de hacer la petición, validamos que el esquema sea correcto)
router.delete(
  '/:categoryId',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      // Accediendo a los parámetros que vienen por URL
      const { categoryId } = req.params;

      // Eliminando una categoria ejecutando el método delete
      const deletedCategory = await service.delete(categoryId);
      res.status(201).json(deletedCategory);
    } catch (error) {
      next(error);
    }
  }
);

// Exportamos módulo
module.exports = router;
