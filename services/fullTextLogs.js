const { Op } = require("sequelize");
const DatabaseContext = require("../models");
const moment = require("moment");

class FullTextLogsService {
  constructor(db) {
    this.db = db || DatabaseContext;
  }

  putFullTextLog = async (payload) => {
    try {
      if (!payload || !payload.length) {
        return;
      }
      await this.db.FullTextLogs.bulkCreate(payload);
    } catch (err) {
      throw new Error("Error in putFullTextLog", err);
    }
  };

  findLog = async ({
    searchParam,
    level,
    resourceId,
    traceId,
    spanId,
    commit,
    parentResourceId,
    timeRangeStart,
    timeRangeEnd,
  }) => {
    try {
      let logFilter = {},
        fullTextFilter = {};
      if (searchParam)
        fullTextFilter = this.db.sequelize.literal(
          `MATCH(full_text) AGAINST ('+${searchParam}' IN BOOLEAN MODE)`
        );
      if (level) logFilter.level = level;
      if (resourceId) logFilter.resourceId = resourceId;
      if (traceId) logFilter.traceId = traceId;
      if (spanId) logFilter.spanId = spanId;
      if (commit) logFilter.commit = commit;
      if (parentResourceId) logFilter.parentResourceId = parentResourceId;
      if (timeRangeEnd) {
        logFilter.timestamp = {};
        logFilter.timestamp[Op.lte] = moment(timeRangeEnd);
      }
      if (timeRangeStart) {
        if (!logFilter.timestamp) {
          logFilter.timestamp = {};
        }
        logFilter.timestamp[Op.gte] = moment(timeRangeStart);
      }
      return await this.db.FullTextLogs.findAll({
        where: fullTextFilter,
        include: [
          {
            model: this.db.Logs,
            where: logFilter,
            required: true,
            attributes: [],
          },
        ],
      });
    } catch (err) {
      throw new Error("Error in findLog", err);
    }
  };
}

module.exports = FullTextLogsService;
