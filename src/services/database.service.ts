import { Dialect, Sequelize } from "sequelize";
import { config } from "../config";

const { database, user, password, host, port, dialect, pool } = config.mysql;

const dbDriver: Dialect = dialect as Dialect;

const sequelize = new Sequelize(database, user, password, {
  port: port,
  host: host,
  dialect: dbDriver,
  pool: pool,
});

sequelize.authenticate();

export { sequelize };
