// Importando joi (Validación de datos)
const Joi = require('joi');

// Campos y sus validaciones
const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(6).max(15);
const role = Joi.string().min(5);

// Esquema de usuario para la creación
const createUserSchema = Joi.object({
    email: email.required(),
    password: password.required(),
    role: role.required(),
});

// Esquema de usuario para la actualización
const updateUserSchema = Joi.object({
    email: email,
    password: password,
    role: role,
});

// Esquema de usuario para obtener usuario
const getUserSchema = Joi.object({
    id: id.required(),
});

// Exportamos módulo
module.exports = {
    createUserSchema,
    updateUserSchema,
    getUserSchema,
};
