// Importando joi (Validación de datos)
const Joi = require('joi');

// Campos y sus validaciones
const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const lastName = Joi.string();
const phone = Joi.string();
const userId = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string();

// Esquema de cliente para la creación
const createCustomerSchema = Joi.object({
    name: name.required(),
    lastName: lastName.required(),
    phone: phone.required(),
    user: Joi.object({
        email: email.required(),
        password: password.required(),
    }),
});

// Esquema de cliente para la actualización
const updateCustomerSchema = Joi.object({
    name: name,
    lastName: lastName,
    phone: phone,
    userId: userId,
});

// Esquema de cliente para obtener cliente
const getCustomerSchema = Joi.object({
    id: id.required(),
});

// Exportamos módulo
module.exports = {
    createCustomerSchema,
    updateCustomerSchema,
    getCustomerSchema,
};
