import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const UseCase = new AuthenticateUseCase(usersRepository)

  return UseCase
}
