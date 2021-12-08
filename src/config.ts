export const config = {
  spotify: {
    client_id: "client_id",
    client_secret: "client_secret",
  },
  app: {
    port: 3011,
    name: "api-spotify",
  },
  mysql: {
    host: "localhost",
    port: 3306,
    user: "admin",
    password: "admin",
    database: "spotify",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};
