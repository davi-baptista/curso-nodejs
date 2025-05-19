import { prisma } from '../lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'

export function appRoutes(app: FastifyInstance) {
  app.post('users', )
}
