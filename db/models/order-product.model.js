// Importando Sequelize y elementos necesarios
const { Model, DataTypes, Sequelize } = require('sequelize');

// Importando nombre de la tabla (Entidad) Users
const { ORDER_TABLE } = require('./order.model');
// Importando nombre de la tabla (Entidad) Products
const { PRODUCT_TABLE } = require('./product.model');

// Definimos nombre de la tablaa (Entidad)
const ORDER_PRODUCT_TABLE = 'orders_products';

// Definimos el esquema de la entidad
const OrderProductSchema = {
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
    amount: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    // Atriburo para relacionar con la tabla order
    orderId: {
        // Nombre con el que se guardara el atributo en la BD (_) por buenas prácticas
        field: 'order_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        // Indicamos la tabla a la que va relacionada
        references: {
            model: ORDER_TABLE,
            // Foreign Key
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    // Atriburo para relacionar con la tabla product
    productId: {
        // Nombre con el que se guardara el atributo en la BD (_) por buenas prácticas
        field: 'product_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        // Indicamos la tabla a la que va relacionada
        references: {
            model: PRODUCT_TABLE,
            // Foreign Key
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
};

// Definimos una clase para nuestra entidad
class OrderProduct extends Model {
    // Método static es un método que pertenece a la clase y no al objeto

    // Función para realizar las relaciones
    static associate() {}

    // Función para realizar la configuración (Recibimos una conexión)
    static config(sequelize) {
        return {
            // Conexión que tendra
            sequelize,
            // Nombre de la tabla
            tableName: ORDER_PRODUCT_TABLE,
            // Nombre del modelo (Clase)
            modelName: 'OrderProduct',
            timestamps: false,
        };
    }
}

// Exportamos módulos
module.exports = {
    ORDER_PRODUCT_TABLE,
    OrderProductSchema,
    OrderProduct,
};