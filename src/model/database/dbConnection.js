const { Pool } = require('pg');
const url = require('url');
const pgp = require('pg-promise')();

require('env2')('./config.env');

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable not set.');
}

const params = url.parse(process.env.DATABASE_URL);
const [username, password] = params.auth.split(':');
const connection = {
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  poolSize: process.env.DB_MAX_CONNECTIONS || 20,
  user: username,
  password,
  ssl: params.hostname !== 'localhost',
};
const db = pgp(connection);

module.exports = db;
