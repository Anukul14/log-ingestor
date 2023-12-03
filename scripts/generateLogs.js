function generateRandomErrorLog() {
  const levels = ["error", "warning", "info"];
  const messages = [
    "Failed to connect to DB",
    "Cannot find module",
    "Cannot read properties of undefined",
  ];
  const resources = ["server-1234", "server-5678", "server-9012"];
  const timestamps = [
    "2023-09-15T08:00:00Z",
    "2023-09-16T12:30:00Z",
    "2023-09-17T15:45:00Z",
  ];
  const traceIds = ["abc-xyz-123", "def-uvw-456", "ghi-rst-789"];
  const spanIds = ["span-456", "span-789", "span-012"];
  const commits = ["5e5342f", "a3b4c5d", "1f2e3d4"];
  const parentResourceIds = [
    "server-2987",
    "server-0988",
    "server-0947",
    "server-1987",
    "server-0987",
  ];

  const level = levels[Math.floor(Math.random() * levels.length)];
  const message = messages[Math.floor(Math.random() * messages.length)];
  const resourceId = resources[Math.floor(Math.random() * resources.length)];
  const timestamp = timestamps[Math.floor(Math.random() * timestamps.length)];
  const traceId = traceIds[Math.floor(Math.random() * traceIds.length)];
  const spanId = spanIds[Math.floor(Math.random() * spanIds.length)];
  const commit = commits[Math.floor(Math.random() * commits.length)];
  const parentResourceId =
    parentResourceIds[Math.floor(Math.random() * parentResourceIds.length)];

  const errorLog = {
    level: level,
    message: message,
    resourceId: resourceId,
    timestamp: timestamp,
    traceId: traceId,
    spanId: spanId,
    commit: commit,
    parentResourceId: parentResourceId,
  };

  const fullTextLog = {
    level: level,
    message: message,
    resourceId: resourceId,
    timestamp: timestamp,
    traceId: traceId,
    spanId: spanId,
    commit: commit,
    metadata: {
      parentResourceId: parentResourceId,
    },
  };

  return { errorLog, fullTextLog };
}

const main = async () => {
  // Generating and logging a random error log
  const LogsService = require("../services/logs");
  const FullTextLogsService = require("../services/fullTextLogs");

  const logsService = new LogsService();
  const fullTextLogsService = new FullTextLogsService();

  for (let i = 0; i < 100; i++) {
    const { errorLog, fullTextLog } = generateRandomErrorLog();
    const created = await logsService.putLog([errorLog]);
    await fullTextLogsService.putFullTextLog([
      {
        logId: created[0].id,
        fullText: JSON.stringify(fullTextLog),
      },
    ]);
    // break;
  }
  process.exit();
};
main();
