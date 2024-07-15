import express from 'express'
import { config } from 'dotenv'
import cors from 'cors'
import api from './api/index'

config()

const app = express()
const port = process.env.BACK_PORT || 3000

app.use(cors()) // Habilita CORS para todas las rutas y orígenes
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/', api)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
