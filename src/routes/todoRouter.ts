import { Router } from 'express'
import Todo from '../models/todo'
import { TodoSchema } from '../models/types'

const todoRouter = Router()

todoRouter.get('/', (req, res, next) => {
  Todo.find({})
    .then(todos => {
      res.json(todos)
    })
    .catch(error => next(error))
})

todoRouter.post('/', (req, res, next) => {
  const { text, done }: TodoSchema = req.body
  const todo = new Todo({ text, done })
  todo.save()
    .then(savedTodo => {
      res.status(201).json(savedTodo)
    })
    .catch(error => next(error))
})

todoRouter.put('/:id', (req, res, next) => {
  const { done } = req.body
  Todo.findByIdAndUpdate(req.params.id, { done }, { new: true })
    .then(result => {
      if (result) {
        res.json(result)
      } else {
        // TODO: Create resource if it doesn't exist (remember idempotency)
        res.status(204).json()
      }
    })
    .catch(error => next(error))
})

todoRouter.delete('/:id', (req, res, next) => {
  Todo.findByIdAndDelete(req.params.id)
    .then(result => {
      if (result) {
        res.json(result)
      } else {
        res.status(404).json({ error: 'todo not found' })
      }
    })
    .catch(error => next(error))
})

export default todoRouter
