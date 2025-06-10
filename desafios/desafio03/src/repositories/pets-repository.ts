import { Pet, Prisma } from 'generated/prisma'

export interface PetsRepository {
  create(data: Prisma.PetCreateInput): Promise<Pet>
  findManyAvailable(city: string): Promise<Pet[]>
}
