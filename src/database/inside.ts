import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const insideDatabase = new Sequelize(process.env.DB_NAME ?? "", process.env.DB_USER ?? "", process.env.DB_PASS ?? "", {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  dialectOptions: {
    family: 4,
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  dialect: "postgres",
  logging: false,
});
