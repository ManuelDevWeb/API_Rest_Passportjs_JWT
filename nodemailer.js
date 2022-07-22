// Importando nodemailer (Envio de emails)
// const nodemailer = require('nodemailer');

// Enviar emails de pruebas a ethereal

// const sendMail = async () => {
//   Credenciales y configuracion nodemailer (La info la traemos de https://ethereal.email/)
//   let transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//       user: 'sigrid.friesen@ethereal.email',
//       pass: '53edNJJdkFJ393Mj46',
//     },
//   });

//   Informacion y template del email
//   let info = await transporter.sendMail({
//     from: 'sigrid.friesen@ethereal.email', // sender address
//     to: 'sigrid.friesen@ethereal.email', // list of receivers
//     subject: 'Hello ✔', // Subject line
//     text: 'Hello world?', // plain text body
//     Cuerpo del email, etiquetas y estilos.(En enlace apunta a la ruta para confirmar usuario)
//     html: '<b>Hello world?</b>', // html body
//   });

//   console.log('Message sent: %s', info.messageId);
//   Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   Preview only available when sending through an Ethereal account
//   console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//   Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// };

// Enviar emails con Gmail como SMTP
// const sendMail = async () => {
//   Credenciales y configuracion nodemailer (La info la traemos de https://ethereal.email/)
//   Configuramos correctamente para gmail
//   let transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     secure: true, // True for 465
//     port: 465,
//     auth: {
//       user: 'manueldeveloper17@gmail.com',
//       pass: 'njjftajeiueogtpb',
//     },
//   });

//   Informacion y template del email
//   let info = await transporter.sendMail({
//     from: 'manueldeveloper17@gmail.com', // sender address
//     to: 'manolocm07@gmail.com', // list of receivers
//     subject: 'Nuevo Correo', // Subject line
//     text: 'Hola Manuel, correo de prueba.', // plain text body
//     Cuerpo del email, etiquetas y estilos.(En enlace apunta a la ruta para confirmar usuario)
//     html: '<b>Hola Manuel, correo de prueba.</b>', // html body
//   });

//   console.log('Message sent: %s', info.messageId);
//   Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   Preview only available when sending through an Ethereal account
//   console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//   Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// };

// module.exports;
