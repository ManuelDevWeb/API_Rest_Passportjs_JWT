// Importando bcrypt (Encriptacion de password)
const bcrypt = require('bcrypt');

// Funcion para hashear la password
async function hashPassword() {
  const myPassword = 'asdmin 123 .202';

  const hash = await bcrypt.hash(myPassword, 10); //$2b$10$MZ6mWEz6uJ/YUrOsDrUrneOupTNyazC8XWHpow5jJvzWIdJMqLBSG

  console.log(hash);
}

hashPassword();
