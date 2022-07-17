// Importando boom (Manejo de errores con status code)
const boom = require('@hapi/boom');
// Importando bcrypt (Encriptacion de password)
const bcrypt = require('bcrypt');
// Importando JWT
const jwt = require('jsonwebtoken');
// Importando Nodemailer
const nodemailer = require('nodemailer');

const { config } = require('../../config/config');

// Importando servicio de usuarios
const UserService = require('../../services/user/user.service');

// Instanciando el servicio de usuarios
const service = new UserService();

// Clase Servicio Auth
class AuthService {
  // Obtener usuario
  async getUser(email, password) {
    // Intentamos buscar el usuario por email
    const user = await service.findByEmail(email);

    // Validamos que exista el usuario
    if (!user) {
      throw boom.unauthorized();
    }

    // Comparamos la password ingresada con la haseada en la DB
    const isCorrect = await bcrypt.compare(password, user.password);

    if (!isCorrect) {
      throw boom.unauthorized();
    }

    delete user.dataValues.password;

    return user;
  }

  // Firmar token
  async signToken(user) {
    // Informacion a encriptar dentro del token
    const payload = {
      // Identificar del token
      sub: user.id,
      // Informacion que queramos
      role: user.role,
    };

    // Firmando token
    const token = jwt.sign(payload, config.jwtSecret);

    return { user, token };
  }

  // Enviar Email
  async sendMail(email) {
    // Intentamos buscar el usuario por email
    const user = await service.findByEmail(email);

    // Validamos que exista el usuario
    if (!user) {
      throw boom.unauthorized();
    }

    // Configuramos correctamente para gmail
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true, // True for 465
      port: 465,
      auth: {
        user: 'manueldeveloper17@gmail.com',
        pass: 'njjftajeiueogtpb',
      },
    });

    await transporter.sendMail({
      from: 'manueldeveloper17@gmail.com', // sender address
      to: `${user.email}`, // list of receivers
      subject: 'Nuevo Correo', // Subject line
      text: 'Hola Manuel, correo de prueba.', // plain text body
      // Cuerpo del email, etiquetas y estilos.(En enlace apunta a la ruta para confirmar usuario)
      html: '<b>Hola Manuel, correo de prueba.</b>', // html body
    });

    return {
      message: 'Mail sent',
    };
  }
}

// Exportamos módulo
module.exports = AuthService;
