import express from 'express'
// import { config } from 'dotenv'
// import { isUserAuthenticated } from '@/src/middlewares/auth'
// config()

const router = express.Router()

// router.get('/', isUserAuthenticated, async (req: Request, res: Response) => {
//   try {
//     res.json(req.user)
//   } catch (error) {
//     res.status(500).send({
//       message: 'Ocurrío un error al ejecutar la accion.',
//       error: true
//     })
//   }
// })

export default router
