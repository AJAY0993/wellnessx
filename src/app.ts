import express from 'express'
import path from 'path'
import { configDotenv } from 'dotenv'
import router from 'router'

const app = express()
configDotenv({ path: path.resolve(__dirname, '../.env') })

app.use(express.json())

// Register routes
app.use('/', router())

export default app
