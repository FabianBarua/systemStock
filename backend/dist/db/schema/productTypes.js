"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productType = void 0;
const sqlite_core_1 = require("drizzle-orm/sqlite-core");
exports.productType = (0, sqlite_core_1.sqliteTable)('producttype', {
    id: (0, sqlite_core_1.integer)('id').notNull().primaryKey(),
    name: (0, sqlite_core_1.text)('name', { length: 255 }).notNull(),
});
