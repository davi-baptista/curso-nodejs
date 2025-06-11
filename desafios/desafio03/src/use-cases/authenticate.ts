import { UsersRepository } from '@/repositories/users-repository'
import { User } from 'generated/prisma'
import { compare } from 'bcryptjs'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseReply {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseReply> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new ResourceNotFoundError()
    }

    return { user }
  }
}
