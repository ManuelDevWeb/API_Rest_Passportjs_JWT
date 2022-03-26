// Importando Sequelize y elementos necesarios
const { Model, DataTypes, Sequelize } = require('sequelize');

// Importando nombre de la tabla (Entidad) Customers
const { CUSTOMER_TABLE } = require('./customer.model');

// Definimos nombre de la tabla (Entidad)
const ORDER_TABLE = 'orders';

// Definimos el esquema de la entidad
const OrderSchema = {
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
        unique: true,
        // Indicamos la tabla a la que va relacionada
        references: {
            model: CUSTOMER_TABLE,
            // Foreign Key
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    // Calcular el total
    total: {
        // Campo virtual, que no estará en la BD
        type: DataTypes.VIRTUAL,
        get() {
            // Validando si hay elementos (items, es la manera en la que llamamos la asociación VER LINEA 64)
            if (this.items.length > 0) {
                return this.items.reduce((total, item) => {
                    return total + item.price * item.OrderProduct.amount;
                }, 0);
            }
            return 0;
        },
    },
};

// Definimos una clase para nuestra entidad
class Order extends Model {
    // Método static es un método que pertenece a la clase y no al objeto

    // Función para realizar las relaciones
    static associate(models) {
        // Relación uno a uno (Order ----- Customer) Foreign Key se define en la tabla Order
        Order.belongsTo(models.Customer, { as: 'customer' });
        // Relación muchos a muchos (Order <----> Product) Foreign Key se define en la tabla OrderProduct, debemos enviar tabla intermedia
        Order.belongsToMany(models.Product, {
            as: 'items',
            // Nombre de la tabla intermedia que resolvera la relación
            through: models.OrderProduct,
            // Foreign Key definida en OrderProduct
            foreignKey: 'orderId',
            // Indicamos la otra Key definida en OrderProduct
            otherKey: 'productId',
        });
    }

    // Función para realizar la configuración (Recibimos una conexión)
    static config(sequelize) {
        return {
            // Conexión que tendra
            sequelize,
            // Nombre de la tabla
            tableName: ORDER_TABLE,
            // Nombre del modelo (Clase)
            modelName: 'Order',
            timestamps: false,
        };
    }
}

// Exportamos módulos
module.exports = {
    ORDER_TABLE,
    OrderSchema,
    Order,
};