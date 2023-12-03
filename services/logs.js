const DatabaseContext = require("../models");

class LogsService {
  constructor(db) {
    this.db = db || DatabaseContext;
  }

  putLog = async (payload) => {
    try {
      if (!payload || !payload.length) {
        return;
      }
      const createdRows = await this.db.Logs.bulkCreate(payload);
      return createdRows;
    } catch (err) {
      throw new Error("Error in putLog", err);
    }
  };
}

module.exports = LogsService;
