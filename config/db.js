import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

const env = dotenv.config().parsed;

const db = new Sequelize(
  env.DB_NAME,
  env.DB_USER,
  env.DB_PASS,
  {
    host: env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

export default db;