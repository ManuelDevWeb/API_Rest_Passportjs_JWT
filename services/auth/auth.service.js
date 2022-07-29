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
  // Obtener usuario y validamos password
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

  // Reset password
  async sendRecoveryPassword(email) {
    // Intentamos buscar el usuario por email
    const user = await service.findByEmail(email);

    // Validamos que exista el usuario
    if (!user) {
      throw boom.unauthorized();
    }

    // Informacion a encriptar dentro del token
    const payload = {
      // Identificar del token
      sub: user.id,
    };
    // Firmando token
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15min' });

    const link = `http://localhost:3000/api/v1/recovery?token=${token}`;

    // Actualizando datos del usuario en la db con el token enviado
    await service.update(user.id, { recoveryToken: token });

    const mail = {
      from: config.smtpEmail, // sender address
      to: `${user.email}`, // list of receivers
      subject: 'Email para recuperar password', // Subject line
      // Cuerpo del email, etiquetas y estilos
      html: `<b>Ingresa a este link para recuperar password => ${link}</b>`, // html body
    };

    const rta = await this.sendMail(mail);

    return rta;
  }

  // Cambias password
  async changePassword(token, newPassword) {
    try {
      // Verificamos el token
      const payload = jwt.verify(token, config.jwtSecret);

      // Intentamos buscar el usuario por id en la db
      const user = await service.findOne(payload.sub);

      // Validamos si el recovery token del usuario coincide con el token enviado
      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }

      // Hasheamos password
      const hashPassword = await bcrypt.hash(newPassword, 10);

      // Actualizamos la informacion del usuario en la db
      await service.update(user.id, {
        recoveryToken: null,
        password: hashPassword,
      });

      return {
        message: 'Password modified',
      };
    } catch (error) {
      throw boom.unauthorized();
    }
  }

  // Enviar Email
  async sendMail(infoEmail) {
    // Configuramos correctamente para gmail
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true, // True for 465
      port: 465,
      auth: {
        user: config.smtpEmail,
        pass: config.smtpPassword,
      },
    });

    await transporter.sendMail(infoEmail);

    return {
      message: 'Mail sent',
    };
  }
}

// Exportamos módulo
module.exports = AuthService;
