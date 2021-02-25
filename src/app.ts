import express from 'express'
import todoRouter from './routes/todoRouter'
import { unknownEndpoint } from './utils/middleware'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Todo App Api')
})

app.use('/api/v1/todos', todoRouter)

app.use(unknownEndpoint)

export default app
