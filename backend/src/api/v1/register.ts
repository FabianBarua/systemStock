import express from 'express'
// import { users } from '@db/schema/users'
// import { db } from '@db/index'
// import { eq } from 'drizzle-orm'
// import jwt from 'jsonwebtoken'
// import { config } from 'dotenv'
// config()

const router = express.Router()

// router.post('/', async (req: Request, res: Response) => {
//   try {
//     const { avatar, name, email, password } = req.body

//     if (!email || !password || !name || !avatar) {
//       return res.status(400).send({
//         message: 'Todos los campos son requeridos.',
//         error: true
//       })
//     }

//     const user = await db.select().from(users).where(eq(users.email, email))

//     if (user && user.length > 0) {
//       return res.status(401).send({
//         message: 'El email ya se encuentra registrado.',
//         error: true
//       })
//     }

//     const userCreated = await db
//       .insert(users)
//       .values({
//         avatar,
//         name,
//         email,
//         password
//       })
//       .returning({
//         name: users.name,
//         avatar: users.avatar,
//         email: users.email
//       })

//     const token = jwt.sign({ email }, process.env.JWT_SECRET || 'secret', { expiresIn: '15d' })

//     res.status(200).send({
//       message: 'Usuario registrado correctamente.',
//       token,
//       user: userCreated[0]
//     })
//   } catch (error) {
//     res.status(500).send({
//       message: 'An error occurred while trying to log in',
//       error: true
//     })
//   }
// })

export default router
