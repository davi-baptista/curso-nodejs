import { Gym, Prisma } from 'generated/prisma'
import { FindManyNearbyParams, GymsRepository } from '../gyms-repository'
import { randomUUID } from 'node:crypto'
import { Decimal } from 'generated/prisma/runtime/library'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

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

  async searchMany(query: string, page: number) {
    return this.items
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async findManyNearby(params: FindManyNearbyParams, page: number) {
    const gyms = this.items
      .filter((item) => {
        const distance = getDistanceBetweenCoordinates(
          {
            latitude: params.latitude,
            longitude: params.longitude,
          },
          {
            latitude: item.latitude.toNumber(),
            longitude: item.longitude.toNumber(),
          },
        )

        return distance <= 10
      })
      .slice((page - 1) * 20, page * 20)

    return gyms
  }

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id)

    return gym || null
  }
}
