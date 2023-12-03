require("dotenv").config();
const fs = require("fs");

async function generateDBMigrateSetup() {
  const config = {
    production: {
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      dialect: process.env.DB_DIALECT,
      database: process.env.DATABASE,
      seederStorage: "sequelize",
    },
  };
  fs.writeFileSync(
    __dirname + "/.././sequelize-config.json",
    JSON.stringify(config),
    {
      flag: "w",
    }
  );
}
generateDBMigrateSetup().then(() => {
  process.exit();
});
