import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

const connectionUri = process.env.DATABASE_URL || "mysql://root:@localhost:3306/fidel";

// Declare global variable for connection pool to prevent multiple pools in development
declare global {
  // eslint-disable-next-line no-var
  var _pool: mysql.Pool | undefined;
}

let pool: mysql.Pool;

if (process.env.NODE_ENV === "production") {
  pool = mysql.createPool(connectionUri);
} else {
  if (!globalThis._pool) {
    globalThis._pool = mysql.createPool(connectionUri);
  }
  pool = globalThis._pool;
}

export const db = drizzle(pool, { schema, mode: "default" });
