"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_1 = require("../../../db/schema/products");
const index_1 = require("../../../db/index");
const drizzle_orm_1 = require("drizzle-orm");
const router = express_1.default.Router();
const productsPerPage = 10;
const getProducts = async ({ query, currentPage }) => {
    try {
        const searchByName = (0, drizzle_orm_1.like)(products_1.products.name, `%${query}%`);
        const whereOptions = searchByName;
        const querySearch = index_1.db
            .select()
            .from(products_1.products)
            .where(whereOptions)
            .limit(productsPerPage)
            .offset((currentPage - 1) * productsPerPage);
        const queryCount = index_1.db.select({ count: (0, drizzle_orm_1.count)() }).from(products_1.products).where(whereOptions);
        const [productsSelected, [{ count: totalQuery }]] = await Promise.all([querySearch, queryCount]);
        return { productsSelected, totalQuery };
    }
    catch (error) {
        throw new Error('Error al obtener los productos');
    }
};
const getPrevAndNextPage = (page, totalQuery) => {
    let prevPageNumber = null;
    let nextPageNumber = null;
    if (page > 1 && page <= Math.ceil(totalQuery / productsPerPage)) {
        prevPageNumber = page - 1;
    }
    if (page >= 1 && page < Math.ceil(totalQuery / productsPerPage)) {
        nextPageNumber = page + 1;
    }
    return {
        prevPageNumber,
        nextPageNumber
    };
};
router.get('/', async (req, res) => {
    var _a, _b, _c;
    try {
        const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
        const url = new URL(fullUrl);
        const paramsURL = url.searchParams;
        const query = paramsURL.get('query') || '';
        const currentPage = parseInt((_a = paramsURL.get('currentPage')) !== null && _a !== void 0 ? _a : '1');
        const { productsSelected, totalQuery } = await getProducts({ query, currentPage });
        const { prevPageNumber, nextPageNumber } = getPrevAndNextPage(currentPage, totalQuery);
        paramsURL.set('currentPage', (_b = prevPageNumber === null || prevPageNumber === void 0 ? void 0 : prevPageNumber.toString()) !== null && _b !== void 0 ? _b : '1');
        const prevUrl = prevPageNumber ? `${url.href}` : null;
        paramsURL.set('currentPage', (_c = nextPageNumber === null || nextPageNumber === void 0 ? void 0 : nextPageNumber.toString()) !== null && _c !== void 0 ? _c : '1');
        const nextUrl = nextPageNumber ? `${url.href}` : null;
        const info = {
            totalProducts: totalQuery || 0,
            nextUrl,
            prevUrl,
            currentPage: currentPage,
            totalPages: Math.ceil(totalQuery / productsPerPage),
            productsPerPage: productsPerPage,
            totalInPage: productsSelected.length
        };
        return res.status(200).send({
            info,
            products: productsSelected
        });
    }
    catch (error) {
        res.status(500).send({
            message: 'An error occurred while trying to fetch products',
            error: true,
            slack: error
        });
    }
});
exports.default = router;
