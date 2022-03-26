// Importando express
const express = require('express');

// Importando router de productos
const productsRouter = require('./products/products.router');
// Importando router de usuarios
const usersRouter = require('./users/users.router');
// Importando router de categorias
const categoriesRouter = require('./categories/categories.router');
// Importando router de ordenes
const ordersRouter = require('./orders/orders.router');
// Importando router de clienntes
const customersRouter = require('./customers/customers.router');

function routerApi(app) {
    const router = express.Router();

    // Endpoint principal
    app.use('/api/v1', router);

    // Definimos endpoint para productos
    router.use('/products', productsRouter);
    // Definimos endpoint para usuarios
    router.use('/users', usersRouter);
    // Definimos endpoint para categorias
    router.use('/categories', categoriesRouter);
    // Definimos endpoint para ordenes
    router.use('/orders', ordersRouter);
    // Definimos endpoint para clientes
    router.use('/customers', customersRouter);
}

// Exportamos módulo
module.exports = routerApi;