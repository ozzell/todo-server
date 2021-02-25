import { Router } from 'express'
import Todo from '../models/todo'

const todoRouter = Router()

todoRouter.get('/', (req, res) => {
  Todo.find({}).then(todos => {
    res.json(todos)
  })
})

todoRouter.post('/', (req, res) => {
  const body = req.body
  const todo = new Todo({
    text: body.text,
    done: body.done
  })
  todo.save().then(savedTodo => {
    res.json(savedTodo)
  })
})

// TODO: PUT (mark as done)
todoRouter.put('/:id', (req, res) => {

})

// TODO: DELETE

export default todoRouter
