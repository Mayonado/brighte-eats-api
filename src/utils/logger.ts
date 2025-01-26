import { createLogger, format, transports } from "winston";

const { combine, timestamp } = format;

export const LOG_LEVEL = {
  ERROR: "error",
  INFO: "info",
  DEBUG: "debug",
  WARN: "warn",
};

const loggingOptions = {
  level: process.env.LOG_LEVEL ? process.env.LOG_LEVEL : LOG_LEVEL.INFO,
  format: combine(timestamp(), format.json()),
  transports: [new transports.Console()],
};

const logger = createLogger(loggingOptions);

export default logger;
