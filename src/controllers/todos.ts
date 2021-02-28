import { Request, Response, NextFunction } from 'express'
import Todo from '../models/todo'
import { TodoSchema } from '../models/types'

export const getTodos = (req: Request, res: Response, next: NextFunction) => {
  Todo.find({})
    .then(todos => {
      res.json(todos)
    })
    .catch(error => next(error))
}

export const postTodo = (req: Request, res: Response, next: NextFunction) => {
  const { text, done }: TodoSchema = req.body
  const todo = new Todo({ text, done })
  // TODO: Validate body fields before writing them into database (ajv-validator)
  todo.save()
    .then(savedTodo => {
      res.status(201).json(savedTodo)
    })
    .catch(error => next(error))
}

export const markTodoDone = (req: Request, res: Response, next: NextFunction) => {
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
}

export const deleteTodo = (req: Request, res: Response, next: NextFunction) => {
  Todo.findByIdAndDelete(req.params.id)
    .then(result => {
      if (result) {
        res.json(result)
      } else {
        res.status(404).json({ error: 'todo not found' })
      }
    })
    .catch(error => next(error))
}
