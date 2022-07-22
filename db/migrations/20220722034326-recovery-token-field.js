'use strict';

// Importando el modelo USER
const { USER_TABLE } = require('./../models/user.model');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Agregando columna (Recibe nombre de la tabla, columna y estructura)
    await queryInterface.addColumn(USER_TABLE, 'recovery_token', {
      field: 'recovery_token',
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    });
  },

  async down(queryInterface) {
    // Eliminando columna (Recibe nombre de la tabla y columna)
    await queryInterface.removeColumn(USER_TABLE, 'recovery_token');
  },
};
