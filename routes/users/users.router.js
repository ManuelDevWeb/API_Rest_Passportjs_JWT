// Importando express
const express = require('express');

// Importando servicio de usuarios
const UserService = require('../../services/user/user.service');
// Importando los esquemas de usuarios
const {
    createUserSchema,
    updateUserSchema,
    getUserSchema,
} = require('../../schemas/users/user.schema');
// Importando middleware de validaciones
const validatorHandler = require('../../middlewares/validator.handler');

const router = express.Router();

// Instanciando el servicio de usuarios
const service = new UserService();

// Rutas para users
/* LOS ENDPOINTS ESPECIFICOS DEBEN DECLARARSE ANTES DE LOS ENDPOINTS DINAMICOS!!! */

// GET: Obtener usuarios
router.get('/', async(req, res, next) => {
    try {
        // Obteniendo todos los usuarios ejecutando el método find
        const users = await service.find();
        res.json(users);
    } catch (error) {
        // Next permite ejecutar el siguiente middleware, en este caso los middleware tipo error que hayan
        next(error);
    }
});

// GET: Obtener un usuario (Antes de hacer la petición, validamos que el esquema sea correcto)
router.get(
    '/:id',
    validatorHandler(getUserSchema, 'params'),
    async(req, res, next) => {
        try {
            // Accediendo a los parámetros que vienen por URL
            const { id } = req.params;

            // Obteniendo un usuario ejecutando el método findOne
            const user = await service.findOne(id);
            res.json(user);
        } catch (error) {
            // Next permite ejecutar el siguiente middleware, en este caso los middleware tipo error que hayan
            next(error);
        }
    }
);

// POST: Crear un usuario (Antes de hacer la petición, validamos que el esquema sea correcto)
router.post(
    '/',
    validatorHandler(createUserSchema, 'body'),
    async(req, res, next) => {
        try {
            // Accediendo a los datos que vienen por el body (Utilizar postman o insomnia)
            const body = req.body;

            // Creando un usuario ejecutando el método create
            const newUser = await service.create(body);
            res.status(201).json(newUser);
        } catch (error) {
            // Next permite ejecutar el siguiente middleware, en este caso los middleware tipo error que hayan
            next(error);
        }
    }
);

// PATCH: Actualizar un usuario (Antes de hacer la petición, validamos que el esquema sea correcto)
router.patch(
    '/:id',
    validatorHandler(getUserSchema, 'params'),
    validatorHandler(updateUserSchema, 'body'),
    async(req, res, next) => {
        try {
            // Accediendo a los parámetros que vienen por URL
            const { id } = req.params;

            // Accediendo a los datos que vienen por el body (Utilizar postman o insomnia)
            const body = req.body;

            // Actualizando un usuario ejecutando el método update
            const updatedUser = await service.update(id, body);
            res.json(updatedUser);
        } catch (error) {
            // Next permite ejecutar el siguiente middleware, en este caso los middleware tipo error que hayan
            next(error);
        }
    }
);

// DELETE: Eliminar un usuario (Antes de hacer la petición, validamos que el esquema sea correcto)
router.delete(
    '/:id',
    validatorHandler(getUserSchema, 'params'),
    async(req, res, next) => {
        try {
            // Accediendo a los parámetros que vienen por URL
            const { id } = req.params;

            // Eliminando un usuario ejecutando el método delete
            const deletedUser = await service.delete(id);
            res.json(deletedUser);
        } catch (error) {
            // Next permite ejecutar el siguiente middleware, en este caso los middleware tipo error que hayan
            next(error);
        }
    }
);

// Exportamos módulo
module.exports = router;
