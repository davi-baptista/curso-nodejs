import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from 'generated/prisma'

interface FetchPetsAvailableUseCaseRequest {
  city: string
}

interface FetchPetsAvailableUseCaseReply {
  pets: Pet[]
}

export class FetchPetsAvailableUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
  }: FetchPetsAvailableUseCaseRequest): Promise<FetchPetsAvailableUseCaseReply> {
    const pets = await this.petsRepository.findManyAvailable(city)

    return { pets }
  }
}
