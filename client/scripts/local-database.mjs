import { fileURLToPath } from "node:url";
import { NetlifyDB, applyMigrations } from "@netlify/database-dev";
import pg from "pg";

const port = Number(process.env.LOCAL_DATABASE_PORT ?? 5433);
if (!Number.isInteger(port) || port < 1024 || port > 65535) {
  throw new Error("LOCAL_DATABASE_PORT must be an integer between 1024 and 65535.");
}

const directory = fileURLToPath(new URL("../../.netlify/local-database/", import.meta.url));
const command = process.argv[2];
const migrations = fileURLToPath(new URL("../../netlify/database/migrations/", import.meta.url));

if (command === "query" || command === "migrate") {
  const sql = process.argv[3];
  if (command === "query" && !sql) throw new Error('Supply SQL, for example: npm run db:query -- "SELECT version()"');
  const client = new pg.Client({
    host: "localhost",
    port,
    user: "postgres",
    database: "postgres",
    connectionTimeoutMillis: 5000,
    statement_timeout: 10000,
  });
  try {
    await client.connect();
    if (command === "migrate") {
      const executor = {
        exec: (statement) => client.query(statement),
        query: (statement, params) => client.query(statement, params),
        async transaction(callback) {
          await client.query("BEGIN");
          try {
            const result = await callback(executor);
            await client.query("COMMIT");
            return result;
          } catch (error) {
            await client.query("ROLLBACK");
            throw error;
          }
        },
      };
      console.log("Applied migrations:", await applyMigrations(executor, migrations));
    } else {
      const result = await client.query(sql);
      for (const item of Array.isArray(result) ? result : [result]) {
        console.table(item.rows);
      }
    }
  } catch (error) {
    console.error(`Local database query failed: ${error.message}. Start npm run db:dev first.`);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
} else if (command === undefined) {
  const database = new NetlifyDB({ directory, port });
  let stopping = false;
  async function stop() {
    if (stopping) return;
    stopping = true;
    await database.stop();
    console.log("Local database stopped.");
  }

  try {
    const connectionString = await database.start();
    await database.applyMigrations(migrations);
    console.log("Netlify local database is ready.");
    console.log(`Connection: ${connectionString}`);
    console.log(`Data directory: ${directory}`);
    console.log("Keep this terminal open. Press Ctrl+C to stop.");
    process.once("SIGINT", () => { void stop(); });
    process.once("SIGTERM", () => { void stop(); });
  } catch (error) {
    console.error(`Cannot start local database: ${error.message}`);
    await database.stop();
    process.exitCode = 1;
  }
} else {
  throw new Error(`Unknown database command: ${command}`);
}
