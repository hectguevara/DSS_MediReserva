const { Pool } = require('pg');
const dbConfig = require('../config/db.config');

// Se crea la conexión a la base de datos
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '',
    database: 'MediReserva',
    port: 5432,
});

pool.connect()
  .then(() => {
    console.log('Conectado a PostgreSQL');
  })
  .catch((err) => {
    console.error('Error al conectar a PostgreSQL', err);
  });

module.exports = pool;