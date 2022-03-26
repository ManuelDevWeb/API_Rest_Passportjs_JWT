// Importando joi (Validación de datos)
const Joi = require('joi');

// Campos y sus validaciones
const categoryId = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const image = Joi.string().uri();

// Esquema de categoría para la creación
const createCategorySchema = Joi.object({
    name: name.required(),
    image: image.required(),
});

// Esquema de categoría para la actualización
const updateCategorySchema = Joi.object({
    name: name,
    image: image,
});

// Esquema de categoría para obtener categoría
const getCategorySchema = Joi.object({
    categoryId: categoryId.required(),
});

// Exportamos módulo
module.exports = {
    createCategorySchema,
    updateCategorySchema,
    getCategorySchema,
};
