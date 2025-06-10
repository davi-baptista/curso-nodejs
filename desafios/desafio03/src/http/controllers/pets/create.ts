import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    genrer: z.enum(['MALE', 'FEMALE']),
    portage: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
    city: z.string(),
  })

  const { name, genrer, portage, city } = createPetBodySchema.parse(
    request.body,
  )

  return reply.status(201).send()
}
