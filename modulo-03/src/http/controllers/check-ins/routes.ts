import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { create } from './create'
import { history } from './history'
import { metrics } from './metrics'
import { validate } from './validate'

export function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/history', history)
  app.get('/metrics', metrics)

  app.post('/gyms/:gymId/create', create)

  app.patch('/:checkInId/validate', validate)
}
