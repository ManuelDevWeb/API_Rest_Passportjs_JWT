const { Client } = require('pg');

// Función para hacer la conexión con la BD
async function getConnection() {
    const client = new Client({
        // Tener en cuenta que estamos usando docker
        host: 'localhost',
        port: 5432,
        user: 'admin',
        password: 'admin123',
        database: 'my_store',
    });

    await client.connect();

    return client;
}

// Exportamos módulo
module.exports = getConnection;