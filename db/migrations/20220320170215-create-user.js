'use strict';

const { DataTypes, Sequelize } = require('sequelize');
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
        // Creando tabla, indicamos el nombre de la tabla y el esquema
        await queryInterface.createTable(USER_TABLE, {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            email: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: true,
            },
            password: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
                // Nombre con el que se guardara el atributo en la BD (_) por buenas prácticas
                field: 'created_at',
                defaultValue: Sequelize.NOW,
            },
        });
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
        await queryInterface.dropTable(USER_TABLE);
    },
};