import { Router } from 'express'
import products from './v1/products'
// import login from './v1/login'
// import register from './v1/register'
// import user from './v1/user'

const router = Router()
router.use('/products', products)
// router.post('/login', login)
// router.use('/register', register)
// router.use('/auth/user', user)

export default router
