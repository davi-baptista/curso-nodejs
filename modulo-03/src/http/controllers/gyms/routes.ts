import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { create as createCheckIn } from '../check-ins/create'
import { create } from './create'
import { search } from './search'
import { nearby } from './nearby'

export function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/search', search)
  app.get('/nearby', nearby)

  app.post('/', create)
  app.post('/:gymId/check-in', createCheckIn)
}
