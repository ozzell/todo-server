import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'
import Todo from '../models/todo'
import { TodoSent, TodoSchema } from '../models/types'

const initialTodos: TodoSent[] = [
  {
    text: 'Test todo',
    done: false
  }
]

const nonExistingResourceId = '1039244145963386920c12ed'
let currentTodo: TodoSchema

beforeEach(async () => {
  await Todo.deleteMany({})
  const todoObject = new Todo(initialTodos[0])
  currentTodo = (await todoObject.save()).toJSON() as TodoSchema
})

afterAll(() => {
  mongoose.connection.close()
})

const request = supertest(app)

const todoApiPath = '/api/v1/todos'

describe('Todo API', () => {
  it('GET should return a list of todos succesfully', async () => {
    const response = await request.get(todoApiPath)
    const body = response.body
    expect(response.status).toBe(200)
    expect(body[0].text).toBe(initialTodos[0].text)
    expect(body[0].done).toBe(initialTodos[0].done)
  })

  it('POST should create a todo resource succesfully and return it', async () => {
    const response = await request.post(todoApiPath).send({ text: 'New todo', done: false })
    const body = response.body
    expect(response.status).toBe(201)
    expect(body.text).toBe('New todo')
    expect(body.done).toBe(false)
    expect(body).toHaveProperty('id')
    expect(body).toHaveProperty('date')
  })

  it('POST should return invalid input error if text input is empty', async () => {
    const response = await request.post(todoApiPath).send({ text: '', done: false })
    const body = response.body
    expect(response.status).toBe(400)
    expect(body.error).toBe('invalid input')
  })

  it('PUT should mark a todo resource as done succesfully and return the updated resource', async () => {
    const response = await request.put(`${todoApiPath}/${currentTodo.id}`).send({ done: true })
    const body = response.body
    expect(response.status).toBe(200)
    expect(body.done).toBe(true)
  })

  it('PUT should return invalid input error if done input is not of boolean type', async () => {
    const response = await request.put(`${todoApiPath}/${currentTodo.id}`).send({ done: 'true' })
    const body = response.body
    expect(response.status).toBe(400)
    expect(body.error).toBe('invalid input')
  })

  it('DELETE should delete a todo resource succesfully and return the deleted resource', async () => {
    const response = await request.delete(`${todoApiPath}/${currentTodo.id}`)
    expect(response.status).toBe(200)
  })
})

describe('Unknown endpoint', () => {
  it('should show unknown endpoint error if path does not match any declared paths', async () => {
    const response = await request.get('/no-endpoint')
    expect(response.status).toBe(404)
    expect(response.body.error).toBe('unknown endpoint')
  })
})

describe('Error handler', () => {
  it('should return malformatted id error for id that is not correct format', async () => {
    const response = await request.delete(`${todoApiPath}/malformattedid`)
    expect(response.status).toBe(400)
    expect(response.body.error).toBe('malformatted id')
  })

  it('PUT should return 204 and no content if id was correct format but no resource was found', async () => {
    const response = await request.put(`${todoApiPath}/${nonExistingResourceId}`).send({ done: true })
    expect(response.status).toBe(204)
  })

  it('DELETE should return todo not found error if id was correct format but no resource was found', async () => {
    const response = await request.delete(`${todoApiPath}/${nonExistingResourceId}`)
    expect(response.status).toBe(404)
    expect(response.body.error).toBe('todo not found')
  })
})
