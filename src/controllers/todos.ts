import { Request, Response, NextFunction } from 'express'
import Todo from '../models/todo'
import { TodoSchema } from '../models/types'

const inputValid = ({ text, done }: {text: string, done: boolean}) => {
  if (typeof text === 'string' && text && typeof done === 'boolean') {
    return true
  }
  return false
}

export const getTodos = (req: Request, res: Response, next: NextFunction) => {
  Todo.find({})
    .then(todos => {
      res.json(todos)
    })
    .catch(error => next(error))
}

export const postTodo = (req: Request, res: Response, next: NextFunction) => {
  const { text, done }: TodoSchema = req.body
  // TODO: Validate body fields more in-depth before writing them into database (ajv-validator)
  if (!inputValid({ text, done })) {
    res.status(400).json({ error: 'invalid input' })
    return
  }
  const todo = new Todo({ text, done })
  todo.save()
    .then(savedTodo => {
      res.status(201).json(savedTodo)
    })
    .catch(error => next(error))
}

export const markTodoDone = (req: Request, res: Response, next: NextFunction) => {
  const { done } = req.body
  if (!inputValid({ text: 'not-in-use', done })) {
    res.status(400).json({ error: 'invalid input' })
    return
  }
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
