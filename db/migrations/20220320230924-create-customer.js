'use strict';

const { DataTypes, Sequelize } = require('sequelize');
// Importando el modelo CUSTOMER
const { CUSTOMER_TABLE } = require('./../models/customer.model');
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
        await queryInterface.createTable(CUSTOMER_TABLE, {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            lastName: {
                allowNull: false,
                type: DataTypes.STRING,
                // Nombre con el que se guardara el atributo en la BD (_) por buenas prácticas
                field: 'last_name',
            },
            phone: {
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
            // Atriburo para relacionar con la tabla users
            userId: {
                // Nombre con el que se guardara el atributo en la BD (_) por buenas prácticas
                field: 'user_id',
                allowNull: false,
                type: DataTypes.INTEGER,
                // Indicamos la tabla a la que va relacionada
                references: {
                    model: USER_TABLE,
                    // Foreign Key
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
        });
    },

    async down(queryInterface) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        // Eliminando tabla
        await queryInterface.dropTable(CUSTOMER_TABLE);
    },
};