import express from 'express'
import { config } from 'dotenv'
import cors from 'cors'
import api from './api/index'

config()

const app = express()

app.use(cors()) // Habilita CORS para todas las rutas y orígenes
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/', api)
app.use('/', (req, res) => res.send('Hello World!'))

export default app
const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
