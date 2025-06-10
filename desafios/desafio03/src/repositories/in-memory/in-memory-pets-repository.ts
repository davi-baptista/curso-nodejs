import { Pet, Prisma } from 'generated/prisma'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      genrer: data.genrer,
      species: data.species,
      age: data.age,
      portage: data.portage,
      city: data.city,
      org_id: null,
      adopter_id: null,
      adopted_at: null,
      description: data.description ?? null,
    }

    this.items.push(pet)

    return pet
  }

  async findManyAvailable(city: string) {
    const pets = this.items.filter((item) => item.city === city)
    return pets
  }
}
