// Importando express
const express = require('express');
// Importanco cosrs
const cors = require('cors');
// Importando modulo de rutas
const routes = require('./routes/index.js');
// Importando middleware de errores
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require('./middlewares/error.handler.js');
// Importando middleware de autenticacion
const { checkApiKey } = require('./middlewares/auth.handler');

// Creando una instancia de express
const app = express();

// Puerto
const port = process.env.PORT || 3000;

// IP local, para probar en dispositivos de tu misma red
const IP = '192.168.1.93';

// Permite recibir información en formato json
app.use(express.json());

// Permite conexiones desde diferentes origines (definidos en el array) con cors
const whiteList = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    // !origin para que igual permita conexiones desde diferentes origenes
    if (whiteList.includes(origin) || !origin) {
      // No hay error, acceso permitido
      callback(null, true);
    } else {
      // Error, acceso denegado
      callback(new Error('No permitido'));
    }
  },
};
app.use(cors(options));
// Permite conexiones desde todos los origenes
// app.use(cors());

// Importando estrategias de autenticacion (PRUEBA)
require('./utils/auth');

app.get('/nueva-ruta', checkApiKey, (req, res) => {
  res.send('Hola soy nueva ruta');
});

// Rutas
routes(app);

// Los middlewares de tipo errores se deben hacer despues de definir el routing
// Si alguno de estos middlewares no tiene next, no se ejecuta el siguiente
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

// Puerto en el que se va a escuchar el servidor
app.listen(port, () => {
  // console.log(`Server running on port: ${port}`);
  console.log(`http://${IP}:${port}/`);
});
