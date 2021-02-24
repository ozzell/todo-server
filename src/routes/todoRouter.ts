import { Router } from 'express'

const todoRouter = Router()

todoRouter.get('/', (req, res) => {
  res.json({ test: 'a test' })
})

export default todoRouter
