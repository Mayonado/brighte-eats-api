import { Pool, PoolClient } from "pg";
import logger from "./logger";

export const dbPool: Pool = new Pool({
  host: process.env.DB_HOSTNAME,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

dbPool.on("remove", (_client: PoolClient) => {
  logger.info("Database connection has been removed!");
});

dbPool.on("release", (_err: Error, _client: PoolClient) => {
  logger.info("Database connection released!");
});

dbPool.on("connect", (_client: PoolClient) => {
  logger.info("Successfully connection to postgresql!");
});

dbPool.on("error", (err: Error, _client: PoolClient) => {
  logger.info("Error connecting to postgresql", err);
});

export const query = async <T>(
  queryString: string,
  parameters: string[] = []
): Promise<T> => {
  const result = await dbPool.query(queryString, parameters);

  return result.rows as T;
};
