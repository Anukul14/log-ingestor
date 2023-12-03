const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const registerRoutes = require("./routers");

const app = express();

app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
registerRoutes(app);
module.exports = app;
