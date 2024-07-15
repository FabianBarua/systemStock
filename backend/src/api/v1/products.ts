import express from 'express'
import { products } from '@db/schema/products'
import { db } from '@db/index'
import { count, like } from 'drizzle-orm'

const router = express.Router()
const productsPerPage = 10

interface QueryParams {
  query: string
  currentPage: number
}

const getProducts = async ({ query, currentPage }: QueryParams) => {
  try {
    const searchByName = like(products.name, `%${query}%`)

    const whereOptions = searchByName

    const querySearch = db
      .select()
      .from(products)
      .where(whereOptions)
      .limit(productsPerPage)
      .offset((currentPage - 1) * productsPerPage)

    const queryCount = db.select({ count: count() }).from(products).where(whereOptions)

    const [productsSelected, [{ count: totalQuery }]] = await Promise.all([querySearch, queryCount])

    return { productsSelected, totalQuery }
  } catch (error) {
    throw new Error('Error al obtener los productos')
  }
}

const getPrevAndNextPage = (page: number, totalQuery: number) => {
  let prevPageNumber = null
  let nextPageNumber = null

  if (page > 1 && page <= Math.ceil(totalQuery / productsPerPage)) {
    prevPageNumber = page - 1
  }
  if (page >= 1 && page < Math.ceil(totalQuery / productsPerPage)) {
    nextPageNumber = page + 1
  }

  return {
    prevPageNumber,
    nextPageNumber
  }
}

router.get('/', async (req, res) => {
  try {
    const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`
    const url = new URL(fullUrl)
    const paramsURL = url.searchParams

    const query = paramsURL.get('query') || ''
    const currentPage = parseInt(paramsURL.get('currentPage') ?? '1')

    const { productsSelected, totalQuery } = await getProducts({ query, currentPage })

    const { prevPageNumber, nextPageNumber } = getPrevAndNextPage(currentPage, totalQuery)

    paramsURL.set('currentPage', prevPageNumber?.toString() ?? '1')
    const prevUrl = prevPageNumber ? `${url.href}` : null

    paramsURL.set('currentPage', nextPageNumber?.toString() ?? '1')
    const nextUrl = nextPageNumber ? `${url.href}` : null

    const info = {
      totalProducts: totalQuery || 0,
      nextUrl,
      prevUrl,
      currentPage: currentPage,
      totalPages: Math.ceil(totalQuery / productsPerPage),
      productsPerPage: productsPerPage,
      totalInPage: productsSelected.length
    }

    return res.status(200).send({
      info,
      products: productsSelected
    })
  } catch (error) {
    res.status(500).send({
      message: 'An error occurred while trying to fetch products',
      error: true,
      slack: error
    })
  }
})

export default router
