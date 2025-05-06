import fastify from 'fastify'
import { env } from './env'
import { transactionRoutes } from './routes/transactions'

const app = fastify()

app.register(transactionRoutes, {
  prefix: 'transaction',
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('Server is running on http://localhost:' + env.PORT)
  })
