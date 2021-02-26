import { Request, Response, NextFunction } from 'express'

export const unknownEndpoint = (reuqest: Request, response: Response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

export const errorHandler = (error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'MongooseError') {
    return response.status(500).send({ error: 'database error' })
  }
  next(error)
}
