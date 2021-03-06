import mongoose from 'mongoose'
import { TodoSchema } from './types'

const url = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI as string
  : process.env.MONGODB_URI as string

mongoose.connect(url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }
).then(result => {
  console.log('connected to database')
}).catch(error => {
  console.log('error connecting to database:', error.message)
})

const todoSchema = new mongoose.Schema({
  text: String,
  done: Boolean
})

todoSchema.set('toJSON', {
  transform: (_document: unknown, returnedObject: TodoSchema) => {
    returnedObject.id = (returnedObject._id as mongoose.Types.ObjectId).toString()
    returnedObject.date = (returnedObject._id as mongoose.Types.ObjectId).getTimestamp()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Todo = mongoose.model('Todo', todoSchema)

export default Todo
