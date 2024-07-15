import { mysqlTable, int, varchar } from 'drizzle-orm/mysql-core';

const productType = mysqlTable('producttype', {
  id: int('id').notNull().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
});