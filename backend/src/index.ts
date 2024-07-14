import express from 'express'
import { config } from 'dotenv'
import api from './api/index'
// import '@/src/auth/passport'

config()

const app = express()
const port = process.env.BACK_PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/', api)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
