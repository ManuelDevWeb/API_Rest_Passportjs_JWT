// Importando boom (Manejo de errores con status code)
const boom = require('@hapi/boom');

// Importando sequelize para conectarnos a la base de datos mediante ORM (En models guarda los modelos)
const { models } = require('../../libs/sequelize');

// Clase Servicio Order
class OrderService {
    constructor() {}

    // Crear Orden
    async create(data) {
        // Creando orden con las funcionalidades que nos brinda el ORM Sequelize
        const newOrder = await models.Order.create(data);
        return newOrder;
    }

    // Crear item
    async addItem(data) {
        // Creando item con las funcionalidades que nos brinda el ORM Sequelize
        const newItem = await models.OrderProduct.create(data);
        return newItem;
    }

    // Buscar Ordenes
    async find() {
        return [];
    }

    // Buscar una orden
    async findOne(id) {
        // Buscando orden por id con las funcionalidades que nos brinda el ORM Sequelize
        const order = await models.Order.findByPk(id, {
            // Incluimos las asociaciones definidas en la clase Order del modelo
            // (En este caso la anidación va mas a profundiad, es decir, aparte de customer también nos traerá la info del user)
            include: [{
                    association: 'customer',
                    include: ['user'],
                },
                // Incluimos asosiación items
                'items',
            ],
        });

        // Validando que la orden exista
        if (!order) {
            throw boom.notFound('Order not found');
        }

        return order;
    }

    // Actualizar una orden
    async update(id, changes) {
        return {
            id,
            changes,
        };
    }

    // Eliminar una orden
    async delete(id) {
        return { id };
    }
}

// Exportamos módulo
module.exports = OrderService;