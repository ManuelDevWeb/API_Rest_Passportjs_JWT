// Importando faker (Permite generar data fake)
const faker = require('faker');
// Importando boom (Manejo de errores con status code)
const boom = require('@hapi/boom');
// Importando operadores de sequelize
const { Op } = require('sequelize');

// Importando pool para conectarnos a la BD
// const pool = require('../../libs/postgres.pool');

// Importando sequelize para conectarnos a la base de datos mediante ORM (En models guarda los modelos)
const { models } = require('../../libs/sequelize');

// Clase Servicio Productos
class ProductService {
    constructor() {
        this.products = [];
        // Cada que se cree una instancia del servicio se ejecuta la función
        this.generateWithFaker();
        // Pool de conexiones
        // this.pool = pool;
        // Escuchar si hay algún error
        // this.pool.on('Error', (err) => console.log(err));
    }

    // Generando productos con faker
    generateWithFaker() {
        const limit = 10;
        // Recorremos el array para agregar tantos productos queramos con faker
        for (let i = 0; i < limit; i++) {
            this.products.push({
                // Generando datos con fake
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                price: parseInt(faker.commerce.price(), 10),
                image: faker.image.imageUrl(),
                isBlock: faker.datatype.boolean(),
            });
        }
    }

    // Crear Producto
    async create(data) {
        // Creando producto con las funcionalidades que nos brinda el ORM Sequelize
        const newProduct = await models.Product.create(data);
        return newProduct;
    }

    // Buscar Productos
    async find(limit = 5, offset = 0, price, price_min, price_max) {
        const options = {
            // Incluimos las asociaciones definidas en la clase Product del modelo
            include: ['category'],
            limit,
            offset,
            // Condición para filtrar los productos
            where: {},
        };

        // Validando que los parámetros no estén vacíos y asignando el valor
        if (limit && offset) {
            // Cantidad de productos a mostrar
            options.limit = parseInt(limit);
            // Posición en la cual iniciara
            options.offset = parseInt(offset);
        }

        // Validando que el parámetro price no esté vacío y asignando el valor
        if (price) {
            // Indicamos el atributo (price) para hacer la búsqueda, donde el precio sea igual al valor enviado por query
            //options.where.price = price;
        }

        // Validando que el parámetro price_min y price_max no estén vacíos y asignando el valor
        if (price_min && price_max) {
            // Indicamos los atributos (price_min y price_max) para hacer la búsqueda donde el precio sea encuentre en el rango de valores enviados por query
            options.where.price = {
                [Op.gte]: price_min, // >=
                [Op.lte]: price_max, // <=
                // Otra opción
                // [Op.between]: [price_min, price_max],
            };
        }

        // Buscar producto con las funcionalidades que nos brinda el ORM Sequelize
        const products = await models.Product.findAll(options);
        return products;
    }

    // Buscar un producto
    async findOne(id) {
        // const name = this.getTotal();
        const product = this.products.find((product) => product.id === id);

        if (!product) {
            throw boom.notFound('Product not found');
        }

        if (product.isBlock) {
            throw boom.conflict('Product is blocked');
        }

        return product;
    }

    // Actualizar Producto
    async update(id, changes) {
        // Obtenemos el indice del producto
        const index = this.products.findIndex((product) => product.id === id);

        if (index === -1) {
            // Generando error amigable con boom
            throw boom.notFound('Product not found');
        }

        const product = this.products[index];
        this.products[index] = {
            ...product,
            ...changes,
        };

        return this.products[index];
    }

    // Eliminar Producto
    async delete(id) {
        // Obtenemos el indice del producto
        const index = this.products.findIndex((product) => product.id === id);

        if (index === -1) {
            // Generando error amigable con boom
            throw boom.notFound('Product not found');
        }

        // Eliminando 1 producto a partir del indice encontrado
        this.products.splice(index, 1);

        return { id };
    }
}

// Exportamos módulo
module.exports = ProductService;
