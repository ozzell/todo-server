import { Types } from 'mongoose'

export type TodoSchema = {
  id: string
  _id?: Types.ObjectId
  __v?: number
  text: string
  done: boolean
  date: Date
}
