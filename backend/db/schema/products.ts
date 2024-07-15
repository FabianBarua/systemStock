import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import {productType} from './productTypes'
export const products = sqliteTable('products', {
  id: text('id', { length: 255 }).notNull().primaryKey(),
  name: text	('name', { length: 255 }).notNull(),
  buyPrice: integer('buyPrice').notNull(),
  sellPrice: integer('sellPrice').notNull(),
  quantity: integer('quantity').notNull(),
  productTypeId: integer('productTypeId').notNull().references(()=>productType.id),
});