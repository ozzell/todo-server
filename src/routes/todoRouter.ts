import { Router } from 'express'
import Todo from '../models/todo'
import { TodoSchema } from '../models/types'

const todoRouter = Router()

todoRouter.get('/', (req, res) => {
  Todo.find({}).then(todos => {
    res.json(todos)
  })
})

todoRouter.post('/', (req, res) => {
  const { text, done }: TodoSchema = req.body
  const todo = new Todo({ text, done })
  todo.save().then(savedTodo => {
    res.status(201).json(savedTodo)
  })
})

todoRouter.put('/:id', (req, res) => {
  const { done } = req.body
  Todo.findByIdAndUpdate(req.params.id, { done }, { new: true }).then(result => {
    res.json(result)
  })
})

todoRouter.delete('/:id', (req, res) => {
  Todo.findByIdAndDelete(req.params.id).then(result => {
    res.json(result)
  })
})

export default todoRouter
