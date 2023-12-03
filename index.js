require("dotenv").config();

const connectDB = async (db) => {
  try {
    await db.sequelize.authenticate();
    console.log("Connected to DB.");
  } catch (error) {
    console.error("Unable to connect to database: ", error);
    throw error;
  }
};

async function main() {
  const db = require("./models");
  await connectDB(db);
  const app = require("./server");
  return app;
}

main().then((app) => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
