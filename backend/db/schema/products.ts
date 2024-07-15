import { mysqlTable, int, varchar } from 'drizzle-orm/mysql-core';

export const products = mysqlTable('products', {
  id: varchar('id', { length: 255 }).notNull().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  buyPrice: int('buyPrice').notNull(),
  sellPrice: int('sellPrice').notNull(),
  quantity: int('quantity').notNull(),
});