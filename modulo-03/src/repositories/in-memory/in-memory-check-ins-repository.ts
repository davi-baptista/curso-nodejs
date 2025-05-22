import { CheckIn, Prisma } from 'generated/prisma'
import { randomUUID } from 'node:crypto'
import { CheckInsRepository } from '../check-ins-repository'
import dayjs from 'dayjs'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
    }
    this.items.push(checkIn)

    return checkIn
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const paramDate = dayjs(date)

    const checkIn = this.items.find((item) => {
      const checkInDate = dayjs(item.created_at)

      const isSameDay = checkInDate.isSame(paramDate, 'day')

      return item.user_id === userId && isSameDay
    })

    return checkIn || null
  }
}
