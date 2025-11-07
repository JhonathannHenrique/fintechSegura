require('dotenv').config();
const mysql = require('mysql2/promise');

const requiredEnvVars = ['DB_HOST', 'DB_USER', 'DB_NAME', 'DB_PASSWORD'];

for (const varName of requiredEnvVars) {
  if (process.env[varName] === undefined) {
    throw new Error(`Erro Crítico: A variável de ambiente "${varName}" não está definida.`);
  }
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;