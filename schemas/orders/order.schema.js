// Importando joi (Validación de datos)
const Joi = require('joi');

// Campos y sus validaciones
const id = Joi.number().integer();
const customerId = Joi.number().integer();
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const amount = Joi.number().integer().min(1);

// Esquema de orden para obtener orden
const getOrderSchema = Joi.object({
    id: id.required(),
});

// Esquema de orden para la creación
const createOrderSchema = Joi.object({
    customerId: customerId.required(),
});

// Esquema de item para la creación
const addItemSchema = Joi.object({
    orderId: orderId.required(),
    productId: productId.required(),
    amount: amount.required(),
});

// Exportamos módulo
module.exports = { getOrderSchema, createOrderSchema, addItemSchema };