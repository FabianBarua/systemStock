// import { drizzle } from "drizzle-orm/mysql2";
// import mysql from "mysql2/promise";

// const connection =  mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "root",
//   database: "systemfb",
// });

// export const db = drizzle(connection);

import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import * as dotenv from 'dotenv'

dotenv.config()

const turso = createClient({
  url: process.env.DB_URL || '',
  authToken: process.env.DB_TOKEN || ''
})

export const db = drizzle(turso)