// Importando boom (Manejo de errores con status code)
const boom = require('@hapi/boom');

// Importando sequelize para conectarnos a la base de datos mediante ORM (En models guarda los modelos)
const { models } = require('../../libs/sequelize');

// Clase Servicio Category
class CategoryService {
    constructor() {}

    // Crear Categoria
    async create(data) {
        // Creando categoria con las funcionalidades que nos brinda el ORM Sequelize
        const newCategory = await models.Category.create(data);
        return newCategory;
    }

    // Buscar Categorias
    async find() {
        // Buscando categorias con las funcionalidades que nos brinda el ORM Sequelize
        const categories = await models.Category.findAll();
        return categories;
    }

    // Buscar una categoria
    async findOne(id) {
        // Buscando categoria por id con las funcionalidades que nos brinda el ORM Sequelize
        const category = await models.Category.findByPk(id, {
            // Incluimos las asociaciones definidas en la clase Category del modelo
            include: ['products'],
        });

        // Validando que la categoria exista
        if (!category) {
            throw boom.notFound('Category not found');
        }

        return category;
    }

    // Actualizar una categoria
    async update(id, changes) {
        return { id, changes };
    }

    // Eliminar una categoria
    async remove(id) {
        return { id };
    }
}

// Exportamos módulo
module.exports = CategoryService;
