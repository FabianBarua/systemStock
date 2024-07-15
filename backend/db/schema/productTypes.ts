import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const productType = sqliteTable('producttype', {
  id: integer('id').notNull().primaryKey(),
  name: text('name', { length: 255 }).notNull(),
});