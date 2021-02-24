import express from 'express'
import todoRouter from './routes/todoRouter'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello todo')
})

app.use('/todos', todoRouter)

export default app
