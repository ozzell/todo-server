import express from 'express'
import cors from 'cors'
import todoRouter from './routes/todoRouter'
import { unknownEndpoint, errorHandler } from './utils/middleware'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Todo App Api')
})

app.use('/api/v1/todos', todoRouter)
app.use(unknownEndpoint)
app.use(errorHandler)

export default app
