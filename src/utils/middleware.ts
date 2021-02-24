import { Request, Response } from 'express'

export const unknownEndpoint = (reuqest: Request, response: Response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}