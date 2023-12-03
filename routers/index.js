const logsRouter= require("./logs");
const registerRoutes = (app) => {
  app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK" });
  });

  app.use("/log",logsRouter);
};


module.exports = registerRoutes;
