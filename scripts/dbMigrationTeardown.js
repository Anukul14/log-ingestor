require("dotenv").config();
const fs = require("fs");

async function teardownDBMigrateSetup() {
  const config = {};
  fs.writeFileSync(
    __dirname + "/.././sequelize-config.json",
    JSON.stringify(config),
    {
      flag: "w",
    }
  );
}
teardownDBMigrateSetup().then(() => {
  process.exit();
});
