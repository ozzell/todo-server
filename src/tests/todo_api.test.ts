import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'
import Todo from '../models/todo'
import { TodoSent } from '../models/types'

const initialTodos: TodoSent[] = [
  {
    text: 'Test todo',
    done: false
  }
]

beforeEach(async () => {
  await Todo.deleteMany({})
  const todoObject = new Todo(initialTodos[0])
  await todoObject.save()
})

afterAll(() => {
  mongoose.connection.close()
})

const api = supertest(app)

describe('Todo API', () => {
  it('GET should fetch a list of todos succesfully', async () => {
    const response = await api.get('/api/v1/todos')
    const body = response.body
    expect(response.status).toBe(200)
    expect(body[0].text).toBe(initialTodos[0].text)
    expect(body[0].done).toBe(initialTodos[0].done)
  })
})
