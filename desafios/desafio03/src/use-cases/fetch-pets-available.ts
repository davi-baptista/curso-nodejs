import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from 'generated/prisma'

interface FetchPetsAvailableUseCaseRequest {
  city: string
  query: string
}

interface FetchPetsAvailableUseCaseReply {
  pets: Pet[]
}

export class FetchPetsAvailableUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    query,
  }: FetchPetsAvailableUseCaseRequest): Promise<FetchPetsAvailableUseCaseReply> {
    const pets = await this.petsRepository.searchManyAvailable(city, query)

    return { pets }
  }
}
