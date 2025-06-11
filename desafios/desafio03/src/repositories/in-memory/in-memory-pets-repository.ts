import { Pet, Prisma } from 'generated/prisma'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      genrer: data.genrer,
      species: data.species,
      age: data.age,
      portage: data.portage,
      city: data.city,
      org_id: data.org_id,
      adopter_id: data.adopter_id ?? null,
      adopted_at: data.adopted_at ? new Date(data.adopted_at) : null,
      description: data.description ?? null,
    }

    this.items.push(pet)

    return pet
  }

  async searchManyAvailable(city: string, query: string) {
    const pets = this.items.filter(
      (item) =>
        item.city === city &&
        item.adopted_at === null &&
        (item.species.toLowerCase().includes(query.toLowerCase()) ||
          item.genrer.toLowerCase().includes(query.toLowerCase()) ||
          item.portage.toLowerCase().includes(query.toLowerCase())),
    )
    return pets
  }

  async findById(id: string) {
    return (
      this.items.find((item) => item.id === id && item.adopted_at === null) ??
      null
    )
  }
}
