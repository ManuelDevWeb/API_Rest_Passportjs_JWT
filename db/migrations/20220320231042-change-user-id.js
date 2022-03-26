'use strict';

const { DataTypes } = require('sequelize');

// Importando el modelo CUSTOMER
const { CUSTOMER_TABLE } = require('./../models/customer.model');

module.exports = {
    async up(queryInterface) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        // Modificando columna, indicamos el nombre de la tabla, el nombre de la columna y la modificación
        await queryInterface.changeColumn(CUSTOMER_TABLE, 'user_id', {
            field: 'user_id',
            allowNull: false,
            type: DataTypes.INTEGER,
            unique: true,
        });
    },

    async down(queryInterface) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    },
};