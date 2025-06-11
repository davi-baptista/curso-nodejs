import { Pet, Prisma } from 'generated/prisma'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  searchManyAvailable(city: string, query: string): Promise<Pet[]>
  findById(id: string): Promise<Pet | null>
}
