"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.products = void 0;
const sqlite_core_1 = require("drizzle-orm/sqlite-core");
const productTypes_1 = require("./productTypes");
exports.products = (0, sqlite_core_1.sqliteTable)('products', {
    id: (0, sqlite_core_1.text)('id', { length: 255 }).notNull().primaryKey(),
    name: (0, sqlite_core_1.text)('name', { length: 255 }).notNull(),
    buyPrice: (0, sqlite_core_1.integer)('buyPrice').notNull(),
    sellPrice: (0, sqlite_core_1.integer)('sellPrice').notNull(),
    quantity: (0, sqlite_core_1.integer)('quantity').notNull(),
    productTypeId: (0, sqlite_core_1.integer)('productTypeId').notNull().references(() => productTypes_1.productType.id),
});
