import { create } from './create'
import { FastifyInstance } from 'fastify'

export function petsRoutes(app: FastifyInstance) {
  app.post('/', create)
}
