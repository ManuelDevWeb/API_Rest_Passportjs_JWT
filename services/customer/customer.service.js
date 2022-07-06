// Importando boom (Manejo de error con status code)
const boom = require('@hapi/boom');
// Importando bcrypt (Encriptacion de password)
const bcrypt = require('bcrypt');

// Importando sequelize para conectarnos a la base de datos mediante ORM (En models guarda los modelos)
const { models } = require('../../libs/sequelize');

// Clase Servicio Customer
class CustomerService {
  constructor() {}

  // Crear cliente
  async create(data) {
    // Hasheando password
    const hashPassword = await bcrypt.hash(data.user.password, 10);

    // Tomamos una copia de todo el objeto y cambiamos la password por la hasheada
    const newUser = {
      ...data,
      user: {
        ...data.user,
        password: hashPassword,
      },
    };

    // Creando cliente con las funcionalidades que nos brinda el ORM Sequelize
    const newCustomer = await models.Customer.create(newUser, {
      // Incluimos las asociaciones definidas en la clase Customer del modelo
      // Permitiendo crear un usuario en la tabla User enviando la info desde el endpoint de Customer
      include: ['user'],
    });

    delete newCustomer.dataValues.user.dataValues.password;

    return newCustomer;
  }

  // Buscar clientes
  async find() {
    // Buscando todos los datos del modelo Customer
    const respuesta = await models.Customer.findAll({
      // Incluimos las asociaciones definidas en la clase Customer del modelo
      include: ['user'],
    });
    return respuesta;
  }

  // Buscar un cliente
  async findOne(id) {
    // Buscando cliente por id con las funcionalidades que nos brinda el ORM Sequelize
    const customer = await models.Customer.findByPk(id);

    // Validando que el cliente exista
    if (!customer) {
      throw boom.notFound('Customer not found');
    }
  }

  // Actualizar cliente
  async update(id, changes) {
    // Buscando cliente por id con las funcionalidades que nos brinda el ORM Sequelize
    const customer = await this.findOne(id);
    // const customer = await models.Customer.findByPk(id);
    // Actualizando los datos del cliente
    const response = await customer.update(changes);

    return response;
  }

  // Eliminar cliente
  async delete(id) {
    // Buscando cliente por id con las funcionalidades que nos brinda el ORM Sequelize
    const customer = await this.findOne(id);
    // const customer = await models.Customer.findByPk(id);
    // Eliminando el cliente
    const response = await customer.destroy();

    return response;
  }
}

// Exportamos módulo
module.exports = CustomerService;
