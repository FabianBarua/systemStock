/* eslint-disable react-hooks/exhaustive-deps */
import { Input, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { useDebouncedCallback } from 'use-debounce';


interface fetchProductsParams {
    query: string
    currentPage: number
}

export interface ProductResponseType {
    info: Info
    products: Product[]
}

export interface Info {
    totalProducts: number
    nextUrl: string | null
    prevUrl: string | null
    currentPage: number
    totalPages: number
    productsPerPage: number
    totalInPage: number
}

export interface Product {
    id: string
    name: string
    buyPrice: number
    sellPrice: number
    quantity: number
}

const fetchProducts = async ({
    query,
    currentPage
}: fetchProductsParams): Promise<ProductResponseType> => {
    const { data } = await axios.get(`https://system-stock.vercel.app/api/v1/products?query=${query}&currentPage=${currentPage}`);
    return data
}

const useSearchProducts = () => {

    const [products, setProducts] = useState<Product[]>([])
    const [query, setQuery] = useState('')

    const [page, setPage] = useState({
        currentPage: 1,
        totalPages: 1
    })


    useEffect(
        () => {

            const getInitialProducts = async () => {
                const {
                    info,
                    products
                } = await fetchProducts({
                    query,
                    currentPage: page.currentPage
                })

                setProducts(products)
                setPage({
                    currentPage: info.currentPage,
                    totalPages: info.totalPages
                })
            }

            getInitialProducts()

        }, []
    )

    const debounced = useDebouncedCallback(
        (value) => {
        handleSearch(value);
        },
        300
      );

    const handleSearch = async (query: string) => {
        setQuery(query)
        const {
            info,
            products
        } = await fetchProducts({
            query,
            currentPage: 1
        })

        setProducts(products)
        setPage({
            currentPage: info.currentPage,
            totalPages: info.totalPages
        })
    }

    const handlePageChange = async (newPage: number) => {
        setPage((prev) => ({ ...prev, currentPage: newPage }))
        const {
            info,
            products
        } = await fetchProducts({
            query,
            currentPage: newPage
        })

        setProducts(products)
        setPage({
            currentPage: info.currentPage,
            totalPages: info.totalPages
        })
    }

    return {
        products,
        handleSearch:debounced,
        handlePageChange,
        page
    }

}

export const Products = () => {
    const {
        products,
        handleSearch,
        handlePageChange,
        page
    } = useSearchProducts()

    return (
        <main className=" h-dvh p-5 flex flex-col gap-3 ">
            <form>
                <Input onChange={
                    (e) => handleSearch(e.target.value)
                } name="query" placeholder="Nombre de producto" />
            </form>

            <Table
                className="  h-full overflow-hidden relative"
                isHeaderSticky
                aria-label="Productos del inventario"
                selectionMode="single"
                classNames={
                    {
                        wrapper: 'w-full h-full',
                    }
                }
                bottomContent={
                    <div className="flex w-full justify-center">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="primary"
                            page={page.currentPage}
                            total={page.totalPages}
                            onChange={(number) => {
                                handlePageChange(number)
                            }}
                        />
                    </div>
                }
            >


                <TableHeader>
                    <TableColumn width={'100%'}>Nombre</TableColumn>
                    <TableColumn>Compra</TableColumn>
                    <TableColumn>Venta</TableColumn>
                </TableHeader>

                <TableBody emptyContent={'Sin productos para mostrar.'}>
                    {products.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.buyPrice}</TableCell>
                            <TableCell>{product.sellPrice}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </main>
    )
}