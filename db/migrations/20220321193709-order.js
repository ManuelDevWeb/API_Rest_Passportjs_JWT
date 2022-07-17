'use strict';

const { DataTypes, Sequelize } = require('sequelize');
const { CUSTOMER_TABLE } = require('./../models/customer.model');
// Importando el modelo Order
const { ORDER_TABLE } = require('./../models/order.model');

module.exports = {
  async up(queryInterface) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // Creando tabla, indicamos el nombre de la tabla y el esquema
    await queryInterface.createTable(ORDER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        // Nombre con el que se guardara el atributo en la BD (_) por buenas prácticas
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      },
      // Atributo para relacionar con la tabla customers
      customerId: {
        // Nombre con el que se guardara el atributo en la BD (_) por buenas prácticas
        field: 'customer_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        // Indicamos la tabla a la que va relacionada
        references: {
          model: CUSTOMER_TABLE,
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
    await queryInterface.dropTable(ORDER_TABLE);
  },
};
