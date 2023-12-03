const LogsService = require("../services/logs");
const FullTextLogsService = require("../services/fullTextLogs");
class LogController {
  constructor() {
    this.logsService = new LogsService();
    this.fullTextLogsService = new FullTextLogsService();
  }

  putLog = async (req, res, next) => {
    try {
      const {
        level,
        message,
        resourceId,
        timestamp,
        traceId,
        spanId,
        commit,
        metadata,
      } = req.body;
      const { parentResourceId } = metadata;
      const payload = {
        level,
        message,
        resourceId,
        timestamp,
        traceId,
        spanId,
        commit,
        parentResourceId,
      };
      const logsResponse = await this.logsService.putLog([payload]);
      if (logsResponse && logsResponse.length) {
        const logId = logsResponse[0].id;
        const fullTextPayload = { logId, fullText: JSON.stringify(req.body) };
        const fullTextResponse = await this.fullTextLogsService.putFullTextLog([
          fullTextPayload,
        ]);
      }
      res.json({ status: 200, success: true });
    } catch (err) {
      next(err);
    }
  };

  getLogs = async (req, res, next) => {
    try {
      const {
        searchParam,
        level,
        resourceId,
        timestamp,
        traceId,
        spanId,
        commit,
        parentResourceId,
        timeRangeStart,
        timeRangeEnd,
      } = req.body;
      const payload = {
        searchParam,
        level,
        resourceId,
        timestamp,
        traceId,
        spanId,
        commit,
        parentResourceId,
        timeRangeStart,
        timeRangeEnd,
      };
      const response = await this.fullTextLogsService.findLog(payload);
      res.json({ status: "OK", logs: response });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = LogController;
