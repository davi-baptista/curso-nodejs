import fastify from 'fastify'
import { PrismaClient } from 'generated/prisma'

const prisma = new PrismaClient()

prisma.user.create({
  data: {
    name: 'Alice',
    email: 'alice@email',
  },
})

export const app = fastify()
