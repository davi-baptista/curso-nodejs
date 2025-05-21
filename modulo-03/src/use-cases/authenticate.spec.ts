import { describe, it, expect } from 'vitest'
import { AuthenticationUseCase } from './authenticate'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate Use Case', () => {
  it('should be able to authenticate', async () => {
    const inMemoryRepository = new InMemoryUsersRepository()
    const authenticateUseCase = new AuthenticationUseCase(inMemoryRepository)

    inMemoryRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await authenticateUseCase.execute({
      email: 'john@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should be able to not authenticate with wrong email', async () => {
    const inMemoryRepository = new InMemoryUsersRepository()
    const authenticateUseCase = new AuthenticationUseCase(inMemoryRepository)

    inMemoryRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      authenticateUseCase.execute({
        email: 'john2@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should be able to not authenticate with wrong password', async () => {
    const inMemoryRepository = new InMemoryUsersRepository()
    const authenticateUseCase = new AuthenticationUseCase(inMemoryRepository)

    inMemoryRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      authenticateUseCase.execute({
        email: 'john2@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
