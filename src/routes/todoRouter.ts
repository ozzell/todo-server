import { Router, Request, Response, NextFunction } from 'express'
import apicache from 'apicache'
import { getTodos, postTodo, markTodoDone, deleteTodo } from '../controllers/todos'

const todoRouter = Router()
const cache = apicache.middleware

const cacheIfNotInTest = (cacheTime: string) => process.env.NODE_ENV !== 'test'
  ? cache(cacheTime)
  : (req: Request, res: Response, next: NextFunction) => next()

todoRouter.get('/', cacheIfNotInTest('5 minutes'), getTodos)
todoRouter.post('/', postTodo)
todoRouter.put('/:id', markTodoDone)
todoRouter.delete('/:id', deleteTodo)

export default todoRouter
