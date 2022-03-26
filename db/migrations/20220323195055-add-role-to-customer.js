'use strict';

const { DataTypes } = require('sequelize');
// Importando el modelo USER
const { USER_TABLE } = require('./../models/user.model');

module.exports = {
    async up(queryInterface) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        // Agregar una columna a la tabla, indicamos el nombre de la tabla,el nombre de la columna y el esquema
        await queryInterface.addColumn(USER_TABLE, 'role', {
            allowNull: false,
            type: DataTypes.STRING,
            defaultValue: 'customer',
        });
    },

    async down(queryInterface) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        // Eliminar una columna de la tabla, indicamos el nombre de la tabla y el nombre de la columna
        await queryInterface.removeColumn(USER_TABLE, 'role');
    },
};