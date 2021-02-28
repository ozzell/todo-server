import { Router } from 'express'
import { getTodos, postTodo, markTodoDone, deleteTodo } from '../controllers/todos'

const todoRouter = Router()

todoRouter.get('/', getTodos)
todoRouter.post('/', postTodo)
todoRouter.put('/:id', markTodoDone)
todoRouter.delete('/:id', deleteTodo)

export default todoRouter
