import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'

import { randomUUID } from 'node:crypto'
import { checkSessionIdExists } from '../middlewares/check_session_id_exists'

export async function mealsRoutes(app: FastifyInstance) {
  app.get('/', { preHandler: [checkSessionIdExists] }, async (request) => {
    const { sessionId } = request.cookies

    const meals = await knex('meals').select().where({ session_id: sessionId })

    return { meals }
  })

  app.post(
    '/',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const mealsSchema = z.object({
        name: z.string(),
        description: z.string(),
        in_or_out_diet: z.string(),
      })

      const {
        name,
        description,
        in_or_out_diet: InOrOutDiet,
      } = mealsSchema.parse(request.body)

      const { sessionId } = request.cookies

      await knex('meals').insert({
        id: randomUUID(),
        name,
        description,
        in_or_out_diet: InOrOutDiet,
        session_id: sessionId,
      })

      return reply.status(201).send()
    },
  )

  app.put(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const paramsSchema = z.object({
        id: z.string().uuid(),
      })

      const mealsSchema = z.object({
        name: z.string(),
        description: z.string(),
        in_or_out_diet: z.string(),
      })

      const { id } = paramsSchema.parse(request.params)

      const {
        name,
        description,
        in_or_out_diet: InOrOutDiet,
      } = mealsSchema.parse(request.body)

      const { sessionId } = request.cookies

      const updated = await knex('meals')
        .where({
          id,
          session_id: sessionId,
        })
        .update({
          name,
          description,
          in_or_out_diet: InOrOutDiet,
        })

      if (updated === 0) {
        return reply
          .status(404)
          .send({ message: 'Meel not found or not authentized' })
      }
      return reply.status(204).send()
    },
  )

  // -CONFERIR
  app.delete(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const paramsSchema = z.object({
        id: z.string().uuid(),
      })

      const id = paramsSchema.parse(request.params)

      const { sessionId } = request.cookies

      await knex('meals')
        .where({
          id,
          session_id: sessionId,
        })
        .delete()

      return reply.status(204).send()
    },
  )

  app.get(
    '/:id',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const paramsSchema = z.object({
        id: z.string().uuid(),
      })

      const id = paramsSchema.parse(request.params)

      const { sessionId } = request.cookies

      const meal = await knex('meals')
        .select()
        .where({
          id,
          session_id: sessionId,
        })
        .first()

      return { meal }
    },
  )
}
