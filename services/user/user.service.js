// Importando boom (Manejo de errores con status code)
const boom = require('@hapi/boom');

// Importando función para conectarnos a la base de datos
// const getConnection = require('../../libs/postgres');
// Importando sequelize para conectarnos a la base de datos mediante ORM (En models guarda los modelos)
const { models } = require('../../libs/sequelize');

// Clase Servicio User
class UserService {
    constructor() {}

    // Crear usuario
    async create(data) {
        // Creando usuario con las funcionalidades que nos brinda el ORM Sequelize
        const newUser = await models.User.create(data);
        return newUser;
        // return data;
    }

    // Buscar usuarios
    async find() {
        // Obteniendo el cliente de la conexión
        // const client = await getConnection();

        // Buscando todos los datos del modelo User
        const respuesta = await models.User.findAll({
            // Incluimos las asociaciones definidas en la clase User del modelo
            include: ['customer'],
        });

        // Una vez tenemos el cliente, podemos ejecutar querys
        // const respuesta = await client.query('SELECT * FROM tasks ORDER BY title');

        // return respuesta.rows;
        return respuesta;
    }

    // Buscar un usuario
    async findOne(id) {
        // Buscando usuario por id con las funcionalidades que nos brinda el ORM Sequelize
        const user = await models.User.findByPk(id);

        // Validando que el usuario exista
        if (!user) {
            throw boom.notFound('User not found');
        }

        return user;
    }

    // Actualizar usuario
    async update(id, changes) {
        // Buscando usuario por id con las funcionalidades que nos brinda el ORM Sequelize
        const user = await this.findOne(id);
        // const user = await models.User.findByPk(id);
        // Actualizando los datos del usuario
        const response = await user.update(changes);

        return response;
    }

    // Eliminar usuario
    async delete(id) {
        // Buscando usuario por id con las funcionalidades que nos brinda el ORM Sequelize
        const user = await this.findOne(id);
        //const user = await models.User.findByPk(id);

        // Eliminando usuario
        const response = await user.destroy();

        return response;
    }
}

// Exportamos módulo
module.exports = UserService;
