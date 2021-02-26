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
    res.json(savedTodo)
  })
})

// TODO: PUT (mark as done)
todoRouter.put('/:id', (req, res) => {

})

// TODO: DELETE

export default todoRouter
