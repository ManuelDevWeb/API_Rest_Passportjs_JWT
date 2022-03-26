// Se encarga de enviar la conexión hacia los modelos

// Importando modelo user
const { User, UserSchema } = require('./user.model');
// Importando modelo customer
const { Customer, CustomerSchema } = require('./customer.model');
// Importando modelo category
const { Category, CategorySchema } = require('./category.model');
// Importando modelo product
const { Product, ProductSchema } = require('./product.model');
// Importando modelo order
const { Order, OrderSchema } = require('./order.model');
// Importando modelo order product
const { OrderProduct, OrderProductSchema } = require('./order-product.model');

// Configuración de los modelos
function setupModels(sequelize) {
    // Le indicamos al modelo user que debe seguir el esquema de UserSchema
    User.init(UserSchema, User.config(sequelize));
    // Le indicamos al modelo customer que debe seguir el esquema de CustomerSchema
    Customer.init(CustomerSchema, Customer.config(sequelize));
    // Le indicamos al modelo category que debe seguir el esquema de CategorySchema
    Category.init(CategorySchema, Category.config(sequelize));
    // Le indicamos al modelo product que debe seguir el esquema de ProductSchema
    Product.init(ProductSchema, Product.config(sequelize));
    // Le indicamos al modelo order que debe seguir el esquema de OrderSchema
    Order.init(OrderSchema, Order.config(sequelize));
    // Le indicamos al modelo order product que debe seguir el esquema de OrderProductSchema
    OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));

    // Ejecución del método associate (Enviamos los modelos)
    User.associate(sequelize.models);
    Customer.associate(sequelize.models);
    Category.associate(sequelize.models);
    Product.associate(sequelize.models);
    Order.associate(sequelize.models);
    OrderProduct.associate(sequelize.models);
}

// Exportamos módulo
module.exports = setupModels;