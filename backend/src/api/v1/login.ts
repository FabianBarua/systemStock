import express from 'express'

const router = express.Router()

// router.post('/', async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body

//     if (!email || !password) {
//       return res.status(400).send({
//         message: 'Email and password are required',
//         error: true
//       })
//     }

//     const user = await db.select().from(users).where(eq(users.email, email))

//     console.log(user)
//     if (!user || user.length === 0 || user[0].password !== password) {
//       return res.status(401).send({
//         message: 'Invalid email or password',
//         error: true
//       })
//     }
//     console.log('test3')
//     const token = jwt.sign({ email }, process.env.JWT_SECRET || 'secret', { expiresIn: '15d' })
//     console.log(token)

//     res.status(200).send({
//       message: 'Logged in successfully',
//       token
//     })
//   } catch (error) {
//     res.status(500).send({
//       message: 'An error occurred while trying to log in',
//       error: true
//     })
//   }
// })

export default router
