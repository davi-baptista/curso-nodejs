import { PetsRepository } from '@/repositories/pets-repository'
import { Genrer, Pet, Portage } from 'generated/prisma'

interface CreatePetUseCaseRequest {
  name: string
  genrer: Genrer
  species: string
  age: number
  portage: Portage
  city: string
  description: string
}

interface CreatePetUseCaseReply {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    genrer,
    species,
    age,
    portage,
    city,
    description,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseReply> {
    const pet = await this.petsRepository.create({
      name,
      genrer,
      species,
      age,
      portage,
      city,
      description,
    })

    return { pet }
  }
}
