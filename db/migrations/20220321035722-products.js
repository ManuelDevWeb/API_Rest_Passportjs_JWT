'use strict';

// Importando el modelo Category
const {
    CategorySchema,
    CATEGORY_TABLE,
} = require('./../models/category.model');
// Importando el modelo Product
const { ProductSchema, PRODUCT_TABLE } = require('./../models/product.model');

module.exports = {
    async up(queryInterface) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        // Creando tabla, indicamos el nombre de la tabla y el esquema
        await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
        await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
    },

    // Revertir cambios (Similar a control de versiones git)
    async down(queryInterface) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        // Eliminando tabla
        await queryInterface.dropTable(PRODUCT_TABLE);
        await queryInterface.dropTable(CATEGORY_TABLE);
    },
};