// Importando express
const express = require('express');

// Importando servicio de clientes
const CustomerService = require('../../services/customer/customer.service');
// Importando los esquemas de clientes
const {
    createCustomerSchema,
    updateCustomerSchema,
    getCustomerSchema,
} = require('../../schemas/customers/customers.schema');
// Importando middleware de validaciones
const validatorHandler = require('../../middlewares/validator.handler');

const router = express.Router();

// Instanciando el servicio de clientes
const service = new CustomerService();

// Rutas para clientes
/* LOS ENDPOINTS ESPECIFICOS DEBEN DECLARARSE ANTES DE LOS ENDPOINTS DINAMICOS!!! */

// GET: Obtener clientes
router.get('/', async(req, res, next) => {
    try {
        // Obteniendo todos los clientes ejecutando el método find
        const customers = await service.find();
        res.json(customers);
    } catch (error) {
        // Next permite ejecutar el siguiente middleware, en este caso los middleware tipo error que hayan
        next(error);
    }
});

// GET: Obtener un cliente (Antes de hacer la petición, validamos que el esquema sea correcto)
router.get(
    '/:id',
    validatorHandler(getCustomerSchema, 'params'),
    async(req, res, next) => {
        try {
            // Accediendo a los parámetros que vienen por URL
            const { id } = req.params;

            // Obteniendo un cliente ejecutando el método findOne
            const customer = await service.findOne(id);
            res.json(customer);
        } catch (error) {
            // Next permite ejecutar el siguiente middleware, en este caso los middleware tipo error que hayan
            next(error);
        }
    }
);

// POST: Crear un cliente (Antes de hacer la petición, validamos que el esquema sea correcto)
router.post(
    '/',
    validatorHandler(createCustomerSchema, 'body'),
    async(req, res, next) => {
        try {
            // Accediendo a los datos que vienen por el body (Utilizar postman o insomnia)
            const { body } = req;

            // Creando un cliente ejecutando el método create
            const newCustomer = await service.create(body);
            res.status(201).json(newCustomer);
        } catch (error) {
            // Next permite ejecutar el siguiente middleware, en este caso los middleware tipo error que hayan
            next(error);
        }
    }
);

// PUT: Actualizar un cliente (Antes de hacer la petición, validamos que el esquema sea correcto)
router.patch(
    '/id',
    validatorHandler(getCustomerSchema, 'params'),
    validatorHandler(updateCustomerSchema, 'body'),
    async(req, res, next) => {
        try {
            // Accediendo a los parámetros que vienen por URL
            const { id } = req.params;

            // Accediendo a los datos que vienen por el body (Utilizar postman o insomnia)
            const body = req.body;

            // Actualizando un cliente ejecutando el método update
            const updatedCustomer = await service.update(id, body);
            res.json(updatedCustomer);
        } catch (error) {
            // Next permite ejecutar el siguiente middleware, en este caso los middleware tipo error que hayan
            next(error);
        }
    }
);

// DELETE: Eliminar un cliente (Antes de hacer la petición, validamos que el esquema sea correcto)
router.delete(
    '/:id',
    validatorHandler(getCustomerSchema, 'params'),
    async(req, res, next) => {
        try {
            // Accediendo a los parámetros que vienen por URL
            const { id } = req.params;

            // Eliminando un cliente ejecutando el método delete
            const deletedCustomer = await service.delete(id);
            res.json(deletedCustomer);
        } catch (error) {
            // Next permite ejecutar el siguiente middleware, en este caso los middleware tipo error que hayan
            next(error);
        }
    }
);

// Exportamos módulo
module.exports = router;