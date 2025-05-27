import { CheckIn, Prisma } from 'generated/prisma'

export interface CheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>

  countByUserId(userId: string): Promise<number>

  findManyCheckInsByUserId(userId: string, page: number): Promise<CheckIn[]>

  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
}
