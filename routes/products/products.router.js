// Importando express
const express = require('express');

// Importando servicio de productos
const ProductService = require('../../services/product/product.service');
// Importando los esquemas de productos
const {
    createProductSchema,
    updateProductSchema,
    getProductSchema,
    queryProductSchema,
} = require('../../schemas/products/product.schema');
// Importando middleware de validaciones
const validatorHandler = require('../../middlewares/validator.handler');

const router = express.Router();

// Instanciando el servicio de productos
const service = new ProductService();

// Rutas para productos
/* LOS ENDPOINTS ESPECIFICOS DEBEN DECLARARSE ANTES DE LOS ENDPOINTS DINAMICOS!!! */

// GET: Obtener todos los productos
router.get(
    '/',
    validatorHandler(queryProductSchema, 'query'),
    async(req, res, next) => {
        try {
            // Accediendo a los parámetros de la query
            const { limit, offset, price, price_min, price_max } = req.query;

            // Obteniendo todos los productos ejecutando el método find
            const products = await service.find(
                limit,
                offset,
                price,
                price_min,
                price_max
            );
            res.json(products);
        } catch (error) {
            // Next permite ejecutar el siguiente middleware, en este caso los middleware tipo error que hayan
            next(error);
        }
    }
);

router.get('/filter', (req, res) => {
    res.send('Yo soy un filter');
});

// GET: Obtener un producto (Antes de hacer la petición, validamos que el esquema sea correcto)
router.get(
    '/:id',
    validatorHandler(getProductSchema, 'params'),
    async(req, res, next) => {
        try {
            // Accediendo a los parámetros que vienen por URL
            const { id } = req.params;

            // Obteniendo un producto ejecutando el método findOne
            const product = await service.findOne(id);
            res.json(product);
        } catch (error) {
            // Next permite ejecutar el siguiente middleware, en este caso los middleware tipo error que hayan
            next(error);
        }
    }
);

// POST: Crear un producto (Antes de hacer la petición, validamos que el esquema sea correcto)
router.post(
    '/',
    validatorHandler(createProductSchema, 'body'),
    async(req, res) => {
        // Accediendo a los datos que vienen por el body (Utilizar postman o insomnia)
        const body = req.body;

        // Creando un producto ejecutando el método create
        const newProduct = await service.create(body);
        res.status(201).json(newProduct);
    }
);

// PATCH: Actualizar un producto (Antes de hacer la petición, validamos que el esquema sea correcto)
router.patch(
    '/:id',
    validatorHandler(getProductSchema, 'params'),
    validatorHandler(updateProductSchema, 'body'),
    async(req, res, next) => {
        try {
            // Accediendo a los parámetros que vienen por URL
            const { id } = req.params;

            // Accediendo a los datos que vienen por el body (Utilizar postman o insomnia)
            const body = req.body;

            // Actualizando un producto ejecutando el método update
            const updatedProduct = await service.update(id, body);
            res.json(updatedProduct);
        } catch (error) {
            // Next permite ejecutar el siguiente middleware, en este caso los middleware tipo error que hayan
            next(error);
        }
    }
);

// DELETE: Eliminar un producto
router.delete('/:id', async(req, res) => {
    // Accediendo a los parámetros que vienen por URL
    const { id } = req.params;

    // Eliminando un producto ejecutando el método delete
    const deletedProducr = await service.delete(id);
    res.json(deletedProducr);
});

// Exportamos módulo
module.exports = router;
