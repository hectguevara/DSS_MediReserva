require('dotenv').config();

let dbConfig;

if (process.env.NODE_ENV == 'production'){
    dbConfig = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
    };
} else {
    dbConfig = {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'MediReserva',
        port: process.env.DB_PORT || 5432
    };
}

module.exports = dbConfig;