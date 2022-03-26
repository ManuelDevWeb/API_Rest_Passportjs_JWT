'use strict';

// Importando el modelo Order Product
const {
    OrderProductSchema,
    ORDER_PRODUCT_TABLE,
} = require('./../models/order-product.model');

module.exports = {
    async up(queryInterface) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        // Creando tabla, indicamos el nombre de la tabla y el esquema
        await queryInterface.createTable(ORDER_PRODUCT_TABLE, OrderProductSchema);
    },

    async down(queryInterface) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        // Eliminando tabla
        await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
    },
};