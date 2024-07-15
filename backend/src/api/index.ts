import { Router } from 'express'
import v1 from './v1'

const router = Router()

// v1 is the version of the API
router.use('/v1', v1)
router.get('/', (req, res) => {
    res.send('API is running')
})
export default router
