import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    species: z.string(),
    age: z.number(),
    genrer: z.enum(['MALE', 'FEMALE']),
    portage: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
    city: z.string(),
    description: z.string().nullable(),
    adopter_id: z.string().nullable(),
    adopted_at: z.date().nullable(),
  })

  const {
    name,
    species,
    age,
    genrer,
    portage,
    city,
    description,
    adopter_id,
    adopted_at,
  } = createPetBodySchema.parse(request.body)

  return reply.status(201).send()
}
