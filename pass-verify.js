// Importando bcrypt (Encriptacion de password)
const bcrypt = require('bcrypt');

// Funcion para hashear la password
async function verifyPassword() {
  const myPassword = 'asdmin 123 .202';
  const passwordHash =
    '$2b$10$MZ6mWEz6uJ/YUrOsDrUrneOupTNyazC8XWHpow5jJvzWIdJMqLBSG';

  const isMatch = await bcrypt.compare(myPassword, passwordHash); //$2b$10$MZ6mWEz6uJ/YUrOsDrUrneOupTNyazC8XWHpow5jJvzWIdJMqLBSG

  console.log(isMatch);
}

verifyPassword();
