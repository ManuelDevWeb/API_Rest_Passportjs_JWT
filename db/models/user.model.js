// Importando Sequelize y elementos necesarios
const { Model, DataTypes, Sequelize } = require('sequelize');

// Definimos nombre de la tabla (Entidad)
const USER_TABLE = 'users';

// Definimos el esquema de la entidad
const UserSchema = {
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
  recoveryToken: {
    // Nombre con el que se guardara el atributo en la BD (_) por buenas prácticas
    field: 'recovery_token',
    allowNull: true,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    // Nombre con el que se guardara el atributo en la BD (_) por buenas prácticas
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
};

// Definimos una clase para nuestra entidad
class User extends Model {
  // Método static es un método que pertenece a la clase y no al objeto

  // Función para realizar las relaciones
  static associate(models) {
    // Relacion uno a uno (User ----- Customer) Foreign Key ya se definió en Customer
    User.hasOne(models.Customer, {
      as: 'customer',
      // Foreign Key definida en Customer
      foreignKey: 'userId',
    });
  }

  // Función para realizar la configuración (Recibimos una conexión)
  static config(sequelize) {
    return {
      // Conexión que tendra
      sequelize,
      // Nombre de la tabla
      tableName: USER_TABLE,
      // Nombre del modelo (Clase)
      modelName: 'User',
      timestamps: false,
    };
  }
}

// Exportamos módulos
module.exports = { USER_TABLE, UserSchema, User };
