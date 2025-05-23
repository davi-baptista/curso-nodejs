import { Gym, Prisma } from 'generated/prisma'
import { GymsRepository } from '../gyms-repository'
import { randomUUID } from 'node:crypto'
import { Decimal } from 'generated/prisma/runtime/library'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description || null,
      phone: data.phone || null,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
    }

    this.items.push(gym)

    return gym
  }

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id)

    return gym || null
  }
}
