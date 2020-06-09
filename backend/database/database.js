/* eslint-disable no-console */
const { Pool } = require('pg');
//const PgStore = require('express-brute-pg');
const Config = require('../config');

// Test connection status.
const pool = new Pool({
  connectionString: process.env.DATABASE_URI || Config.postgresConnectionString,
  query_timeout: 200,
  statement_timeout: 200,
});
/*
const store = new PgStore({
  connectionString: process.env.PGSTORE_URI || Config.postgresPgStoreConnectionString,
  query_timeout: 200,
  statement_timeout: 200,
});
*/
async function connectionTest() {
  try {
    const res = await pool.query('SELECT NOW ()');
    console.log(`${'Database connected: '}\n${JSON.stringify(res.rows[0])}`);
  } catch (err) {
    console.log(`${'Database connection error: '}\n${err.stack}`);
  }
}

connectionTest();
module.exports = { pool };
