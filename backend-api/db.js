import pg from 'pg';
import 'dotenv/config';
const { Pool } = pg;

export default {
  query: (text, params) => pool.query(text, params),
  getClient: () => pool.connect(),
};

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
