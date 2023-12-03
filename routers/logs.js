const express = require("express");
const LogController = require("../controllers/logs");
const logController = new LogController();
const router = express.Router();

router.put("/", logController.putLog);
router.post("/search", logController.getLogs);

module.exports = router;
