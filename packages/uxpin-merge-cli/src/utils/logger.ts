import * as winston from 'winston';

export const logger:winston.Logger = winston.createLogger({
  level: process.env.UXPIN_CLI_LOG_LEVEL || 'error',
  transports: [
    new winston.transports.Console(),
  ],
});
