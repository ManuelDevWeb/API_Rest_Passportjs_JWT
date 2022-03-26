// Importando Sequelize y elementos necesarios
const { Model, DataTypes, Sequelize } = require('sequelize');

// Importando nombre de la tabla (Entidad) Users
const { USER_TABLE } = require('./user.model');

// Definimos nombre de la tablaa (Entidad)
const CUSTOMER_TABLE = 'customers';

// Definimos el esquema de la entidad
const CustomerSchema = {
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
        unique: true,
        // Indicamos la tabla a la que va relacionada
        references: {
            model: USER_TABLE,
            // Foreign Key
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
};

// Definimos una clase para nuestra entidad
class Customer extends Model {
    // Método static es un método que pertenece a la clase y no al objeto

    // Función para realizar las relaciones
    static associate(models) {
        // Relacion uno a uno (Customer ----- User) Foreign Key se define en la tabla Customer
        Customer.belongsTo(models.User, { as: 'user' });
        // Relación uno a muchos (Customer ----> Order) Foreign Key se define en la tabla Order
        Customer.hasMany(models.Order, {
            as: 'orders',
            // Foreign Key definido en Order
            foreignKey: 'customerId',
        });
    }

    // Función para realizar la configuración (Recibimos una conexión)
    static config(sequelize) {
        return {
            // Conexión que tendra
            sequelize,
            // Nombre de la tabla
            tableName: CUSTOMER_TABLE,
            // Nombre del modelo (Clase)
            modelName: 'Customer',
            timestamps: false,
        };
    }
}

// Exportamos módulos
module.exports = {
    CUSTOMER_TABLE,
    CustomerSchema,
    Customer,
};